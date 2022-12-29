import { derived, writable } from 'svelte/store';

export interface User {
	id: number;
	name: string;
}

export const user = writable<User | undefined>(undefined);
export const isLoggedIn = derived(user, ($user, set) => set(!!$user));
