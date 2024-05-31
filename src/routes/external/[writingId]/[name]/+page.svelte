<script lang="ts">
	import { page } from '$app/stores';
	import { isMobileExternal, mobileAppear } from '$client/stores.js';
	import AltronInstance from '$components/other/altronInstance.svelte';
	import Section from '$components/sections/section.svelte';
	import { navHeight } from '$global/const.global';
	import { setContext } from 'svelte';
	import Location from '../components/location.svelte';
	import MobileToc from '../components/mobileToc.svelte';
	import Toc from '../components/toc.svelte';
	export let data;
	$: name = $page.params.name;
	$: {
		if (name) mobileAppear.set(false);
	}
	setContext('location', 'viewing');
</script>

<div class="section" style:--navHeight="{navHeight}px">
	{#if $mobileAppear}
		<section class="mobileSecondNav">
			<Section section={data.rootSection} />
		</section>
	{:else}
		{#if !$isMobileExternal}
			<section class="secondNav">
				<Section section={data.rootSection} />
			</section>
		{/if}
		<section class="content">
			<Location {name} rootSection={data.rootSection} />
			{#if $isMobileExternal}
				<MobileToc content={data.content} />
			{/if}
			{#key data}
				<AltronInstance content={data.content} viewMode />
			{/key}
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
		display: grid;
		grid-template-columns: repeat(12, minmax(0, 1fr));
		align-items: start;
		margin-top: var(--navHeight);
		gap: 1rem;
		padding-inline: 2.5%;
		background-color: var(--backgroundColor);
	}

	.toc,
	.secondNav {
		height: calc(100vh - var(--navHeight));
		grid-column: span 2 / span 2;
		overflow-y: scroll;
		position: sticky;
		top: var(--navHeight);
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.content {
		width: 100%;
		min-height: calc(100vh - var(--navHeight));
		grid-column: span 8 / span 8;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.mobileSecondNav {
		grid-column: span 12 / span 12;
		height: calc(100vh - var(--navHeight));
	}

	@media screen and (width<1012px) {
		.content {
			grid-column: span 12 / span 12;
		}
	}
</style>
