<script lang="ts">
	import { showToast } from '$client/utils.client';
	import AsyncButton from '$components/button/asyncButton.svelte';
	import Copy from '$components/other/copy.svelte';
	import FormWrapper from '$components/other/formWrapper.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';

	let state: 'idle' | 'loading' = 'idle';
	let apiKey = '';

	const resetKey: SubmitFunction = async () => {
		state = 'loading';
		return ({ result, update }) => {
			if (result.type == 'success') {
				showToast('Success', 'Copy your api key you can only see it once.', 'success');
				apiKey = result.data.apiKey;
			}
			state = 'idle';
			update();
		};
	};
</script>

<FormWrapper action={resetKey} actionName="?/resetKey">
	<section class="input">
		<h3>Api key</h3>
		<span
			>You can use the api key to get the data of your writings from our endpoints and use it in
			your platform.</span
		>
		{#if apiKey.length != 0}
			<Copy text={apiKey} />
		{/if}
	</section>

	<svelte:fragment slot="submitter">
		<span class="description">You can have only one api key if it get compromised reset it.</span>
		<AsyncButton text="Reset token" type="passive" {state} />
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

	.input :is(h3, span) {
		color: var(--foregroundColor);
	}

	.description {
		color: var(--mutedColor);
		font-size: var(--small);
	}
</style>
