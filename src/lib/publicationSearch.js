// Publications search and modal functionality
export function initPublicationSearch() {
  const searchInput = document.getElementById('pubSearch');
  const clearButton = document.getElementById('clearSearch');
  const searchStatus = document.getElementById('searchStatus');
  const entries = document.querySelectorAll('.pub-entry');
  const sections = document.querySelectorAll('.year-group');
  
  // Modal Elements
  const bibtexModal = document.getElementById('bibtexModal');
  const bibtexContent = document.getElementById('bibtexContent');
  const copyBibtexBtn = document.getElementById('copyBibtexBtn');
  
  let searchTimeout;
  const totalEntries = entries.length;

  // --- Modal Logic ---
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.js-bib-btn');
    if (btn) {
      const bibtex = decodeURIComponent(btn.dataset.bibtex);
      bibtexContent.textContent = bibtex;
      bibtexModal.showModal();
    }
  });

  copyBibtexBtn.addEventListener('click', () => {
    const text = bibtexContent.textContent;
    navigator.clipboard.writeText(text);
    
    const originalText = copyBibtexBtn.textContent;
    copyBibtexBtn.textContent = 'Copied!';
    setTimeout(() => {
      copyBibtexBtn.textContent = originalText;
    }, 2000);
  });

  // --- Search Logic ---

  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function highlightText(entry, terms) {
    const targets = entry.querySelectorAll('h3, p');
    
    targets.forEach(target => {
      const text = target.textContent;
      
      if (terms.length === 0) {
         target.innerHTML = text;
         return;
      }

      const pattern = terms.map(escapeRegExp).join('|');
      const regex = new RegExp(`(${pattern})`, 'gi');
      
      target.innerHTML = text.replace(regex, '<mark class="bg-info/30 rounded-sm">$1</mark>');
    });
  }

  function performSearch(query) {
    const searchTerms = query.toLowerCase().split(/\s+/).filter(term => term.length > 0);
    let visibleCount = 0;

    entries.forEach(entry => {
      const text = entry.getAttribute('data-search-text');
      
      const matches = searchTerms.length === 0 || searchTerms.every(term => text.includes(term));
      
      entry.style.display = matches ? 'block' : 'none';
      if (matches) {
        visibleCount++;
        highlightText(entry, searchTerms);
      }
    });

    sections.forEach(section => {
      const visibleEntries = section.querySelectorAll('.pub-entry[style="display: block;"]');
      section.style.display = visibleEntries.length > 0 || query === "" ? 'block' : 'none';
    });

    if (query === "") {
      searchStatus.classList.add('hidden');
      clearButton.classList.remove('opacity-100');
      clearButton.classList.add('opacity-0');
    } else {
      searchStatus.classList.remove('hidden');
      searchStatus.textContent = `Showing ${visibleCount} of ${totalEntries} publications`;
      clearButton.classList.remove('opacity-0');
      clearButton.classList.add('opacity-100');
    }
  }

  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      performSearch(e.target.value);
    }, 150);
  });

  clearButton.addEventListener('click', () => {
    searchInput.value = '';
    performSearch('');
    searchInput.focus();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
      e.preventDefault();
      searchInput.focus();
    }
    if (e.key === 'Escape' && e.target === searchInput) {
      clearButton.click();
    }
  });

  performSearch('');
}

// Auto-initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPublicationSearch);
} else {
  initPublicationSearch();
}
