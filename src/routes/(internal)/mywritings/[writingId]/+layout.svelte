<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Tabs from '$components/other/tabs.svelte';
	import DashboardIcon from '$icons/dashboardIcon.svelte';
	import SettingsIcon from '$icons/settingsIcon.svelte';
	import WritingIcon from '$icons/writingIcon.svelte';
	const tabs: { icon?: import('$client/types.client').iconComponent; title: string }[] = [
		{ title: 'dashboard', icon: DashboardIcon },
		{
			title: 'content',
			icon: WritingIcon
		},
		{
			title: 'settings',
			icon: SettingsIcon
		}
	];
	$: pathname = $page.url.pathname.split('/').at(-1);
	$: activeTab = tabs.findIndex((el) => el.title == pathname);
</script>

<div class="root">
	<Tabs
		{tabs}
		{activeTab}
		on:change={(e) => {
			const activeTab = e.detail.activeTab;
			goto(`${activeTab}`);
		}}
	/>
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
</style>
