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
		<a class="prev neighbor" href="/external/{$page.params.writingId}/{neighbors.prev.name}">
			<span>Previous</span>
			<div>
				<LeftIcon />
				<span>{neighbors.prev.name}</span>
			</div>
		</a>
	{/if}
	{#if neighbors.next}
		<a class="next neighbor" href="/external/{$page.params.writingId}/{neighbors.next.name}">
			<span>Next</span>
			<div>
				<span>{neighbors.next.name}</span>
				<RightIcon />
			</div>
		</a>
	{/if}
</div>

<style>
	.quickNav {
		width: 100%;
		display: flex;
		align-items: center;
		border-top: 1px solid var(--foregroundColor);
		padding-top: 3rem;
		gap: 5%;
	}

	.neighbor {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.next {
		margin-left: auto;
	}

	.neighbor > span {
		font-size: var(--small);
		color: var(--mutedColor);
	}

	.neighbor div {
		display: flex;
		gap: 0.5rem;
	}

	.neighbor div span {
		color: var(--foregroundColor);
		font-weight: 600;
	}
</style>
