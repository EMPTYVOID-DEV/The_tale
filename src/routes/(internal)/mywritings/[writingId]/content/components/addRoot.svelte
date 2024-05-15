<script lang="ts">
	import { enhance } from '$app/forms';
	import Dialog from '$client/ui/components/other/dialog.svelte';
	import SyncButton from '$components/button/syncButton.svelte';
	import StaticInput from '$components/input/staticInput.svelte';
	import { quadInOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	import PlusIcon from '$icons/plusIcon.svelte';
</script>

<Dialog let:close>
	<svelte:fragment let:open slot="trigger">
		<SyncButton text="Create root section" icon={PlusIcon} on:click={open} />
	</svelte:fragment>

	<form
		use:enhance={async () => {
			return ({ result, update }) => {
				close();
				update();
			};
		}}
		action="?/addRoot"
		class="addRoot"
		method="post"
		transition:scale={{ duration: 520, easing: quadInOut, start: 0, opacity: 0.2 }}
	>
		<h3>Create a new root</h3>
		<StaticInput label="Root section name" name="root" />
		<SyncButton text="Create root" --width="100%" />
	</form>
</Dialog>

<style>
	.addRoot {
		width: 40vw;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
	}

	.addRoot h3 {
		color: var(--foregroundColor);
	}
	@media screen and (width<764px) {
		.addRoot {
			width: 90vw;
		}
	}
</style>
