<script lang="ts">
	import { onMount } from 'svelte';
	import Navbar from './components/navbar.svelte';

	export let data;
	let externalRef: HTMLDivElement;

	function toggleTheme(theme: 'dark' | 'light') {
		const colors = data.colors[theme];
		externalRef.style.setProperty('--foregroundColor', colors.text);
		externalRef.style.setProperty('--backgroundColor', colors.bg);
		externalRef.style.setProperty('--primaryColor', colors.primary);
	}

	async function loadFont(name: string, url: string, weight: string) {
		const font = await new FontFace(name, url, { display: 'swap', weight }).load();
		document.fonts.add(font);
	}

	onMount(async () => {
		toggleTheme('dark');
		const { body, heading } = data.fonts;
		const headingUrl = `url(https://cdn.jsdelivr.net/fontsource/fonts/${heading}@latest/latin-700-normal.woff2)`;
		const body400url = `url(https://cdn.jsdelivr.net/fontsource/fonts/${body}@latest/latin-400-normal.woff2)`;
		const body600url = `url(https://cdn.jsdelivr.net/fontsource/fonts/${body}@latest/latin-600-normal.woff2)`;

		await Promise.allSettled([
			loadFont(body, body400url, '400'),
			loadFont(body, body600url, '600'),
			loadFont(heading, headingUrl, '700')
		]).then((res) => {
			if (res[0].status == 'fulfilled' && res[1].status == 'fulfilled')
				externalRef.style.setProperty('--bodyFont', body);
			if (res[2].status == 'fulfilled') externalRef.style.setProperty('--headerFont', heading);
		});
	});
</script>

<div class="external" bind:this={externalRef}>
	<Navbar on:change={(e) => toggleTheme(e.detail.theme)} />
	<slot />
</div>

<style>
	.external {
		width: 100vw;
		height: 100vh;
		background-color: var(--backgroundColor);
	}
</style>
