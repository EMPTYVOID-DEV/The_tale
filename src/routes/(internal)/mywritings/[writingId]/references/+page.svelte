<script lang="ts">
	import Reference from './components/reference.svelte';
	import type { Reference as referenceType } from '$global/types.global';
	import FormWrapper from '$components/other/formWrapper.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import TextArea from '$components/other/textArea.svelte';
	import SyncButton from '$components/button/syncButton.svelte';
	import PlusIcon from '$icons/plusIcon.svelte';
	import { showToast } from '$client/utils.client';
	import { Toaster } from 'svelte-sonner';
	import ReactiveInput from '$components/input/reactiveInput.svelte';
	import { getValidator, hrefSchema, referenceTitleSchema } from '$global/zod';

	export let data: { references: referenceType[] };
	const validateHref = getValidator(hrefSchema);
	const validateTitle = getValidator(referenceTitleSchema);
	const addReference: SubmitFunction = async () => {
		return ({ result, update }) => {
			if (result.type == 'failure') showToast('Error', result.data.message, 'danger');
			if (result.type == 'success')
				showToast('Success', 'A reference has been added successfully', 'success');
			update({ reset: false });
		};
	};
</script>

<div class="references">
	<FormWrapper action={addReference} actionName="?/addReference">
		<section class="input">
			<h3>Add a new reference</h3>
			<ReactiveInput label="Enter reference title" name="title" checkFunction={validateTitle} />
			<ReactiveInput label="Enter reference link" name="href" checkFunction={validateHref} />
			<TextArea name="description" label="Reference description" --height="160px" />
		</section>
		<svelte:fragment slot="submitter">
			<span class="description"
				>Your reference description can't exceed 160 words.Furthermore you can't have two references
				with same title or same link.</span
			>
			<SyncButton text="Add new reference" icon={PlusIcon} />
		</svelte:fragment>
	</FormWrapper>
	<Reference accordianList={data.references} />
</div>

<Toaster duration={3500} expand />

<style>
	.references {
		width: 100%;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		padding-bottom: 30px;
	}
	.input {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		gap: 0.75rem;
		--width: 80%;
	}
	.input h3 {
		color: var(--foregroundColor);
	}

	.description {
		font-size: var(--small);
		color: var(--mutedColor);
	}

	@media screen and (width<768px) {
		.input {
			--width: 100%;
		}
	}
</style>
