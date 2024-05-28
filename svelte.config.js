import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		alias: {
			$components: path.resolve('./src/lib/client/ui/components'),
			$icons: path.resolve('./src/lib/client/ui/icons'),
			$global: path.resolve('./src/lib/global'),
			$client: path.resolve('./src/lib/client'),
			$server: path.resolve('./src/lib/server'),
			$assets: path.resolve('./src/lib/assets'),
			$altron: path.resolve('./src/lib/client/ui/components/altron')
		},
		env: {
			dir: './'
		},

		csp: {
			directives: {
				'script-src': ['self', 'wasm-unsafe-eval']
			}
		},
		csrf: { checkOrigin: true },
		adapter: adapter()
	}
};

export default config;
