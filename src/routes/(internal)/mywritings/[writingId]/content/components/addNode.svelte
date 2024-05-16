<script lang="ts">
	import { enhance } from '$app/forms';
	import Dialog from '$client/ui/components/other/dialog.svelte';
	import SyncButton from '$components/button/syncButton.svelte';
	import { showToast } from '$client/utils.client';
	import { quadInOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	import PlusIcon from '$icons/plusIcon.svelte';
	import { getValidator, sectionNameSchema } from '$global/zod';
	import ReactiveInput from '$components/input/reactiveInput.svelte';
	import { Toaster } from 'svelte-sonner';
	export let sectionType: 'child' | 'sibling' | 'root';
	export let action: 'addSibling' | 'addChild' | 'addRoot';
	const validateName = getValidator(sectionNameSchema);
</script>

<Dialog let:close>
	<svelte:fragment let:open slot="trigger">
		<SyncButton text="Create a {sectionType}" icon={PlusIcon} on:click={open} />
	</svelte:fragment>

	<form
		use:enhance={async () => {
			return ({ result, update }) => {
				//@ts-ignore
				if (result.type == 'failure') showToast('Error', result.data.message, 'danger');
				else {
					close();
					update();
				}
			};
		}}
		action="?/{action}"
		class="addNode"
		method="post"
		transition:scale={{ duration: 520, easing: quadInOut, start: 0, opacity: 0.2 }}
	>
		<h3>Create a new a {sectionType}</h3>
		<ReactiveInput
			label="{sectionType} section name"
			name={sectionType}
			checkFunction={validateName}
		/>
		<SyncButton text="Create {sectionType}" --width="100%" />
		<Toaster duration={3500} expand />
	</form>
</Dialog>

<style>
	.addNode {
		width: 40vw;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
		--width: 100%;
	}

	.addNode h3 {
		color: var(--foregroundColor);
	}
	@media screen and (width<764px) {
		.addNode {
			width: 90vw;
		}
	}
</style>
