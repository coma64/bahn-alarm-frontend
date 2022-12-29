import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import preprocess from 'svelte-preprocess';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	server: {
		port: 5000,
	},
	plugins: [
		tsconfigPaths({ loose: true }),
		svelte({
			preprocess: [preprocess()],
		}),
	],
});
