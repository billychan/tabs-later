import Fuse from 'fuse.js';

/**
 * @typedef {Object} Match
 * @property {number} arrayIndex
 * @property {Array<Array>} indices
 *      Array of mactched pairs(which is an array of number)
 *      Example: [[1, 3], [5, 6]]
 * @property {string} key
 * @property {string} value
 */

/**
 * @typedef {Object} Result
 * @property {Object} item
 * @property {Match} match
 */

const LINKS_OPTIONS = {
  keys: ['title', 'url'],
  includeMatches: true,
  // Make a more precise match(0 is perfect, 0.6 is default)
  threshold: 0.4,
};

export const highlightPerRegions = (str, regions, pre, post) => (
  regions.reduce((acc, region, index, items) => {
    const { nextStartingIndex, text } = acc;
    const isEnd = index === items.length - 1;

    const regionStart = region[0];
    const regionEnd = region[1] + 1;

    const preRegion = [nextStartingIndex, regionStart];

    const nextText = text
      .concat(str.substring(...preRegion))
      .concat(pre)
      .concat(str.substring(regionStart, regionEnd))
      .concat(post)
      .concat(isEnd ? str.substring(regionEnd) : '');

    return {
      nextStartingIndex: regionEnd,
      text: nextText,
    };
  }, {
    nextStartingIndex: 0,
    text: '',
  })
);

const highlightResultFn = (
  { pre = '<b>', post = '</b>', highlightedKeySuffix = 'Highlighted' } = {},
) => (result) => {
  const { item, matches } = result;
  return {
    ...item,
    ...matches.reduce((acc, match) => ({
      ...acc,
      [`${match.key}${highlightedKeySuffix}`]:
        highlightPerRegions(match.value, match.indices, pre, post).text,
    }), {}),
  };
};

export const searchLinks = (links, query) => (
  (new Fuse(links, LINKS_OPTIONS)).search(query).map(highlightResultFn())
);
