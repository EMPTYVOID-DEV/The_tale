<script lang="ts">
	import UpIcon from '$icons/upIcon.svelte';
	import DownIcon from '$icons/downIcon.svelte';
	import { slide } from 'svelte/transition';
	import HrefIcon from '$icons/hrefIcon.svelte';

	export let title: string;
	export let href: string;
	export let description: string;
	let show: boolean = false;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="accordianItem" on:click={() => (show = !show)}>
	<div class="title">
		<a class="href" {href} target="_blank">
			<span>{title}</span>
			<HrefIcon />
		</a>
		{#if show}
			<UpIcon />
		{:else}
			<DownIcon />
		{/if}
	</div>
	{#if show}
		<span class="description" transition:slide>{description}</span>
	{/if}
</div>

<style>
	.accordianItem {
		display: flex;
		flex-direction: column;
		padding-block: 0.5rem;
		padding-inline: 1rem;
		cursor: pointer;
		border-radius: var(--border-radius);
		border: 2px solid color-mix(in srgb, var(--primaryColor) 60%, transparent 40%);
	}
	.title {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.href {
		display: flex;
		align-items: flex-end;
		gap: 2px;
		margin-right: auto;
	}

	.href span {
		font-weight: 600;
		color: var(--primaryColor);
		font-size: var(--body);
		font-family: var(--bodyFont);
	}

	.description {
		margin-block: 0.5rem;
		word-break: break-word;
		white-space: pre-wrap;
		color: var(--foregroundColor);
		font-size: var(--body);
		font-family: var(--bodyFont);
	}
</style>
