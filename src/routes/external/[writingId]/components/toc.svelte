<script lang="ts">
	import { headerOnView, scrollToHeader } from '$client/utils.client';
	import type { dataBlock } from '@altron/altron/types';
	import { onMount } from 'svelte';
	export let content: dataBlock[];
	let activeHeader = '';
	onMount(() => {
		const updateActive = () => {
			headerOnView(content, (id) => (activeHeader = id));
		};
		window.addEventListener('scroll', updateActive);
		return () => window.removeEventListener('scroll', updateActive);
	});
</script>

<span class="descriptor">Table of content</span>
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
	.descriptor {
		font-weight: 700;
		color: var(--foregroundColor);
		font-family: var(--headerFont);
	}

	.header {
		cursor: pointer;
		color: var(--foregroundColor);
		font-size: var(--small);
		font-weight: 600;
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
