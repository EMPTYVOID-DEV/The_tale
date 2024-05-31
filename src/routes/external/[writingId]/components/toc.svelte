<script lang="ts">
	import { scrollToHeader } from '$client/utils.client';
	import { navHeight } from '$global/const.global';
	import type { dataBlock } from '@altron/altron/types';
	import { onMount } from 'svelte';
	export let content: dataBlock[];
	let activeHeader = '';
	onMount(() => {
		const headerOnView = () => {
			let oldThreshold = -1;
			content.forEach((block) => {
				if (block.name != 'header') return;
				const element = document.getElementById(block.id);
				const { top } = element.getBoundingClientRect();
				const newThreshold = Math.abs(navHeight - top);
				if (newThreshold < oldThreshold || oldThreshold == -1) {
					oldThreshold = newThreshold;
					activeHeader = block.id;
				}
			});
		};
		window.addEventListener('scroll', headerOnView);
		return () => window.removeEventListener('scroll', headerOnView);
	});
</script>

<h4>On this page</h4>
<div class="headers">
	{#each content as header}
		{#if header.name == 'header'}
			<span
				class:active={header.id == activeHeader}
				class="level{header.data.level} header"
				on:click={() => scrollToHeader(header.id)}>{header.data.text}</span
			>
		{/if}
	{/each}
</div>

<style>
	h4,
	.header {
		text-transform: capitalize;
		cursor: pointer;
		color: var(--foregroundColor);
	}

	.header:hover {
		color: color-mix(in srgb, var(--primaryColor) 60%, transparent 40%);
	}

	.headers {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.level2 {
		padding-left: 0.75rem;
	}
	.level3 {
		padding-left: 1.5rem;
	}
	.level4 {
		padding-left: 3rem;
	}
	.active {
		color: var(--primaryColor);
	}
</style>
