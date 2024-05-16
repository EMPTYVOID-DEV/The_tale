<script lang="ts">
	import {
		addBlockFile,
		isOwner,
		isSectionCreator,
		showAsyncToast,
		showToast
	} from '$client/utils.client';
	import SyncButton from '$components/button/syncButton.svelte';
	import StaticInput from '$components/input/staticInput.svelte';
	import DeleteIcon from '$icons/deleteIcon.svelte';
	import Altron from '@altron/altron/altron.svelte';
	import { componentMap } from '$altron/index';
	import type { SectionData } from '$global/types.global';
	import SaveIcon from '$icons/saveIcon.svelte';
	import PlusIcon from '$icons/plusIcon.svelte';
	import DialogAlert from '$components/other/dialogAlert.svelte';
	import type { dataBlock } from '@altron/altron/types';
	import { Toaster, toast } from 'svelte-sonner';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import { getValidator, sectionNameSchema } from '$global/zod';
	import ReactiveInput from '$components/input/reactiveInput.svelte';
	import AddNode from '../components/addNode.svelte';
	export let data: { sectionData: SectionData };
	let authority = isOwner() || isSectionCreator();
	let savingState: 'idle' | 'loading' = 'idle';
	let altronRef: Altron = null;
	const validateName = getValidator(sectionNameSchema);

	const saveAction: SubmitFunction = async ({ formData }) => {
		const altronData = altronRef.getData() as dataBlock[];
		altronData
			.filter((el) => {
				if (el.name == 'embed' && el.data.src == '') return false;
				if (el.name == 'attachment' || el.name == 'image') return el.data.src != '';
			})
			.forEach((el) => addBlockFile(el, formData));
		savingState = 'loading';
		formData.append('content', JSON.stringify(altronData));
		formData.append('name', data.sectionData.name);
		return ({ result, update }) => {
			if (result.type === 'failure') showToast('Failure', result.data.message, 'danger');
			if (result.type === 'success') showToast('Success', 'Successfully saving changes', 'success');
			savingState = 'idle';
			update();
		};
	};
</script>

<div class="writingContent">
	{#if authority}
		<ReactiveInput
			checkFunction={validateName}
			value={data.sectionData.name}
			label="New Section name (need to be unique)"
			on:change={(e) => {
				data.sectionData.name = e.detail.value;
			}}
		/>
	{/if}
	{#if authority}
		<section class="control">
			<DialogAlert
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
			<form action="?/save" method="post" enctype="multipart/form-data" use:enhance={saveAction}>
				<SyncButton
					text="Save changes"
					icon={SaveIcon}
					type={savingState == 'idle' ? 'primary' : 'disabled'}
				/>
			</form>
		</section>
	{/if}
	<section class="control">
		<AddNode action="addChild" sectionType="child" />
		<AddNode action="addSibling" sectionType="sibling" />
	</section>
	<section class="altron">
		<Altron
			{componentMap}
			bind:this={altronRef}
			marginTop="30px"
			marginBottom="30px"
			marginLeft="0"
			marginRight="0"
			secondaryColor="#ff6ec7"
			errorColor="#d62e2e"
			bgColor="#040110"
			textColor="#dfdafa"
			primaryColor="#6f3dd4"
			bodyFont="'Aileron', serif"
			headerFont="'Anek', sans-serif"
			initialData={data.sectionData.content}
			viewMode={!authority}
			sizeLimits={{ attachments: 2.2, imgs: 2.2 }}
		/>
	</section>
</div>
<Toaster duration={3500} expand />

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
