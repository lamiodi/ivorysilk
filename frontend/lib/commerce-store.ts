"use client";

import { useSyncExternalStore } from "react";

/**
 * Guest-first local collections (wishlist + shopping bag).
 *
 * Ivory Silk has no customer accounts: collections persist in
 * localStorage until checkout turns a bag into an order.
 */

export type CartItem = {
  id: string;
  size: string;
  color?: string;
  quantity: number;
};

const SERVER_STRINGS: string[] = [];
const SERVER_ITEMS: CartItem[] = [];

type SimpleStore = {
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => string[];
  getServerSnapshot: () => string[];
  toggle: (id: string) => void;
  add: (id: string) => void;
  remove: (id: string) => void;
};

export type BagStore = {
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => string[];
  getServerSnapshot: () => string[];
  getItemsSnapshot: () => readonly CartItem[];
  getServerItemsSnapshot: () => readonly CartItem[];
  getItems: () => CartItem[];
  addItem: (id: string, size?: string, color?: string, quantity?: number) => void;
  add: (id: string) => void;
  remove: (id: string, size?: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clear: () => void;
};

function createWishlistStore(key: string): SimpleStore {
  let snapshot: string[] = SERVER_STRINGS;
  let hydrated = false;
  const listeners = new Set<() => void>();

  const read = (): string[] => {
    if (typeof window === "undefined") return SERVER_STRINGS;
    if (!hydrated) {
      try {
        const raw = window.localStorage.getItem(key);
        const parsed: unknown = raw ? JSON.parse(raw) : [];
        snapshot = Array.isArray(parsed)
          ? parsed.filter((id): id is string => typeof id === "string")
          : [];
      } catch {
        snapshot = [];
      }
      hydrated = true;
    }
    return snapshot;
  };

  const write = (next: string[]) => {
    snapshot = next;
    hydrated = true;
    try {
      window.localStorage.setItem(key, JSON.stringify(next));
    } catch {
      // storage fallback
    }
    listeners.forEach((listener) => listener());
  };

  return {
    subscribe(listener) {
      listeners.add(listener);
      const onStorage = (event: StorageEvent) => {
        if (event.key === key) {
          hydrated = false;
          read();
          listener();
        }
      };
      window.addEventListener("storage", onStorage);
      return () => {
        listeners.delete(listener);
        window.removeEventListener("storage", onStorage);
      };
    },
    getSnapshot: read,
    getServerSnapshot: () => SERVER_STRINGS,
    toggle(id) {
      const current = read();
      write(current.includes(id) ? current.filter((x) => x !== id) : [...current, id]);
    },
    add(id) {
      const current = read();
      if (!current.includes(id)) write([...current, id]);
    },
    remove(id) {
      write(read().filter((x) => x !== id));
    },
  };
}

function createBagStore(key: string): BagStore {
  let items: CartItem[] = SERVER_ITEMS;
  let cachedIds: string[] = SERVER_STRINGS;
  let hydrated = false;
  const listeners = new Set<() => void>();

  const updateCachedIds = () => {
    cachedIds = items.map((item) => item.id);
  };

  const read = (): CartItem[] => {
    if (typeof window === "undefined") return SERVER_ITEMS;
    if (!hydrated) {
      try {
        const raw = window.localStorage.getItem(key);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            items = parsed.map((item) => {
              if (typeof item === "string") {
                return { id: item, size: "M", quantity: 1 };
              }
              return {
                id: item.id,
                size: item.size || "M",
                color: item.color,
                quantity: typeof item.quantity === "number" ? item.quantity : 1,
              };
            });
          }
        } else {
          items = [];
        }
      } catch {
        items = [];
      }
      updateCachedIds();
      hydrated = true;
    }
    return items;
  };

  const write = (next: CartItem[]) => {
    items = next;
    updateCachedIds();
    hydrated = true;
    try {
      window.localStorage.setItem(key, JSON.stringify(next));
    } catch {
      // storage fallback
    }
    listeners.forEach((l) => l());
  };

  return {
    subscribe(listener) {
      listeners.add(listener);
      const onStorage = (e: StorageEvent) => {
        if (e.key === key) {
          hydrated = false;
          read();
          listener();
        }
      };
      window.addEventListener("storage", onStorage);
      return () => {
        listeners.delete(listener);
        window.removeEventListener("storage", onStorage);
      };
    },
    getSnapshot() {
      read();
      return cachedIds;
    },
    getServerSnapshot: () => SERVER_STRINGS,
    getItemsSnapshot() {
      // Returns the same array reference until something is written.
      // Important: read() may hydrate on first call, but the items array
      // is only replaced via write() (which calls listeners). So between
      // writes, the reference is stable.
      return read();
    },
    getServerItemsSnapshot: () => SERVER_ITEMS,
    getItems() {
      return read();
    },
    addItem(id, size = "S", color, quantity = 1) {
      const current = read();
      const existingIndex = current.findIndex(
        (item) => item.id === id && item.size === size && item.color === color,
      );
      if (existingIndex > -1) {
        const updated = [...current];
        updated[existingIndex].quantity += quantity;
        write(updated);
      } else {
        write([...current, { id, size, color, quantity }]);
      }
    },
    add(id) {
      read().push({ id, size: "S", quantity: 1 });
      write(read());
    },
    remove(id, size) {
      const current = read();
      if (size) {
        write(current.filter((item) => !(item.id === id && item.size === size)));
      } else {
        write(current.filter((item) => item.id !== id));
      }
    },
    updateQuantity(id, size, quantity) {
      const current = read();
      if (quantity <= 0) {
        write(current.filter((item) => !(item.id === id && item.size === size)));
      } else {
        write(
          current.map((item) =>
            item.id === id && item.size === size ? { ...item, quantity } : item,
          ),
        );
      }
    },
    clear() {
      write([]);
    },
  };
}

export const wishlist = createWishlistStore("isc:wishlist");
export const bag = createBagStore("isc:bag");

export function useStoredCollection(store: SimpleStore | BagStore): string[] {
  return useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );
}

const EMPTY_BAG: readonly CartItem[] = Object.freeze([]) as readonly CartItem[];

export function useBagItems(): readonly CartItem[] {
  return useSyncExternalStore(
    bag.subscribe,
    bag.getItemsSnapshot,
    () => EMPTY_BAG,
  );
}
