import type { PartialDeep } from 'type-fest';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import { merge } from 'lodash-es';

interface Storage {
	jwt: string;
}

export type Stored = PartialDeep<Storage>;

const LOCALSTORAGE_KEY = 'storage' as const;

const tryLoadingStorage = (): Stored => {
	const rawStored = localStorage.getItem(LOCALSTORAGE_KEY);
	if (!rawStored) return {};

	try {
		return JSON.parse(rawStored) ?? {};
	} catch (error) {
		if (!(error instanceof SyntaxError)) {
			throw error;
		}
	}
};

const saveStorage = (storage: Stored): Stored => {
	localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(storage));
	return storage;
};

const makeStorage = (): Writable<Stored> & { merge: (updates: Stored) => void } => {
	const store = writable<Stored>(tryLoadingStorage());

	return {
		subscribe: store.subscribe,
		set: (v) => store.set(saveStorage(v)),
		update: (updater) => store.update((stored) => saveStorage(updater(stored))),
		merge: (updates) => store.update((stored) => saveStorage(merge(stored, updates))),
	};
};

export const storage = makeStorage();
