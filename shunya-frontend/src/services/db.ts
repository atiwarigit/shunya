import { openDB, DBSchema } from 'idb';
import { JournalEntry } from '../types/journal';

interface ShunyaDB extends DBSchema {
  entries: {
    key: string;
    value: JournalEntry;
    indexes: { 'by-timestamp': Date };
  };
}

const DB_NAME = 'shunya-journal';
const DB_VERSION = 1;

export const initDB = async () => {
  const db = await openDB<ShunyaDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      const store = db.createObjectStore('entries', {
        keyPath: 'id',
      });
      store.createIndex('by-timestamp', 'timestamp');
    },
  });
  return db;
};

export const saveEntry = async (entry: JournalEntry) => {
  const db = await initDB();
  await db.put('entries', entry);
};

export const getAllEntries = async (): Promise<JournalEntry[]> => {
  const db = await initDB();
  return db.getAllFromIndex('entries', 'by-timestamp');
};

export const deleteEntry = async (id: string) => {
  const db = await initDB();
  await db.delete('entries', id);
}; 