<script lang="ts">
	import { page } from '$app/stores';
	import { showToast } from '$client/utils.client';
	import SyncButton from '$components/button/syncButton.svelte';
	import FormWrapper from '$components/other/formWrapper.svelte';
	import TextArea from '$components/other/textArea.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';

	$: description = $page.data.settings.description;

	const changeDescription: SubmitFunction = async () => {
		return ({ result, update }) => {
			if (result.type == 'failure') showToast('Failure', result.data.message, 'danger');
			if (result.type == 'success')
				showToast('Success', 'The description has been updated.', 'success');
			update({ reset: false });
		};
	};
</script>

<FormWrapper actionName="?/changeDescription" action={changeDescription}>
	<section class="input">
		<h3>Description</h3>
		<span>Writing description will give the readers an idea about the writing topic('s)</span>
		<TextArea value={description} --height="160px" name="description" />
	</section>
	<svelte:fragment slot="submitter">
		<span class="description">Writing description can't exceed 160 words.</span>
		<SyncButton text="save" type="passive" />
	</svelte:fragment>
</FormWrapper>

<style>
	.input {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		gap: 0.75rem;
	}

	.input h3,
	.input span {
		color: var(--foregroundColor);
	}

	.description {
		color: var(--mutedColor);
	}
</style>
