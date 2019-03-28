import flow from 'lodash/flow';

/**
 * @description Turn array of objects to object with given key(default to 'id')
 *              It's a quick and lightweight alternative for normalizr schema
 * @param {Array<Object>} arr array of objects
 * @param {string} key the attribute of object which can be the key, default to 'id'
 * @example arrayToObjectWithKey([{ id: 'foo', val: 'fooz' }, { id: 'bar', val: 'barz' }])
 *          => { foo: { id: 'foo', val: 'fooz'}, bar: { id: 'bar', val: 'barz' }}
 */
export const arrayToObjectWithKey = (arr = [], key = 'id') => (
  arr.reduce((memo, item) => ({
    ...memo,
    [item[key]]: item,
  }), {})
);

/**
 * @example
 *    maybePluralize(1, 'tab') // => 1 tab
 *    maybePluralize(2, 'tab') // => 2 tabs
 *    maybePluralize(2, 'foot', 'feet') // => 2 feet
 */
export const maybePluralize = (count, singular, plural) => (
  `${count} ${count === 1 ? singular : (plural || `${singular}s`)}`
);

export const noop = () => {};

/**
 * @return {0|1|2} Checked status: 0 means none, 1 means some, 2 means all
 */
export const calculateCheckedStatus = (total, checked) => {
  if (checked === 0) {
    return 0;
  }

  return total - checked === 0 ? 2 : 1;
};

/**
 * @param {Array<Object>} items
 * @param {string} keyName key name to check duplication on
 * @return {Array<Object} duplicated items
 */
export const filterDuplications = (items, keyName) => (
  items.reduce((acc, item) => {
    const value = item[keyName];
    const { uniqueValues, duplications } = acc;

    return uniqueValues.has(value)
      ? {
        uniqueValues,
        duplications: duplications.concat(item),
      }
      : {
        uniqueValues: uniqueValues.add(value),
        duplications,
      };
  },
  {
    uniqueValues: new Set(),
    duplications: [],
  }).duplications
);

export const removeStartCharFn = char => str => (
  str.startsWith(char) ? str.slice(1) : str
);

export const removeEndCharFn = char => str => (
  str.endsWith(char) ? str.slice(0, -1) : str
);

export const removeStartOrEndCharFn = char => (
  flow(removeStartCharFn(char), removeEndCharFn(char))
);
