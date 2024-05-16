<script lang="ts">
	import { page } from '$app/stores';
	import type { Section } from '$global/types.global';
	import DownIcon from '$icons/downIcon.svelte';
	import SectionIcon from '$icons/sectionIcon.svelte';
	import UpIcon from '$icons/upIcon.svelte';
	import Sections from './sections.svelte';
	export let section: Section;
	let showChildren = false;
</script>

<div class="section">
	<section class="head">
		<a href="/mywritings/{$page.params.writingId}/content/{section.name}" class="name">
			<SectionIcon />
			<span>{section.name}</span>
		</a>
		{#if section.rootChild}
			{#if showChildren}
				<button class="control" on:click={() => (showChildren = false)}>
					<UpIcon />
				</button>
			{:else}
				<button class="control" on:click={() => (showChildren = true)}>
					<DownIcon />
				</button>
			{/if}
		{/if}
	</section>
	{#if section.rootChild && showChildren}
		<Sections --padding="1.5rem" --border="3px">
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
		color: var(--primaryColor);
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.name span {
		color: var(--foregroundColor);
		font-weight: bold;
	}

	.head {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.control {
		all: unset;
		display: flex;
		justify-content: center;
		align-items: center;
		width: fit-content;
		height: fit-content;
		background-color: transparent;
		border: 1px solid var(--primaryColor);
		border-radius: 50%;
		cursor: pointer;
		padding: 1px;
	}
</style>
