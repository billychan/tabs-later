import { schema } from 'normalizr';

export const list = new schema.Entity('list');
export const arrayOfLists = new schema.Array(list);
