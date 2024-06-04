<script lang="ts">
	import { addBlockFile, isOwner, isSectionCreator, showToast } from '$client/utils.client';
	import SyncButton from '$components/button/syncButton.svelte';
	import DeleteIcon from '$icons/deleteIcon.svelte';
	import Altron from '@altron/altron/altron.svelte';
	import type { SectionData } from '$global/types.global';
	import SaveIcon from '$icons/saveIcon.svelte';
	import DialogAlert from '$components/other/dialogAlert.svelte';
	import { Toaster } from 'svelte-sonner';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import { getValidator, sectionNameSchema } from '$global/zod';
	import ReactiveInput from '$components/input/reactiveInput.svelte';
	import AddNode from '../components/addNode.svelte';
	import AltronInstance from '$components/other/altronInstance.svelte';

	export let data: { sectionData: SectionData };
	let authority = isOwner() || isSectionCreator();
	let savingState: 'idle' | 'saving' = 'idle';
	let altronRef: Altron = null;
	const validateName = getValidator(sectionNameSchema);

	const saveAction: SubmitFunction = async ({ formData }) => {
		savingState = 'saving';
		let altronData = altronRef.getAllBlocks();
		altronData.forEach((el) => addBlockFile(el, formData));
		formData.append('content', JSON.stringify(altronData));
		formData.append('name', data.sectionData.name);
		return ({ result, update }) => {
			setTimeout(() => {
				savingState = 'idle';
			}, 3800);
			if (result.type === 'failure') showToast('Failure', result.data.message, 'danger');
			if (result.type === 'success') showToast('Success', 'Successfully saving changes', 'success');
			update();
		};
	};
</script>

<div class="writingContent">
	{#if authority}
		<ReactiveInput
			checkFunction={validateName}
			value={data.sectionData.name}
			label="New Section name (need to be unique and does not contain special characters)"
			on:change={(e) => {
				data.sectionData.name = e.detail.value;
			}}
		/>
	{/if}
	{#if authority}
		<section class="control">
			<form action="?/delete" method="post">
				<DialogAlert
					on:confirm
					type="danger"
					header="Do you really want to delete?"
					description="This action will remove this section from the writing and erase all of it data. Continue with caution."
				>
					<svelte:fragment slot="alertTrigger" let:open>
						<SyncButton
							text="Delete section"
							icon={DeleteIcon}
							type="danger"
							on:click={(e) => {
								e.preventDefault();
								open();
							}}
						/>
					</svelte:fragment>
				</DialogAlert>
			</form>
			<form action="?/save" method="post" enctype="multipart/form-data" use:enhance={saveAction}>
				<SyncButton
					text="Save changes"
					icon={SaveIcon}
					type={savingState == 'idle' ? 'primary' : 'disabled'}
				/>
				{#if savingState == 'saving'}
					<Toaster duration={3500} expand />
				{/if}
			</form>
		</section>
	{/if}
	<section class="control">
		<AddNode action="addChild" sectionType="child" />
		<AddNode action="addSibling" sectionType="sibling" />
	</section>
	<section class="altron">
		<AltronInstance
			bind:altronRef
			content={data.sectionData.content}
			viewMode={!authority}
			--margin-top="20px"
			--margin-bottom="20px"
		/>
	</section>
</div>

<style>
	.writingContent {
		width: 100%;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.control {
		width: 100%;
		display: flex;
		flex-direction: row;
		gap: 0.25rem;
		--width: 50%;
	}
	.altron {
		width: 80%;
	}

	form {
		display: contents;
	}
	@media screen and (width<764px) {
		.altron {
			width: 100%;
		}
	}
</style>
