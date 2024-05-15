<script lang="ts">
	import { isOwner, isSectionCreator } from '$client/utils.client';
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
	import uuid from 'short-uuid';
	import { destructorFileName, promiseTimeout } from '$global/utils.global';
	import { Toaster, toast } from 'svelte-sonner';
	import AsyncToast from '$components/toast/asyncToast.svelte';
	import { invalidateAll } from '$app/navigation';
	export let data: { sectionData: SectionData };
	let authority = isOwner() || isSectionCreator();
	let savingState: 'idle' | 'loading' = 'idle';
	let altronRef: Altron = null;
	async function deleteAction() {
		const headers = new Headers();
		headers.append('Content-Type', 'multipart/form-data');
		await fetch('?/delete', {
			method: 'post',
			headers
		});
		invalidateAll();
	}

	async function save() {
		savingState = 'loading';
		const data = altronRef.getData() as dataBlock[];
		const fd = new FormData();
		data
			.filter((el) => {
				if (el.name == 'embed' && el.data.src == '') return false;
				if (el.name == 'attachment' || el.name == 'image') return el.data.src != '';
			})
			.forEach((el) => {
				if ((el.name == 'attachment' || el.name == 'image') && el.data.file) {
					const random = uuid().generate();
					const { extension } = destructorFileName(el.data.file.name);
					const name = `${random}.${extension}`;
					const file = new File([el.data.file], name, { type: el.data.file.type });
					el.data.file = null;
					el.data.src = `/sections/${name}`;
					fd.append('files', file);
				}
			});
		fd.append('content', JSON.stringify(data));
		return customFetch(fd);
	}

	async function customFetch(fd: FormData) {
		const sveltekitRes = (await fetch('?/save', {
			method: 'post',
			body: fd
		}).then((res) => res.json())) as { type: 'success' | 'failure' };
		setTimeout(() => toast.dismiss(), 2000);
		if (sveltekitRes.type == 'failure')
			return Promise.reject({ header: 'Error', description: 'There was an error when saving' });
		return Promise.resolve().then(() => {
			invalidateAll();
			savingState = 'idle';
			return { header: 'Saved', description: 'Has been saved successfully', toastAction: null };
		});
	}

	function callAsyncToast() {
		toast.custom(AsyncToast, {
			duration: 12000,
			componentProps: {
				promise: save(),
				loadingState: {
					header: 'Loading',
					description: 'Saving in progress...',
					toastAction: null
				}
			}
		});
	}
</script>

<div class="writingContent">
	{#if authority}
		<StaticInput value={data.sectionData.name} label="New Section name (need to be unique)" />
	{/if}
	{#if authority}
		<section class="control">
			<DialogAlert
				on:confirm={deleteAction}
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
			<SyncButton
				text="Save changes"
				icon={SaveIcon}
				on:click={callAsyncToast}
				type={savingState == 'idle' ? 'primary' : 'disabled'}
			/>
		</section>
		<section class="control">
			<SyncButton text="Add a child" icon={PlusIcon} />
			<SyncButton text="Add a sibling" icon={PlusIcon} />
		</section>
	{/if}
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
<Toaster />

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

	@media screen and (width<764px) {
		.altron {
			width: 100%;
		}
	}
</style>
