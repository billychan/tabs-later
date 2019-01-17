import { arrayToObjectWithKey } from 'common/helpers';

export const buildListFromName = name => ({
  // Timestamp for easier sorting at db side
  id: (new Date()).getTime().toString(),
  name,
  links: {},
});

export const addLinksToList = (list, links = []) => {
  const newLinks = {
    ...list.links,
    ...arrayToObjectWithKey(links, 'url'),
  };
  return {
    ...list,
    links: newLinks,
  };
};

export const tabToLink = ({ title, url, favIconUrl }) => ({
  title, url, favIconUrl,
});

export const hasAllLinks = (list, tabs = []) => {
  const { links } = list;
  return tabs.every(({ url }) => !!links[url]);
};
