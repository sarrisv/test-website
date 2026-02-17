import type { CollectionEntry } from 'astro:content';

export function getPersonInfo(id: string, people: CollectionEntry<'people'>[]) {
  const person = people.find(p => p.data.id === id);
  return person ? { name: person.data.fullname, found: true } : { name: id, found: false };
}
