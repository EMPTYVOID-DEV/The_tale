<script>
	import { getContext } from 'svelte';
	import DeleteIcon from '$icons/deleteIcon.svelte';
	import PlusIcon from '$icons/plusIcon.svelte';
	export let updateEntry;
	export let removeEntry;
	export let addEntry;
	export let checkEntry;
	export let items;
	const componentMap = getContext('componentMap');
	const Checked = componentMap.get('checkedIcon');
	const UnChecked = componentMap.get('unCheckedIcon');
	const Textarea = componentMap.get('textArea');
</script>

<div class="checkListExtra">
	<span class="header">Check list items </span>
	{#each items as item, index}
		<div class="itemEdit">
			{#if item.checked}
				<button class="toggle" on:click|stopPropagation={() => checkEntry(index, false)}>
					<svelte:component this={Checked} />
				</button>
			{:else}
				<button class="toggle" on:click|stopPropagation={() => checkEntry(index, true)}>
					<svelte:component this={UnChecked} /></button
				>
			{/if}
			<svelte:component
				this={Textarea}
				width={90}
				textContent={item.value}
				textLevel={0}
				changeHandler={(text) => {
					updateEntry(index, text);
				}}
			/>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<span
				class="control"
				on:click|stopPropagation={() => {
					removeEntry(index);
				}}><DeleteIcon --icon="#ff6ec7" /></span
			>
		</div>
	{/each}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<span
		class="control"
		on:click|stopPropagation={() => {
			// default value
			addEntry({ value: 'hello friend', checked: false });
		}}><PlusIcon --icon="#ff6ec7" /></span
	>
</div>

<style>
	.checkListExtra {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.checkListExtra > .header {
		font-weight: 700;
		color: var(--textColor);
		font-size: var(--small);
	}
	.itemEdit {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.toggle {
		all: unset;
		--primaryColor: #ff6ec7;
	}

	.control {
		cursor: pointer;
		width: 2.2rem;
		aspect-ratio: 1/1;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		border: 2px solid var(--secondaryColor);
		box-shadow:
			0 0 5px var(--secondaryColor),
			0 0 5px var(--secondaryColor),
			0 0 5px var(--secondaryColor);
	}
	.checkListExtra span:last-child {
		align-self: center;
	}
</style>
