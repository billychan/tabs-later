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
 * @description Given an array of objects, make the objects unique by given key's value
 */
export const uniqObjectsOnKey = (arr = [], key) => Object.values(arrayToObjectWithKey(arr, key));
