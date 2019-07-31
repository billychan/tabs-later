import Fuse from 'fuse.js';

interface HighlightResultPerRegion {
  nextStartingIndex: number,
  text: string
}

export const highlightPerRegions = (
  str: string,
  regions: number[][],
  pre: string,
  post: string
) => (
  regions.reduce((
    acc: HighlightResultPerRegion,
    region: number[],
    index: number,
    items: number[][]
  ): HighlightResultPerRegion => {
    const { nextStartingIndex, text } = acc;
    const isEnd = index === items.length - 1;

    const regionStart = region[0];
    const regionEnd = region[1] + 1;

    // Literally specify arg, not just number[], due to TS limitation
    // https://github.com/Microsoft/TypeScript/issues/27920
    const preRegion: [number, number] = [nextStartingIndex, regionStart];

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

interface Match {
  key: string;
  value: string;
  // Array of a pair of numbers like [[1, 3], [5, 7]]
  indices: number[][];
  pre: string;
  post: string;
}

const highlightResult = (result: Fuse.FuseResult<TabsLater.Link>) => {
  const pre = '<b>';
  const post = '</b>';
  const highlightedKeySuffix = 'Highlighted';
  const { item, matches } = result;
  return {
    ...item,
    ...matches.reduce((acc: object, match: Match) => ({
      ...acc,
      [`${match.key}${highlightedKeySuffix}`]:
        highlightPerRegions(match.value, match.indices, pre, post).text,
    }), {}),
  };
};

export const searchLinks = (links: TabsLater.Link[], query: string) => (
  (new Fuse(links, {
    keys: ['title', 'url'],
    includeMatches: true,
    // Make a more precise match(0 is perfect, 0.6 is default)
    threshold: 0.4,
  })).search(query).map(highlightResult)
);
