<script lang="ts">
	import { headerOnView, scrollToHeader } from '$client/utils.client';
	import type { dataBlock } from '@altron/altron/types';
	import DownIcon from '$icons/downIcon.svelte';
	import RightIcon from '$icons/rightIcon.svelte';
	import { slide } from 'svelte/transition';
	import { quadInOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	export let content: dataBlock[];
	let appear = false;
	let activeHeader = '';

	onMount(() => {
		const updateActive = () => {
			headerOnView(content, (id) => (activeHeader = id));
		};
		window.addEventListener('scroll', updateActive);
		return () => window.removeEventListener('scroll', updateActive);
	});
</script>

<div class="mobileToc">
	<div class="toggle" on:click={() => (appear = !appear)}>
		{#if appear}
			<DownIcon />
		{:else}
			<RightIcon />
		{/if}
		<span>Table of content</span>
	</div>

	{#if appear}
		<section class="headers" transition:slide={{ duration: 400, axis: 'y', easing: quadInOut }}>
			{#each content as header}
				{#if header.name == 'header'}
					<span
						class="level{header.data.level} header"
						on:click={() => scrollToHeader(header.id)}
						class:active={header.id == activeHeader}>{header.data.text}</span
					>
				{/if}
			{/each}
		</section>
	{/if}
</div>

<style>
	.mobileToc {
		position: sticky;
		top: var(--navHeight);
		display: flex;
		flex-direction: column;
		background-color: var(--backgroundColor);
		padding-block: 0.5rem;
		gap: 0.5rem;
	}

	.toggle {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		cursor: pointer;
	}

	.toggle span {
		font-family: var(--headerFont);
		color: var(--foregroundColor);
		font-weight: 700;
	}

	.headers {
		display: flex;
		flex-direction: column;
		padding-left: 1.75rem;
		gap: 0.5rem;
	}

	.header {
		font-weight: 600;
		color: var(--foregroundColor);
		cursor: pointer;
		font-size: var(--small);
	}

	.level2 {
		padding-left: 0.75rem;
	}
	.level3 {
		padding-left: 1.25rem;
	}
	.level4 {
		padding-left: 1.75rem;
	}

	.active {
		color: var(--primaryColor);
	}
</style>
