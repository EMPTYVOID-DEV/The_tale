<script lang="ts">
	import { page } from '$app/stores';
	import { showToast } from '$client/utils.client';
	import SyncButton from '$components/button/syncButton.svelte';
	import FormWrapper from '$components/other/formWrapper.svelte';
	import TextArea from '$components/other/textArea.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';

	$: about = $page.data.about;

	const changeAbout: SubmitFunction = async () => {
		return ({ result, update }) => {
			if (result.type == 'failure') showToast('Failure', result.data.message, 'danger');
			if (result.type == 'success') showToast('Success', 'The about has been updated.', 'success');
			update({ reset: false });
		};
	};
</script>

<FormWrapper actionName="?/changeAbout" action={changeAbout}>
	<section class="input">
		<h3>About</h3>
		<span
			>Craft a concise author bio that highlights your skills, expertise, and achievements. Showcase
			what sets you apart and how you contribute to the platform.</span
		>
		<TextArea value={about} --height="160px" name="about" />
	</section>
	<svelte:fragment slot="submitter">
		<span class="description">Your about can't exceed 160 words.</span>
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
		font-size: var(--small);
	}
</style>
