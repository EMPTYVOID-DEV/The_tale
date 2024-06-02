<script lang="ts">
	import type { Section } from '$global/types.global';
	import { getDepthPath, traverseToTarget } from '$global/utils.global';
	import HomeIcon from '$icons/homeIcon.svelte';
	import RightIcon from '$icons/rightIcon.svelte';
	export let rootSection: Section;
	export let name: string;
	$: path = getDepthPath(traverseToTarget(rootSection, name));
</script>

<div class="location">
	<HomeIcon />
	{#each path as item, idx}
		<span>{item.name}</span>
		{#if idx < path.length - 1}
			<RightIcon />
		{/if}
	{/each}
</div>

<style>
	.location {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	.location span {
		color: var(--mutedColor);
	}
	.location span:last-child {
		color: var(--primaryColor);
	}
</style>
