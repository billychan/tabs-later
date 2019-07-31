import { v4 } from 'node-uuid';
import { arrayToObjectWithKey } from 'common/helpers';
import { omit, pick } from 'lodash';

export const buildListFromName = (name: string) => ({
  // Timestamp for easier sorting at db side
  id: (new Date()).getTime().toString(),
  name,
  links: {},
});

export const addLinkArrToLinksObj = (
  linksArr: TabsLater.Link[], linksObj: TabsLater.LinksObj
): TabsLater.LinksObj => ({
  ...linksObj,
  ...arrayToObjectWithKey(linksArr, 'url'),
});

export const removeLinksArrFromLinksObj = (
  linksArr: TabsLater.Link[],
  linksObj: TabsLater.LinksObj
): TabsLater.LinksObj => (
  omit(linksObj, linksArr.map(link => link.url))
);

export const getUniqueLinks = (list: TabsLater.List, linksToAdd: TabsLater.Link[]) => (
  linksToAdd.filter(link => !list.links[link.url])
);

// This is a temp Id for UI displaying only. Not stored in db.
export const assignIdToLink = (link: TabsLater.Link) => ({
  ...link,
  id: v4(),
});

export const pickListAttributes = (list: TabsLater.List): TabsLater.List => pick(list, [
  'id', 'links', 'name', '_id', '_rev',
]);

export const pickLinkAttributes = (link: TabsLater.Link): TabsLater.Link => pick(link, [
  'favIconUrl', 'title', 'url',
]);

export const listLinksToLinksArray = (list: TabsLater.List) => Object.values(list.links).map(assignIdToLink);
