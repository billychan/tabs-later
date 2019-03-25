import v4 from 'node-uuid';
import { arrayToObjectWithKey } from 'common/helpers';
import omit from 'lodash/omit';
import pick from 'lodash/pick';

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

export const getUniqueLinks = (list, linksToAdd) => (
  linksToAdd.filter(link => !list.links[link.url])
);

// This is a temp Id for UI displaying only. Not stored in db.
export const assignIdToLink = obj => ({
  ...obj,
  id: v4(),
});

export const pickListAttributes = list => pick(list, [
  'id', 'links', 'name', '_id', '_rev',
]);

export const pickLinkAttributes = link => pick(link, [
  'favIconUrl', 'title', 'url',
]);

export const listLinksToLinksArray = list => Object.values(list.links).map(assignIdToLink);
