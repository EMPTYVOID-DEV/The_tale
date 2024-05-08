<script lang="ts">
	import { page } from '$app/stores';
	import { showToast } from '$client/utils.client';
	import AsyncButton from '$components/button/asyncButton.svelte';
	import FormWrapper from '$components/other/formWrapper.svelte';
	import { imgHandler } from '$global/utils.global';
	import type { SubmitFunction } from '@sveltejs/kit';

	let state: 'loading' | 'idle' = 'idle';
	$: logo = $page.data.template.logo;

	const handleUrlChange = (url: string) => {
		logo = url;
	};

	const changeLogo: SubmitFunction = async () => {
		state = 'loading';
		return ({ result, update }) => {
			if (result.type == 'failure') showToast('Failure', result.data.message, 'danger');
			if (result.type == 'success') showToast('Success', 'The logo has been updated.', 'success');
			state = 'idle';
			update();
		};
	};
</script>

<FormWrapper actionName="?/changeLogo" action={changeLogo}>
	<section class="input">
		<h3>Logo</h3>
		<span
			>You can add a logo that will be displayed in writing page by default we will use the tale
			logo. Click on it to change.</span
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
			{#if logo}
				<img src={logo} alt="logo" />
			{:else}
				<img src="/logo.svg" alt="default" />
			{/if}
		</label>
	</section>
	<svelte:fragment slot="submitter">
		<span class="description">Only images under or equal to 2.5mb are accepted. </span>
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

	.input {
		width: 80%;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.input input {
		display: none;
	}
	.input .url {
		width: 50%;
		aspect-ratio: 3/1;
		cursor: pointer;
		overflow: hidden;
	}

	.input .url img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		object-position: center;
	}

	.description {
		color: var(--mutedColor);
	}
</style>
