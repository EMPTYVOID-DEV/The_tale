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
		<div class="info">
			<h3>Logo</h3>
			<span
				>You can add a logo that will be displayed on the writing page. By default the tale logo
				will be used. Click the image to change it.</span
			>
		</div>
		<input
			type="file"
			id="imgInput"
			name="file"
			accept="image/svg+xml"
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
		<span class="description"
			>Only images of 2.5MB or smaller in size are accepted. Furthermore, for optimal
			responsiveness, you need to upload an SVG file
		</span>
		<AsyncButton text="save" type="passive" {state} />
	</svelte:fragment>
</FormWrapper>

<style>
	.input {
		width: 100%;
		display: flex;
		align-items: center;
		padding: 1rem;
		gap: 1rem;
	}

	.info {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.info h3,
	.info span {
		color: var(--foregroundColor);
	}

	.input input {
		display: none;
	}

	.input label {
		width: 30%;
		aspect-ratio: 3/1;
		overflow: hidden;
		cursor: pointer;
	}

	.input label img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		object-position: center;
		text-transform: capitalize;
	}

	.description {
		color: var(--mutedColor);
	}

	@media screen and (width<768px) {
		.input {
			flex-direction: column;
		}
		.input label {
			width: 50%;
		}
	}
</style>
