<script lang="ts">
	import { onMount } from 'svelte';
	import Navbar from './components/navbar.svelte';
	import { isMobileExternal, mobileAppear } from '$client/stores';
	import { paddingTop, navHeight } from '$global/const.global';

	export let data;
	let externalRef: HTMLDivElement;
	$: isOneSection = data.rootSection.rootChild == null && data.rootSection.sibling == null;

	function toggleTheme(theme: 'dark' | 'light') {
		const colors = data.colors[theme];
		externalRef.style.setProperty('--foregroundColor', colors.text);
		externalRef.style.setProperty('--backgroundColor', colors.bg);
		externalRef.style.setProperty('--primaryColor', colors.primary);
		externalRef.style.setProperty('--mutedColor', colors.muted);
	}

	async function createFontPromise(name: string, url: string, weight: string) {
		return new FontFace(name, url, { display: 'swap', weight })
			.load()
			.then((font) => document.fonts.add(font));
	}

	function handleMobileMedia() {
		const changeStatus = (matches: boolean) => {
			if (matches) isMobileExternal.set(true);
			else {
				isMobileExternal.set(false);
				mobileAppear.set(false);
			}
		};
		const mobileMedia = window.matchMedia('(width<1012px)');
		mobileMedia.addEventListener('change', (e) => changeStatus(e.matches));
		changeStatus(mobileMedia.matches);
	}

	async function loadFonts() {
		const { body, heading } = data.fonts;
		const fontLoads = [];
		const body400url = `url(https://cdn.jsdelivr.net/fontsource/fonts/${body}@latest/latin-400-normal.woff2)`;
		const body600url = `url(https://cdn.jsdelivr.net/fontsource/fonts/${body}@latest/latin-600-normal.woff2)`;
		const headingUrl = `url(https://cdn.jsdelivr.net/fontsource/fonts/${heading}@latest/latin-700-normal.woff2)`;

		fontLoads.push(createFontPromise(body, body400url, '400'));
		fontLoads.push(createFontPromise(body, body600url, '600'));
		fontLoads.push(createFontPromise(heading, headingUrl, '700'));

		Promise.allSettled(fontLoads).then((res) => {
			if (res[0].status == 'fulfilled' && res[1].status == 'fulfilled')
				externalRef.style.setProperty('--bodyFont', body);
			if (res[2].status == 'fulfilled') externalRef.style.setProperty('--headerFont', heading);
		});
	}

	onMount(async () => {
		toggleTheme('dark');
		handleMobileMedia();
		loadFonts();
	});
</script>

<div
	class="external"
	bind:this={externalRef}
	style:--paddingTop="{paddingTop}px"
	style:--navHeight="{navHeight}px"
>
	<Navbar {isOneSection} on:change={(e) => toggleTheme(e.detail.theme)} />
	<slot />
</div>

<style>
	.external {
		width: 100vw;
	}
</style>
