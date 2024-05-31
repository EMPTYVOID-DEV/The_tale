<script lang="ts">
	import { page } from '$app/stores';
	import type { Section, SectionsLocation } from '$global/types.global';
	import DownIcon from '$icons/downIcon.svelte';
	import RightIcon from '$icons/rightIcon.svelte';
	import { getContext } from 'svelte';
	import Sections from './sections.svelte';
	export let section: Section;
	const { writingId } = $page.params;
	const location = getContext('location') as SectionsLocation;
	const href =
		location == 'editing'
			? `/mywritings/${writingId}/content/${section.name}`
			: `/external/${writingId}/${section.name}`;
	let showChildren = false;
</script>

<div class="section">
	<section class="head">
		<a {href} class="name">
			{section.name}
		</a>
		{#if section.rootChild}
			{#if showChildren}
				<button class="control" on:click={() => (showChildren = false)}>
					<DownIcon />
				</button>
			{:else}
				<button class="control" on:click={() => (showChildren = true)}>
					<RightIcon />
				</button>
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
	}

	.control {
		all: unset;
		cursor: pointer;
	}
</style>
