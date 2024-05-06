<script lang="ts">
	import { page } from '$app/stores';
	import { showToast } from '$client/utils.client';
	import SyncButton from '$components/button/syncButton.svelte';
	import ReactiveInput from '$components/input/reactiveInput.svelte';
	import FormWrapper from '$components/other/formWrapper.svelte';
	import { validateUsername } from '$global/zod';
	import type { SubmitFunction } from '@sveltejs/kit';

	$: username = $page.data.username;

	const changeUsername: SubmitFunction = async () => {
		return ({ result, update }) => {
			if (result.type == 'failure') showToast('Failure', result.data.message, 'danger');
			if (result.type == 'success') showToast('Success', 'We updated your username.', 'success');
			update();
		};
	};
</script>

<FormWrapper actionName="?/changeUsername" action={changeUsername}>
	<section class="input">
		<h3>Username</h3>
		<span>You can change the username to your liking.</span>
		<ReactiveInput name="username" value={username} checkFunction={validateUsername} />
	</section>
	<svelte:fragment slot="submitter">
		<span class="description">Username must between 4 and 28 characters long.</span>
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
		color: var(--mutedColor);
	}

	@media screen and (max-width: 768px) {
		.input {
			--width: 80%;
		}
	}
</style>
