import { schema } from 'normalizr'

export const tab = new schema.Entity('tab')
export const arrayOfTabs = new schema.Array(tab)