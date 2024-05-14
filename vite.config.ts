import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$components: path.resolve('./src/lib/client/ui/components'),
			$icons: path.resolve('./src/lib/client/ui/icons'),
			$global: path.resolve('./src/lib/global'),
			$client: path.resolve('./src/lib/client'),
			$server: path.resolve('./src/lib/server'),
			$assets: path.resolve('./src/lib/assets')
		}
	}
});
