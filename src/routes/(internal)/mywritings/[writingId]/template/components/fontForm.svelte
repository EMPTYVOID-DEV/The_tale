<script lang="ts">
	import { page } from '$app/stores';
	import { showToast } from '$client/utils.client';
	import SyncButton from '$components/button/syncButton.svelte';
	import FormWrapper from '$components/other/formWrapper.svelte';
	import Select from '$components/other/select.svelte';
	import type { WritingFonts, fontSource } from '$global/types.global';
	import type { SubmitFunction } from '@sveltejs/kit';

	let fonts: WritingFonts = { body: '', heading: '' };
	$: fonts = $page.data.template.fonts as WritingFonts;

	let bodyFonts = ($page.data.bodyFontsList as fontSource[]).map((el) => ({
		value: el.id,
		label: el.family
	}));

	let headingFonts = ($page.data.headingFontsList as fontSource[]).map((el) => ({
		value: el.id,
		label: el.family
	}));

	const changeFonts: SubmitFunction = async ({ formData }) => {
		formData.append('body', fonts.body);
		formData.append('heading', fonts.heading);
		return ({ result, update }) => {
			if (result.type == 'failure') showToast('Failure', result.data.message, 'danger');
			if (result.type == 'success') showToast('Success', 'The name has been updated', 'success');
			update({ reset: false });
		};
	};
	const handleBodyChange = (e: { detail: { selected: { value: string; label: string }[] } }) => {
		fonts.body = e.detail.selected[0].value;
	};

	const handleHeadingChange = (e: { detail: { selected: { value: string; label: string }[] } }) => {
		fonts.heading = e.detail.selected[0].value;
	};
</script>

<FormWrapper actionName="?/changeFonts" action={changeFonts}>
	<section class="input">
		<h3>Font</h3>
		<span>Select the body and heading fonts used for your writing.</span>
		<Select
			--width="80%"
			clearable={false}
			elements={bodyFonts}
			value={[{ value: fonts.body, label: fonts.body }]}
			label="Search and select a body font"
			on:change={handleBodyChange}
		/>
		<Select
			--width="80%"
			clearable={false}
			elements={headingFonts}
			value={[{ value: fonts.heading, label: fonts.heading }]}
			label="Search and select a heading font"
			on:change={handleHeadingChange}
		/>
	</section>
	<svelte:fragment slot="submitter">
		<span class="description"
			>The fonts are pulled from fontSource an open source collection of fonts.</span
		>
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
