import { filterDuplications } from './helpers';

describe('filterDuplications', () => {
  const DATA = [
    { url: 'google.com', id: 1, category: 'search' },
    { url: 'facebook.com', id: 2, category: 'social' },
    { url: 'twitter.com', id: 3, category: 'social' },
    { url: 'linkedin.com', id: 4, category: 'social' },
  ];

  test('returns empty array on unique data', () => {
    expect(filterDuplications(DATA, 'url')).toEqual([]);
  });

  test('returns all duplications after 1st appearance', () => {
    expect(filterDuplications(DATA, 'category').map(item => item.url))
      .toEqual(['twitter.com', 'linkedin.com']);
  });
});
