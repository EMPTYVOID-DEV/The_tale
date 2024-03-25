import nodeAdapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		alias: {
			$components: path.resolve('./src/lib/ui/components'),
			$icons: path.resolve('./src/lib/ui/icons'),
			$schema: path.resolve('./src/lib/schema')
		},
		env: {
			dir: './'
		},
		adapter: nodeAdapter()
	}
};

export default config;
