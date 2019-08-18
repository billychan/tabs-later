import { v4 } from 'node-uuid';
import { arrayToObjectWithKey } from 'common/helpers';
import omit from 'lodash/omit';
import pick from 'lodash/pick';

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

export const pickListAttributes = (list: TabsLater.List): TabsLater.List => pick(list, [
  'id', 'links', 'name', '_id', '_rev',
]);

export const buildLink = (tab: TabsLater.Tab): TabsLater.Link => {
  const { favIconUrl, title, url } = tab;
  return {
    id: url,
    title,
    favIconUrl,
    url
  }
}
