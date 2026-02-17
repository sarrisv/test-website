import { getCollection } from 'astro:content';

let _peopleCache: Awaited<ReturnType<typeof getCollection<'people'>>> | null = null;
let _projectsCache: Awaited<ReturnType<typeof getCollection<'projects'>>> | null = null;
let _newsCache: Awaited<ReturnType<typeof getCollection<'news'>>> | null = null;
let _coursesCache: Awaited<ReturnType<typeof getCollection<'courses'>>> | null = null;

export async function getPeople() {
  if (!_peopleCache) {
    _peopleCache = await getCollection('people');
  }
  return _peopleCache;
}

export async function getProjects() {
  if (!_projectsCache) {
    _projectsCache = await getCollection('projects');
  }
  return _projectsCache;
}

export async function getNews() {
  if (!_newsCache) {
    _newsCache = await getCollection('news');
  }
  return _newsCache;
}

export async function getCourses() {
  if (!_coursesCache) {
    _coursesCache = await getCollection('courses');
  }
  return _coursesCache;
}

export async function getAllCollections() {
  const [people, projects, news, courses] = await Promise.all([
    getPeople(),
    getProjects(), 
    getNews(),
    getCourses()
  ]);
  
  return { people, projects, news, courses };
}