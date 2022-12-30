import { defineConfig } from 'vite';
import { resolve } from 'path';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import preprocess from 'svelte-preprocess';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html'),
				'custom-service-worker': resolve(__dirname, 'service-worker/main.ts'),
			},
			output: {
				entryFileNames: '[name].js',
			},
		},
	},
	server: {
		port: 5000,
	},
	plugins: [
		tsconfigPaths({ loose: true }),
		svelte({
			preprocess: [preprocess()],
		}),
		VitePWA({
			includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
			registerType: 'autoUpdate',
			workbox: {
				importScripts: ['custom-service-worker.js'],
			},
			manifest: {
				name: 'Bahn Alaaaarm',
				short_name: 'BahnAlarm',
				description: 'An app that tracks and notifies you about departure delays from the DB',
				theme_color: '#191919',
				icons: [
					{
						src: 'pwa-192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
					},
					{
						src: 'logo-color.png',
						sizes: '1000x1000',
						type: 'image/png',
						purpose: 'any maskable',
					},
				],
			},
		}),
	],
});
