<script lang="ts">
	import { page } from '$app/stores';
	import { showToast } from '$client/utils.client';
	import AsyncButton from '$components/button/asyncButton.svelte';
	import Background from '$components/other/background.svelte';
	import FormWrapper from '$components/other/formWrapper.svelte';
	import { imgHandler } from '$global/utils.global';
	import type { SubmitFunction } from '@sveltejs/kit';

	const changeBackground: SubmitFunction = async () => {
		state = 'loading';
		return ({ result, update }) => {
			if (result.type === 'failure') showToast('Failure', result.data.message, 'danger');
			if (result.type === 'success')
				showToast('Success', 'The background has been updated.', 'success');
			state = 'idle';
			update();
		};
	};

	const handleUrlChange = (url: string) => {
		background = url;
	};

	let state: 'loading' | 'idle' = 'idle';
	$: background = $page.data.settings.background as string;
</script>

<FormWrapper actionName="?/changeBackground" action={changeBackground}>
	<section class="input">
		<h3>Background</h3>
		<span
			>The background displayed in search results and the writing description page can be either a
			vibrant color or an engaging image. For the image click on it to upload a new one</span
		>
		<input
			type="file"
			id="imgInput"
			name="file"
			accept="image/*"
			on:input={(e) => {
				imgHandler(e, handleUrlChange);
			}}
		/>
		<label for="imgInput" class="url">
			<Background {background} />
		</label>
	</section>
	<svelte:fragment slot="submitter">
		<span class="description">Only images under or equal to 2.5mb are accepted.</span>
		<AsyncButton text="save" type="passive" {state} />
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

	.input input {
		display: none;
	}
	.url {
		--width: 100%;
		--ratio: 3/1;
		--radius: var(--border-radius);
		border-radius: var(--border-radius);
		overflow: hidden;
		cursor: pointer;
	}

	.description {
		color: var(--mutedColor);
		font-size: var(--small);
	}
</style>
