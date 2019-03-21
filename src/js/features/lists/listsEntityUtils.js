import v4 from 'node-uuid';
import { arrayToObjectWithKey } from 'common/helpers';
import omit from 'lodash/omit';

export const buildListFromName = name => ({
  // Timestamp for easier sorting at db side
  id: (new Date()).getTime().toString(),
  name,
  links: {},
});

export const addLinkArrToLinksObj = (linksArr = [], linksObj = {}) => ({
  ...linksObj,
  ...arrayToObjectWithKey(linksArr, 'url'),
});

export const removeLinksArrFromLinksObj = (linksArr = [], linksObj = {}) => (
  omit(linksObj, linksArr.map(link => link.url))
);

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
