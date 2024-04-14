<script>
	// TODO: add as jsdoc comments that side of container inside the dialog should be in view-ports not percentage
	import { tick } from 'svelte';
	/**@type {HTMLDialogElement}*/
	let dialogRef;
	let isOpen = false;
	async function open() {
		isOpen = true;
		await tick();
		dialogRef.showModal();
	}
	function close() {
		isOpen = false;
	}
</script>

<slot name="trigger" {open} />

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- outside click to close the model -->
{#if isOpen}
	<dialog
		bind:this={dialogRef}
		on:click|self={() => close()}
		on:close={(e) => {
			dialogRef.showModal();
			close();
		}}
	>
		<slot {close} />
	</dialog>
{/if}

<style>
	dialog {
		border: 0;
		padding: 0;
		outline: 0;
		box-shadow: none;
		background: none;
		max-width: 100vw;
		max-height: 100vh;
		overflow: visible;
	}

	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(4px);
	}
</style>
