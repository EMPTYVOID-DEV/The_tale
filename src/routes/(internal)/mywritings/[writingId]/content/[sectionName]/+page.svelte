<script lang="ts">
	import { isOwner, isSectionCreator } from '$client/utils.client';
	import SyncButton from '$components/button/syncButton.svelte';
	import StaticInput from '$components/input/staticInput.svelte';
	import DeleteIcon from '$icons/deleteIcon.svelte';
	import Altron from '@altron/altron/altron.svelte';
	import { componentMap } from '$altron/index';
	import type { sectionData } from '$global/types.global';
	import SaveIcon from '$icons/saveIcon.svelte';
	import PlusIcon from '$icons/plusIcon.svelte';
	import DialogAlert from '$components/other/dialogAlert.svelte';
	export let data: sectionData;
	let authority = isOwner() || isSectionCreator();

	async function handleDelete() {
		const headers = new Headers();
		headers.append('Content-Type', 'multipart/form-data');
		const res = await fetch('?/delete', {
			method: 'post',
			headers
		});
	}
</script>

<div class="writingContent">
	{#if authority}
		<StaticInput value={data.name} label="New Section name (need to be unique)" />
	{/if}
	{#if authority}
		<section class="control">
			<DialogAlert
				on:confirm={handleDelete}
				type="danger"
				header="Do you really want to delete?"
				description="This action will remove this section from the writing and erase all of it data. Continue with caution."
			>
				<svelte:fragment slot="alertTrigger" let:open>
					<SyncButton
						text="Delete section"
						icon={DeleteIcon}
						type="danger"
						on:click={() => open()}
					/>
				</svelte:fragment>
			</DialogAlert>
			<SyncButton text="Save changes" icon={SaveIcon} />
		</section>
		<section class="control">
			<SyncButton text="Add a child" icon={PlusIcon} />
			<SyncButton text="Add a sibling" icon={PlusIcon} />
		</section>
	{/if}
	<Altron
		{componentMap}
		marginTop="1rem"
		secondaryColor="#ff6ec7"
		errorColor="#d62e2e"
		bgColor="#040110"
		textColor="#dfdafa"
		primaryColor="#6f3dd4"
		bodyFont="'Aileron', serif"
		headerFont="'Anek', sans-serif"
		initialData={data.content}
		viewMode={!authority}
	/>
</div>

<style>
	.writingContent {
		width: 100%;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.control {
		width: 100%;
		display: flex;
		flex-direction: row;
		gap: 0.25rem;
		--width: 50%;
	}
</style>
