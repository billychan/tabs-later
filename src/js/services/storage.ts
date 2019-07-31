import PouchDB from 'pouchdb';

const db = new PouchDB('tabs-later', { auto_compaction: true });

export const createList = (list: TabsLater.List) => (
  db.put({
    ...list,
    _id: list.id,
  })
);

// The difference in update is a _rev attribute needed, and _id is already included.
export const updateList = (list: TabsLater.List) => db.put(list);

export const deleteList = (list: TabsLater.List) => db.remove(list._id, list._rev);

export const bulkUpdateLists = (lists: TabsLater.List[]) => db.bulkDocs(lists);

// TODO: Verify fetch list works without extra versions fetched
export const fetchLists = () => db.allDocs({ include_docs: true });
