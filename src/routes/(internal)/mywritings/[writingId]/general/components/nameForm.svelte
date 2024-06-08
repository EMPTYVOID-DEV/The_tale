<script lang="ts">
	import { page } from '$app/stores';
	import { showToast } from '$client/utils.client';
	import SyncButton from '$components/button/syncButton.svelte';
	import ReactiveInput from '$components/input/reactiveInput.svelte';
	import FormWrapper from '$components/other/formWrapper.svelte';
	import { getValidator, writingNameSchema } from '$global/zod';
	import type { SubmitFunction } from '@sveltejs/kit';

	$: name = $page.data.settings.name;
	const validateWritingName = getValidator(writingNameSchema);
	const changeName: SubmitFunction = async () => {
		return ({ result, update }) => {
			if (result.type == 'failure') showToast('Failure', result.data.message, 'danger');
			if (result.type == 'success') showToast('Success', 'The name has been updated', 'success');
			update({ reset: false });
		};
	};
</script>

<FormWrapper actionName="?/changeName" action={changeName}>
	<section class="input">
		<h3>Name</h3>
		<span>You can change the writing name to your liking.</span>
		<ReactiveInput name="name" value={name} checkFunction={validateWritingName} />
	</section>
	<svelte:fragment slot="submitter">
		<span class="description">Writing name must betwee 4 and 48 characters.</span>
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
		--width: 50%;
	}

	.input h3,
	.input span {
		color: var(--foregroundColor);
	}

	.description {
		font-size: var(--small);
		color: var(--mutedColor);
	}

	@media screen and (max-width: 768px) {
		.input {
			--width: 100%;
		}
	}
</style>
