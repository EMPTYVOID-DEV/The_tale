<script lang="ts">
	import { scrollToHeader } from '$client/utils.client';
	import type { dataBlock } from '@altron/altron/types';
	import DownIcon from '$icons/downIcon.svelte';
	import RightIcon from '$icons/rightIcon.svelte';
	import SyncButton from '$components/button/syncButton.svelte';
	export let content: dataBlock[];
	let appear = false;
</script>

<div class="mobileToc">
	<SyncButton
		text="On this page"
		on:click={() => (appear = !appear)}
		icon={appear ? DownIcon : RightIcon}
	/>

	{#if appear}
		<section class="headers">
			{#each content as header}
				{#if header.name == 'header'}
					<span class="level{header.data.level} header" on:click={() => scrollToHeader(header.id)}
						>{header.data.text}</span
					>
				{/if}
			{/each}
		</section>
	{/if}
</div>

<style>
	.mobileToc {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.headers {
		display: flex;
		flex-direction: column;
		padding: 0.5rem;
		gap: 0.5rem;
	}

	.header {
		font-weight: 600;
		color: var(--foregroundColor);
		cursor: pointer;
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
</style>
