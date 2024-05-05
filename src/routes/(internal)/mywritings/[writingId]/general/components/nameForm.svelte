<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { showToast } from '$client/utils.client';
	import SyncButton from '$components/button/syncButton.svelte';
	import ReactiveInput from '$components/input/reactiveInput.svelte';
	import { validateWritingName } from '$global/zod';
	import type { SubmitFunction } from '@sveltejs/kit';

	$: name = $page.data.settings.name;

	const changeName: SubmitFunction = async () => {
		return ({ result, update }) => {
			if (result.type == 'failure') showToast('Failure', result.data.message, 'danger');
			if (result.type == 'success') showToast('Success', 'We updated your username.', 'success');
			update({ reset: false });
		};
	};
</script>

<form action="?/changeName" method="post" class="name-form" use:enhance={changeName}>
	<section class="input">
		<h3>Name</h3>
		<span>You can change the writing name to your liking.</span>
		<ReactiveInput name="name" value={name} checkFunction={validateWritingName} />
	</section>
	<section class="submitter">
		<span>Writing name must betwee 4 and 32 characters.</span>
		<SyncButton text="save" type="passive" />
	</section>
</form>

<style>
	.name-form {
		--mixed-light: color-mix(in srgb, var(--foregroundColor) 8%, transparent 92%);
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: var(--mixed-light);
		border: 1px solid var(--mutedColor);
		border-radius: var(--border-radius);
		overflow: hidden;
	}

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

	.submitter {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-inline: 1rem;
		padding-block: 0.5rem;
		border-top: 1px solid var(--mutedColor);
	}

	.submitter span {
		color: var(--mutedColor);
	}

	@media screen and (max-width: 768px) {
		.input {
			--width: 80%;
		}
	}
</style>
