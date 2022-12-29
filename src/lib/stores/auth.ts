import type { Readable } from 'svelte/store';
import { derived } from 'svelte/store';
import { storage } from './storage';

export const authHeaders: Readable<{ Authorization: string } | Record<string, never>> = derived(
	storage,
	($storage, set) => set($storage.jwt ? { Authorization: `Bearer ${$storage.jwt}` } : {}),
);
