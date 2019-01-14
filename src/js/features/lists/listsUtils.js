import { uniqObjectsOnKey } from 'common/helpers';

export const buildListFromName = name => ({
  // Timestamp for easier sorting at db side
  id: (new Date()).getTime().toString(),
  name,
  links: [],
});

export const addLinksToList = (list, links = []) => {
  const newLinks = uniqObjectsOnKey([...links, ...list.links], 'url');
  return {
    ...list,
    links: newLinks,
  };
};

export const tabToLink = ({ title, url, favIconUrl }) => ({
  title, url, favIconUrl,
});
