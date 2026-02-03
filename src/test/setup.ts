import { vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

const store = new Map<string, string>();
const mockLocalStorage = {
  getItem: (key: string) => store.get(key) ?? null,
  setItem: (key: string, value: string) => {
    store.set(key, value);
  },
  removeItem: (key: string) => {
    store.delete(key);
  },
  clear: () => store.clear(),
  get length() {
    return store.size;
  },
  key: (i: number) => Array.from(store.keys())[i] ?? null,
};
Object.defineProperty(globalThis, 'localStorage', { value: mockLocalStorage, writable: true });

(globalThis as unknown as { IDBRequest: unknown }).IDBRequest = class IDBRequest {};
(globalThis as unknown as { IDBTransaction: unknown }).IDBTransaction = class IDBTransaction {};
(globalThis as unknown as { IDBDatabase: unknown }).IDBDatabase = class IDBDatabase {};
(globalThis as unknown as { IDBObjectStore: unknown }).IDBObjectStore = class IDBObjectStore {};
(globalThis as unknown as { IDBIndex: unknown }).IDBIndex = class IDBIndex {};
(globalThis as unknown as { IDBCursor: unknown }).IDBCursor = class IDBCursor {};

const idbStore = new Map<string, unknown>();
function makeRequest<T>(result?: T) {
  const req = { result, onsuccess: null as ((e?: { target: { result: T } }) => void) | null, onerror: null as (() => void) | null };
  setTimeout(() => {
    if (req.onsuccess) req.onsuccess({ target: { result: req.result as T } } as IDBRequest);
  }, 0);
  return req;
}
const IDBTxn = (globalThis as unknown as { IDBTransaction: new () => IDBTransaction }).IDBTransaction;
function createTransaction() {
  const tx = Object.create(IDBTxn.prototype) as {
    oncomplete: (() => void) | null;
    done: Promise<void>;
    objectStore: () => ReturnType<typeof createObjectStore>;
  };
  tx.oncomplete = null;
  tx.done = Promise.resolve();
  function createObjectStore() {
    return {
      put: (value: { id: string }) => {
        idbStore.set(value.id, value);
        const req = makeRequest();
        setTimeout(() => {
          if (req.onsuccess) req.onsuccess();
          tx.oncomplete?.();
        }, 0);
        return req;
      },
      get: (id: string) => {
        const req = makeRequest(idbStore.get(id));
        setTimeout(() => {
          if (req.onsuccess) req.onsuccess({ target: { result: req.result } } as IDBRequest);
        }, 0);
        return req;
      },
      delete: (id: string) => {
        idbStore.delete(id);
        const req = makeRequest();
        setTimeout(() => {
          if (req.onsuccess) req.onsuccess();
          tx.oncomplete?.();
        }, 0);
        return req;
      },
    };
  }
  tx.objectStore = createObjectStore;
  return tx;
}
const mockDb = {
  objectStoreNames: { contains: () => false },
  createObjectStore: () => ({}),
  close: () => {},
  transaction: () => createTransaction(),
  get: () => Promise.resolve(undefined),
  put: () => Promise.resolve(),
};
const IDBReq = (globalThis as unknown as { IDBRequest: new () => IDBOpenDBRequest }).IDBRequest;
const mockIndexedDB = {
  open: (_name: string, _version: number) => {
    const req = Object.create(IDBReq.prototype) as IDBOpenDBRequest & {
      _success?: (e: Event) => void;
      _error?: (e: Event) => void;
      _upgrade?: (e: Event) => void;
    };
    req.result = mockDb;
    req.onsuccess = null;
    req.onerror = null;
    req.addEventListener = (type: string, handler: (e: Event) => void) => {
      if (type === 'success') req._success = handler;
      if (type === 'error') req._error = handler;
      if (type === 'upgradeneeded') req._upgrade = handler;
    };
    req.removeEventListener = () => {};
    setTimeout(() => {
      if (req._upgrade) req._upgrade({ target: req, type: 'upgradeneeded' } as Event);
      if (req.onsuccess) (req.onsuccess as () => void)();
      if (req._success) req._success({ target: req } as Event);
    }, 0);
    return req;
  },
};
Object.defineProperty(globalThis, 'indexedDB', { value: mockIndexedDB, writable: true });
