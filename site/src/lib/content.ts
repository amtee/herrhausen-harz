import { getCollection, type CollectionEntry } from 'astro:content';

export type PageEntry = CollectionEntry<'pages'>;
export type NewsEntry = CollectionEntry<'news'>;
export type EventEntry = CollectionEntry<'events'>;

const published = <T extends { data: { draft?: boolean } }>(entry: T) => entry.data.draft !== true;

export async function getPages() {
  return (await getCollection('pages')).sort((a, b) => a.data.order - b.data.order);
}

export async function getHomePage() {
  const page = (await getPages()).find((entry) => entry.data.path === '/');
  if (!page) throw new Error('Die Startseite src/content/pages/start.md fehlt.');
  return page;
}

export async function getNavPages() {
  return (await getPages()).filter((page) => page.data.showInNav);
}

export async function getNews(limit?: number) {
  const entries = (await getCollection('news', published)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
  return limit ? entries.slice(0, limit) : entries;
}

export async function getEvents(now = new Date()) {
  const entries = (await getCollection('events', published)).sort(
    (a, b) => a.data.date.valueOf() - b.data.date.valueOf(),
  );
  return {
    upcoming: entries.filter((entry) => entry.data.date >= now),
    past: entries.filter((entry) => entry.data.date < now).reverse(),
  };
}

export const germanDate = new Intl.DateTimeFormat('de-DE', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
});