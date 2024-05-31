<script lang="ts">
	import { page } from '$app/stores';
	import type { Section, SectionsLocation } from '$global/types.global';
	import DownIcon from '$icons/downIcon.svelte';
	import RightIcon from '$icons/rightIcon.svelte';
	import { getContext } from 'svelte';
	import Sections from './sections.svelte';
	import { goto } from '$app/navigation';
	export let section: Section;
	const { writingId } = $page.params;
	const location = getContext('location') as SectionsLocation;
	let showChildren = false;
	function navigate() {
		if (location == 'editing') goto(`/mywritings/${writingId}/content/${section.name}`);
		else goto(`/external/${writingId}/${section.name}`);
	}

	function toggle() {
		showChildren = !showChildren;
	}
</script>

<div class="section">
	<section class="head" on:click={toggle}>
		<span
			class="name"
			class:active={location == 'viewing' && $page.params.name == section.name}
			on:click={navigate}
		>
			{section.name}
		</span>
		{#if section.rootChild}
			{#if showChildren}
				<DownIcon />
			{:else}
				<RightIcon />
			{/if}
		{/if}
	</section>
	{#if section.rootChild && showChildren}
		<Sections --padding="1.5rem" --border="2px">
			<svelte:self section={section.rootChild} />
		</Sections>
	{/if}
</div>

{#if section.sibling}
	<svelte:self section={section.sibling} />
{/if}

<style>
	.section {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 0.5rem;
	}

	.name {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		color: var(--foregroundColor);
		font-weight: bold;
		text-transform: capitalize;
	}

	.head {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		cursor: pointer;
	}

	.active {
		color: var(--primaryColor);
	}
</style>
