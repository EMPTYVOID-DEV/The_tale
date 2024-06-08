<script>
	import AttachmentIcon from '$altron/icons/attachmentIcon.svelte';
	import ChecklistIcon from '$altron/icons/checklistIcon.svelte';
	import CloseQuoteIcon from '$altron/icons/closeQuoteIcon.svelte';
	import CodeIcon from '$altron/icons/codeIcon.svelte';
	import HeaderIcon from '$altron/icons/headerIcon.svelte';
	import ImageIcon from '$altron/icons/imageIcon.svelte';
	import ListIcon from '$altron/icons/listIcon.svelte';
	import ParagraphIcon from '$altron/icons/paragraphIcon.svelte';
	import SpaceIcon from '$altron/icons/spaceIcon.svelte';
	import CloseIcon from '$icons/closeIcon.svelte';
	import PlusIcon from '$icons/plusIcon.svelte';
	import { getContext } from 'svelte';
	export let add;
	const excludeBlocks = getContext('excludedBlocks');
	let options = new Map([
		['paragraph', ParagraphIcon],
		['header', HeaderIcon],
		['image', ImageIcon],
		['list', ListIcon],
		['quote', CloseQuoteIcon],
		['code', CodeIcon],
		['space', SpaceIcon],
		['checklist', ChecklistIcon],
		['attachment', AttachmentIcon]
	]);
	options = filterOptions(options);
	let toggle = true;
	// here we re removing the options without icons (not loaded) also the excluded onces

	function filterOptions(map) {
		const entries = [...map];
		const filteredEntrier = entries.filter(
			(value) => value[1] != undefined && !excludeBlocks.find((el) => el == value[0])
		);
		return new Map(filteredEntrier);
	}
</script>

<div class="toolBar">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<span on:click={() => (toggle = !toggle)} class="control">
		{#if toggle}
			<svelte:component this={CloseIcon} --icon="var(--textColor)" />
		{:else}
			<svelte:component this={PlusIcon} --icon="var(--textColor)" />
		{/if}
	</span>
	{#if toggle}
		<div class="options">
			{#each options.entries() as option, index}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<span
					class="option"
					on:click|stopPropagation={() => {
						const blockName = option[0];
						add(blockName);
						toggle = true;
					}}
				>
					<svelte:component this={option[1]} />
				</span>
			{/each}
		</div>
	{/if}
</div>

<style>
	.toolBar {
		width: fit-content;
		display: grid;
		grid-template-columns: repeat(2, auto);
		align-items: center;
		gap: 20px;
		margin-top: 1.5rem;
	}
	.toolBar span {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		aspect-ratio: 1/1;
		border-radius: 50%;
		cursor: pointer;
	}

	.control {
		border: 2px solid var(--textColor);
	}

	.options {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		justify-content: center;
		gap: 10px;
	}
	.option {
		border: 2px solid var(--primaryColor);
		position: relative;
	}
	.option > :global(svg path) {
		fill: var(--primaryColor);
	}
</style>
