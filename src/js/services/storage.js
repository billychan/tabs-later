import PouchDB from 'pouchdb';

const db = new PouchDB('tabs-later', { auto_compaction: true });

export const createList = list => (
  db.put({
    ...list,
    _id: list.id,
  })
);

// The difference in update is a _rev attribute needed, and _id is already included.
export const updateList = list => db.put(list);

export const bulkUpdateLists = lists => db.bulkDocs(lists);

export const fetchLists = () => db.allDocs({ include_docs: true, latest: true });
