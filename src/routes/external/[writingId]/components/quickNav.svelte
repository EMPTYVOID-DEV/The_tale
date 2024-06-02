<script lang="ts">
	import { page } from '$app/stores';
	import type { Section } from '$global/types.global';
	import { getNeighbors } from '$global/utils.global';
	import LeftIcon from '$icons/leftIcon.svelte';
	import RightIcon from '$icons/rightIcon.svelte';
	export let rootSection: Section;
	export let name: string;
	$: neighbors = getNeighbors(rootSection, name);
</script>

<div class="quickNav">
	{#if neighbors.prev}
		<a class="neighbor" href="/external/{$page.params.writingId}/{neighbors.prev.name}">
			<span class="control"><LeftIcon /></span>
			<span>{neighbors.prev.name}</span>
		</a>
	{/if}
	{#if neighbors.next}
		<a class="neighbor" href="/external/{$page.params.writingId}/{neighbors.next.name}">
			<span>{neighbors.next.name}</span>
			<span class="control"><RightIcon /></span>
		</a>
	{/if}
</div>

<style>
	.quickNav {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		align-items: center;
		border-top: 1px solid var(--mutedColor);
		padding-top: 3rem;
		gap: 5%;
	}

	.neighbor {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.5rem;
		border: 1px solid var(--foregroundColor);
		border-radius: var(--border-radius);
	}
	.control {
		max-width: 32px;
		aspect-ratio: 1/1;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.25rem;
		border: 1px solid var(--foregroundColor);
		border-radius: 50%;
		--icon: var(--foregroundColor);
	}
	.neighbor span {
		font-weight: 600;
		color: var(--foregroundColor);
	}
</style>
