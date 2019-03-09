import Fuse from 'fuse.js';

const LINKS_OPTIONS = {
  keys: ['title', 'url'],
};

export const searchLinks = (links, query) => {
  const fuse = new Fuse(links, LINKS_OPTIONS);
  return fuse.search(query);
};
