<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Tabs from '$components/other/tabs.svelte';
	import type { iconComponent } from '$client/types.client';
	import type { Contribution } from '$global/types.global';
	import DashboardIcon from '$icons/dashboardIcon.svelte';
	import LinkIcon from '$icons/linkIcon.svelte';
	import PeopleIcon from '$icons/peopleIcon.svelte';
	import SettingsIcon from '$icons/settingsIcon.svelte';
	import TemplateIcon from '$icons/templateIcon.svelte';
	import WritingIcon from '$icons/writingIcon.svelte';

	function getWritingTabs() {
		const writerTabs: { icon?: iconComponent; title: string }[] = [
			{ title: 'dashboard', icon: DashboardIcon },
			{
				title: 'content',
				icon: WritingIcon
			},
			{
				title: 'references',
				icon: LinkIcon
			}
		];
		const ownerTabs: { icon?: iconComponent; title: string }[] = [
			{
				title: 'template',
				icon: TemplateIcon
			},
			{
				title: 'contributors',
				icon: PeopleIcon
			},
			{
				title: 'general',
				icon: SettingsIcon
			}
		];
		const writingId = $page.params.writingId;
		const contributions = ($page.data.contributions as Contribution[]) || [];
		const isOwner = contributions.find((el) => el.writingId == writingId).role == 'owner';
		if (isOwner) return writerTabs.concat(ownerTabs);
		return writerTabs;
	}

	const tabs = getWritingTabs();
	$: pathname = decodeURI($page.url.pathname.split('/').at(-1));
	$: activeTab = tabs.findIndex((el) => $page.url.pathname.includes(el.title));
</script>

<div class="root">
	<Tabs
		{tabs}
		{activeTab}
		on:change={(e) => {
			const activeTab = e.detail.activeTab;
			goto(`/mywritings/${$page.params.writingId}/${activeTab}`);
		}}
	/>
	<h1 class="title">{pathname}</h1>
	<slot />
</div>

<style>
	.root {
		width: 100%;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		padding-inline: 2.5%;
	}
	.title {
		text-transform: capitalize;
		color: var(--primaryColor);
		margin-top: 2rem;
		margin-bottom: 0.5rem;
	}
</style>
