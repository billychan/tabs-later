import flow from 'lodash/flow';

/**
 * @description Turn array of objects to object with given key(default to 'id')
 *              It's a quick and lightweight alternative for normalizr schema
 * @param {Array<Object>} arr array of objects
 * @param {string} key the attribute of object which can be the key, default to 'id'
 * @example arrayToObjectWithKey([{ id: 'foo', val: 'fooz' }, { id: 'bar', val: 'barz' }])
 *          => { foo: { id: 'foo', val: 'fooz'}, bar: { id: 'bar', val: 'barz' }}
 */

export const arrayToObjectWithKey = (
  arr: Common.Dictionary<any>[], key: keyof Common.Dictionary<string> = 'id'
) => (
  arr.reduce((memo, item) => ({
    ...memo,
    [item[key]]: item,
  }), {})
);

export const noop = () => {};

/**
 * @return {0|1|2} Checked status: 0 means none, 1 means some, 2 means all
 */
type CheckedStatus = 0 | 1 | 2;

export const calculateCheckedStatus = (total: number, checked: number): CheckedStatus => {
  if (checked === 0) {
    return 0;
  }

  return total - checked === 0 ? 2 : 1;
};

/**
 * @param {Array<Object>} items
 * @param {string} keyName key name to check duplication on
 * @return {Array<Object>} duplicated items
 */
export const filterDuplications = <
  T extends Common.Dictionary<any>
>(items: T[], keyName: string): T[] => (
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

export const removeStartCharFn = (char: string) => (str: string) => (
  str.startsWith(char) ? str.slice(1) : str
);

export const removeEndCharFn = (char: string) => (str: string) => (
  str.endsWith(char) ? str.slice(0, -1) : str
);

export const removeStartOrEndCharFn = (char: string) => (
  flow(removeStartCharFn(char), removeEndCharFn(char))
);
