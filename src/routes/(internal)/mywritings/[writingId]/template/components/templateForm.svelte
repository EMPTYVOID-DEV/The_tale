<script lang="ts">
	import { page } from '$app/stores';
	import { showToast } from '$client/utils.client';
	import SyncButton from '$components/button/syncButton.svelte';
	import FormWrapper from '$components/other/formWrapper.svelte';
	import Select from '$components/other/select.svelte';
	import { templates } from '$global/const.global';
	import type { Templates } from '$global/types.global';
	import type { SubmitFunction } from '@sveltejs/kit';

	$: tempalteName = $page.data.template.tempalteName;
	const elements = Object.keys(templates).map((el) => ({ value: el, label: el }));

	const handleChange = (e: { detail: { selected: { value: Templates; label: Templates }[] } }) => {
		tempalteName = e.detail.selected[0].value;
	};

	const changeTemplate: SubmitFunction = async ({ formData }) => {
		formData.append('template', tempalteName);
		return ({ result, update }) => {
			if (result.type == 'success')
				showToast('Success', 'The template has been updated.', 'success');
			update();
		};
	};
</script>

<FormWrapper actionName="?/changeTemplate" action={changeTemplate}>
	<section class="input">
		<h3>Template name</h3>
		<span>The template will define which design you willing to use for this writing.</span>
		<Select
			{elements}
			clearable={false}
			value={[{ value: tempalteName, label: tempalteName }]}
			--width="80%"
			on:change={handleChange}
		/>
	</section>
	<svelte:fragment slot="submitter">
		<span class="description">By default we going to use Sveltekit template.</span>
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
