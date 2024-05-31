<script lang="ts">
	import { altronTheme } from '$global/const.global';
	import { getHighlighterCore } from 'shiki';
	import getWasm from 'shiki/wasm';
	import { SvelteComponent, getContext, onMount, type ComponentType } from 'svelte';
	export let text: string;
	export let lang: string;

	const componentMap = getContext('componentMap') as Map<string, ComponentType<SvelteComponent>>;
	const DoneIcon = componentMap.get('doneIcon');
	const CopyIcon = componentMap.get('copyIcon');
	let copyStatement = false;
	let code = text;

	function copyCode() {
		navigator.clipboard.writeText(text);
		copyStatement = true;
		new Promise((res) => setTimeout(res, 800)).then(() => (copyStatement = false));
	}
	onMount(async () => {
		const { bundledLanguages } = await import('shiki/langs');
		const importFn = (bundledLanguages as any)[lang.toLowerCase()];
		const highlighter = await getHighlighterCore({
			loadWasm: getWasm,
			themes: [altronTheme],
			langs: []
		});
		await highlighter.loadLanguage(await importFn());
		code = highlighter.codeToHtml(text, {
			lang: lang.toLowerCase(),
			theme: 'altronTheme'
		});
	});
</script>

<div class="viewCode">
	<div class="lang">
		<span>{lang}</span>
		{#if !copyStatement}
			<button on:click|stopPropagation={copyCode} class="control"
				><svelte:component this={CopyIcon} /></button
			>
		{:else}
			<svelte:component this={DoneIcon} />
		{/if}
	</div>
	<div class="content">
		{@html code}
	</div>
</div>

<style>
	.viewCode {
		width: 100%;
		display: flex;
		flex-direction: column;
		border: 1px solid var(--textColor);
		border-radius: var(--border-radius);
		overflow: hidden;
	}

	.lang {
		width: 100%;
		background-color: transparent;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-inline: 0.75rem;
		padding-block: 0.25rem;
		border-bottom: 1px solid var(--textColor);
	}

	.lang span {
		font-weight: 600;

		text-transform: capitalize;
		color: var(--textColor);
	}
	.control {
		all: unset;
		cursor: pointer;
	}
	.content {
		width: 100%;
		background-color: color-mix(in srgb, var(--textColor) 8%, transparent 92%);
		padding-inline: 0.75rem;
		padding-block: 0.25rem;
		color: var(--foregroundColor);
	}
</style>
