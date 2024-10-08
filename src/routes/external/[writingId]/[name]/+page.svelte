<script lang="ts">
	import { page } from '$app/stores';
	import { isMobileExternal, mobileAppear } from '$client/stores.js';
	import AltronInstance from '$components/other/altronInstance.svelte';
	import Section from '$components/sections/section.svelte';
	import { paddingTop } from '$global/const.global';
	import { setContext } from 'svelte';
	import Location from '../components/location.svelte';
	import MobileToc from '../components/mobileToc.svelte';
	import Toc from '../components/toc.svelte';
	import { fly } from 'svelte/transition';
	import { quadInOut } from 'svelte/easing';
	import QuickNav from '../components/quickNav.svelte';
	export let data;
	$: isOneSection = data.rootSection.rootChild == null && data.rootSection.sibling == null;
	$: name = $page.params.name;
	$: {
		if (name) mobileAppear.set(false);
	}
	setContext('location', 'viewing');
</script>

<div class="section">
	{#if $mobileAppear}
		<section
			class="mobileSecondNav"
			transition:fly={{ duration: 600, easing: quadInOut, opacity: 0.2, x: '-50vw' }}
		>
			<Section section={data.rootSection} />
		</section>
	{:else}
		{#if !$isMobileExternal && !isOneSection}
			<section class="secondNav">
				<Section section={data.rootSection} />
			</section>
		{/if}
		<section class="content" class:isOneSection>
			{#if $isMobileExternal}
				<MobileToc content={data.content} />
			{/if}
			{#if !isOneSection}
				<Location {name} rootSection={data.rootSection} />
			{/if}
			{#key data}
				<AltronInstance content={data.content} viewMode />
			{/key}
			{#if !isOneSection}
				<QuickNav rootSection={data.rootSection} {name} />
			{/if}
		</section>
		{#if !$isMobileExternal}
			<section class="toc">
				<Toc content={data.content} />
			</section>
		{/if}
	{/if}
</div>

<style>
	.section {
		width: 100%;
		min-height: 100vh;
		display: grid;
		grid-template-columns: repeat(12, minmax(0, 1fr));
		align-items: start;
		padding-top: var(--paddingTop);
		gap: 1rem;
		padding-inline: 2.5%;
		background-color: var(--backgroundColor);
		padding-bottom: 2rem;
	}

	.toc,
	.secondNav {
		height: calc(100vh - var(--paddingTop));
		grid-column: span 2 / span 2;
		overflow-y: scroll;
		position: sticky;
		top: var(--paddingTop);
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.content {
		grid-column: span 8 / span 8;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.isOneSection {
		grid-column: span 10 / span 10;
	}

	.mobileSecondNav {
		height: calc(100vh - var(--navHeight));
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		grid-column: span 12 / span 12;
	}

	@media screen and (width<1012px) {
		.content {
			grid-column: span 12 / span 12;
		}
		.section {
			padding-top: var(--navHeight);
		}
	}
</style>
