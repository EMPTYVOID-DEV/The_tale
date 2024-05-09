<script lang="ts">
	import { page } from '$app/stores';
	import { showToast } from '$client/utils.client';
	import AsyncButton from '$components/button/asyncButton.svelte';
	import ColorPicker from '$components/colorPicker/colorPicker.svelte';
	import FormWrapper from '$components/other/formWrapper.svelte';
	import Select from '$components/other/select.svelte';
	import { defaultBgColor, defaultBgUrl } from '$global/const.global';
	import type { Background } from '$global/types.global';
	import { imgHandler } from '$global/utils.global';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { onMount } from 'svelte';

	const changeBackground: SubmitFunction = async ({ formData }) => {
		const file = formData.get('file') as File;
		if (file && file.size == 0) formData.delete('file');
		formData.append('type', background.type);
		formData.append('color', fallback.color);
		state = 'loading';
		return ({ result, update }) => {
			if (result.type === 'failure') showToast('Failure', result.data.message, 'danger');
			if (result.type === 'success')
				showToast('Success', 'The background has been updated.', 'success');
			state = 'idle';
			update({ reset: true });
		};
	};

	const handleTypeChange = (e: {
		detail: { selected: { value: 'url' | 'color'; label: string }[] };
	}) => {
		background.type = e.detail.selected[0].value;
		if (background.type === 'color') {
			background = {
				...background,
				value: fallback.color
			};
		} else {
			background = {
				...background,
				value: fallback.url
			};
		}
	};

	const handleUrlChange = (url: string) => {
		background.value = url;
		fallback.url = url;
	};

	const handleColorChange = (e: { detail: { hex: string } }) => {
		background.value = e.detail.hex;
		fallback.color = e.detail.hex;
	};

	const fallback = { url: '', color: '' };

	const elements: { value: 'url' | 'color'; label: string }[] = [
		{ value: 'color', label: 'Use a color as background' },
		{ value: 'url', label: 'Use an image as background' }
	];

	let state: 'loading' | 'idle' = 'idle';
	$: background = $page.data.settings.background as Background;

	onMount(() => {
		fallback.url = background.type == 'url' ? background.value : defaultBgUrl;
		fallback.color = background.type == 'color' ? background.value : defaultBgColor;
	});
</script>

<FormWrapper actionName="?/changeBackground" action={changeBackground}>
	<section class="input">
		<h3>Background</h3>
		<span
			>The background displayed in search results and the writing description page can be either a
			vibrant color or an engaging image. For the image click on it to upload a new one</span
		>
		<div class="data">
			<Select
				clearable={false}
				value={[elements.find((el) => el.value === background.type)]}
				label="Select background type"
				{elements}
				on:change={handleTypeChange}
			/>
			{#if background.type === 'color'}
				<ColorPicker hex={background.value} isAlpha on:input={handleColorChange} />
				<span class="color" style="background-color: {background.value};" />
			{:else}
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
					<img src={background.value} alt="writing-background" />
				</label>
			{/if}
		</div>
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

	.data {
		width: 80%;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.data input {
		display: none;
	}

	.data .color {
		width: 100%;
		aspect-ratio: 3/1;
		border-radius: var(--border-radius);
	}

	.data .url {
		width: 100%;
		aspect-ratio: 3/1;
		cursor: pointer;
		overflow: hidden;
		border-radius: var(--border-radius);
	}

	.data .url img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}

	.description {
		color: var(--mutedColor);
	}

	@media screen and (max-width: 768px) {
		.data {
			width: 100%;
		}
	}
</style>
