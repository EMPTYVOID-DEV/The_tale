<script lang="ts">
	import { onMount } from 'svelte';

	export let data;
	let externalRef: HTMLDivElement;

	function setColors(theme: 'dark' | 'light') {
		const colors = data.colors[theme];
		externalRef.style.setProperty('--foregroundColor', colors.text);
		externalRef.style.setProperty('--backgroundColor', colors.bg);
		externalRef.style.setProperty('--primaryColor', colors.primary);
	}

	async function loadFont(name: string, url: string) {
		const font = await new FontFace(name, url, { display: 'swap' }).load();
		document.fonts.add(font);
	}

	onMount(async () => {
		setColors('dark');
		const { body, heading } = data.fonts;
		const headingUrl = `url(https://cdn.jsdelivr.net/fontsource/fonts/${heading}@latest/latin-700-normal.woff2)`;
		const body400url = `url(https://cdn.jsdelivr.net/fontsource/fonts/${body}@latest/latin-400-normal.woff2)`;
		const body600url = `url(https://cdn.jsdelivr.net/fontsource/fonts/${body}@latest/latin-600-normal.woff2)`;

		await Promise.allSettled([
			loadFont(body, body400url),
			loadFont(body, body600url),
			loadFont(heading, headingUrl)
		]);

		externalRef.style.setProperty('--headerFont', `${heading}, serif`);
		externalRef.style.setProperty('--bodyFont', `${body}, serif`);
	});
</script>

<div class="external" bind:this={externalRef}>
	<h1>lora</h1>
	<span>hi</span>
	<slot />
</div>

<style>
	h1 {
		color: var(--primaryColor);
	}
</style>
