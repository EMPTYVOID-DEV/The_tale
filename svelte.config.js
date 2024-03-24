import nodeAdapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		alias: {
			$components: path.resolve('./src/lib/components'),
			$icons: path.resolve('./src/lib/icons/*')
		},
		env: {
			dir: './'
		},
		adapter: nodeAdapter()
	}
};

export default config;
