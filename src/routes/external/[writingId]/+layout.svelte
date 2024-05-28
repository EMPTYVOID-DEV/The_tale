<script lang="ts">
	import { defaultFonts } from '$global/const.global.js';
	import { onMount } from 'svelte';

	export let data;

	async function loadFonts() {
		const { body, heading } = data.fonts;
		const loadPromises = [];
		if (body != defaultFonts.body) {
			const body400Url = `https://cdn.jsdelivr.net/fontsource/fonts/${body}@latest/latin-400-normal.woff2`;
			const body600Url = `https://cdn.jsdelivr.net/fontsource/fonts/${body}@latest/latin-600-normal.woff2`;
			const body400Promise = new FontFace(body, `url(${body400Url})`, {
				display: 'swap'
			});
			const body600Promise = new FontFace(body, `url(${body600Url})`, {
				display: 'swap'
			});
			loadPromises.push(body400Promise, body600Promise);
		}
		await Promise.allSettled(loadPromises).then((res) => console.log(res));
	}

	onMount(() => {
		loadFonts();
	});
</script>
