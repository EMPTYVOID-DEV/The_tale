<script lang="ts">
	import { page } from '$app/stores';
	import type { iconComponent } from '$client/types.client';
	import { showToast } from '$client/utils.client';
	import SyncButton from '$components/button/syncButton.svelte';
	import ColorPicker from '$components/colorPicker/colorPicker.svelte';
	import FormWrapper from '$components/other/formWrapper.svelte';
	import Tabs from '$components/other/tabs.svelte';
	import { defaultColors } from '$global/const.global';
	import DarkIcon from '$icons/darkIcon.svelte';
	import LightIcon from '$icons/lightIcon.svelte';
	import type { WritingColors } from '$global/types.global';
	import type { SubmitFunction } from '@sveltejs/kit';

	const tabs: { icon?: iconComponent; title: string }[] = [
		{ title: 'Light theme', icon: LightIcon },
		{ title: 'Dark theme', icon: DarkIcon }
	];
	let activeTab = 0;
	let colors: WritingColors = defaultColors;
	$: activeColorSet = activeTab == 0 ? colors.light : colors.dark;
	$: colors = $page.data.template.colors;

	const changeColors: SubmitFunction = async ({ formData }) => {
		setActiveColors();
		formData.append('colors', JSON.stringify(colors));
		return ({ result, update }) => {
			if (result.type == 'success') showToast('Success', 'The colors has been updated', 'success');
			update({ reset: false });
		};
	};

	const setActiveColors = () => {
		if (activeTab == 0) colors.light = activeColorSet;
		else colors.dark = activeColorSet;
	};

	const handleTabChange = (e: { detail: { activeTab: string } }) => {
		setActiveColors();
		activeTab = tabs.findIndex((el) => el.title == e.detail.activeTab);
	};
</script>

<FormWrapper actionName="?/changeColors" action={changeColors} --justify="flex-end">
	<section class="input">
		<h3>Colors</h3>
		<span
			>Change the colors that are used for your writing. For a better user experience, we need two
			color sets: one for light mode and another for dark mode.</span
		>
		<Tabs {tabs} {activeTab} on:change={handleTabChange} />
		{#if activeTab == 0}
			<h4>Light mode color set</h4>
		{:else}
			<h4>Dark mode color set</h4>
		{/if}
		<ColorPicker label="Background color" bind:hex={activeColorSet['bg']} isAlpha />
		<ColorPicker label="Foreground color" bind:hex={activeColorSet['text']} isAlpha />
		<ColorPicker label="Primary color" bind:hex={activeColorSet['primary']} isAlpha />
	</section>
	<svelte:fragment slot="submitter">
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
	.input h4,
	.input span {
		color: var(--foregroundColor);
	}
</style>
