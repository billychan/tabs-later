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
 *    maybePluralize(1, 'tab', 'tabs') // => 1 tab
 *    maybePluralize(2, 'tab', 'tabs') // => 2 tabs
 */
export const maybePluralize = (count, singular, plural) => (
  `${count} ${count === 1 ? singular : plural}`
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

export const pickDuplications = (items, keyName) => (
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
  }, {
    uniqueValues: new Set(),
    duplications: [],
  })
);
