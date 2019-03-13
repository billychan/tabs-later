import v4 from 'node-uuid';
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

export const getUniqueLinks = (list, linksToAdd) => (
  linksToAdd.filter(link => !list.links[link.url])
);

export const assignIdToLink = obj => ({
  ...obj,
  id: v4(),
});

export const listLinksToLinksArray = list => Object.values(list.links).map(assignIdToLink);
