import { Cite } from '@citation-js/core';
import '@citation-js/plugin-bibtex';
import fs from 'fs/promises';

export async function getPublications() {
  const bibFile = await fs.readFile('./src/content/papers.bib', 'utf8');
  
  // Parse custom fields directly from the raw BibTeX text
  const customFields = {};
  const entries = bibFile.split('@').filter(entry => entry.trim());
  
  entries.forEach(entry => {
    const idMatch = entry.match(/^\w+\{([^,]+),/);
    if (idMatch) {
      const id = idMatch[1];
      const pdfMatch = entry.match(/pdf\s*=\s*\{([^}]+)\}/);
      const slidesMatch = entry.match(/slides\s*=\s*\{([^}]+)\}/);
      const codeMatch = entry.match(/code\s*=\s*\{([^}]+)\}/);
      const projectMatch = entry.match(/project\s*=\s*\{([^}]+)\}/);
      
      customFields[id] = {
        pdf: pdfMatch ? pdfMatch[1] : null,
        slides: slidesMatch ? slidesMatch[1] : null,
        code: codeMatch ? codeMatch[1] : null,
        project: projectMatch ? projectMatch[1] : null,
        bibtex: '@' + entry.trim()
      };
    }
  });
  
  // Parse with citation-js for standard fields
  const cite = new Cite(bibFile);
  const rawData = cite.get({
    format: 'real',
    type: 'json',
    style: 'csl'
  });

  // Group by year
  const grouped = rawData.reduce((acc, entry) => {
    const year = entry.issued?.['date-parts']?.[0]?.[0] || 'Unknown';
    if (!acc[year]) acc[year] = [];
    
    const customData = customFields[entry.id] || {};
    
    // Format entry for our UI
    acc[year].push({
      id: entry.id,
      title: entry.title,
      authors: entry.author || [],
      venue: entry['container-title'] || entry.publisher || "",
      year: year,
      doi: entry.DOI,
      // Use manually parsed custom fields
      pdf: customData.pdf,
      slides: customData.slides,
      code: customData.code,
      project: customData.project,
      bibtex: customData.bibtex || ''
    });
    return acc;
  }, {});

  // Sort years descending
  return Object.keys(grouped)
    .sort((a, b) => b - a)
    .map(year => ({ year, papers: grouped[year] }));
}