<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import DefaultTabs from '$components/other/defaultTabs.svelte';
	import DashboardIcon from '$icons/dashboardIcon.svelte';
	import OrgsIcon from '$icons/orgsIcon.svelte';
	import ProfileIcon from '$icons/profileIcon.svelte';
	import ProjectsIcon from '$icons/projectsIcon.svelte';
	const tabs: { icon?: import('$client/components').iconComponent; title: string }[] = [
		{
			title: 'Dashboard',
			icon: DashboardIcon
		},
		{
			title: 'Projects',
			icon: ProjectsIcon
		},
		{
			title: 'Organizations',
			icon: OrgsIcon
		},
		{
			title: 'Profile',
			icon: ProfileIcon
		}
	];
	$: activeTab = tabs.findIndex(
		(el) => el.title.toLowerCase() == $page.url.pathname.split('/').at(-1)
	);
	function handleChange(e: { detail: { activeTab: string } }) {
		const activeTab = e.detail.activeTab as string;
		goto(activeTab.toLowerCase());
	}
</script>

<div class="account">
	<div class="wrapper">
		<DefaultTabs {tabs} {activeTab} on:change={handleChange} />
		<slot />
	</div>
</div>

<style>
	.account {
		width: 100%;
		flex-grow: 1;
		padding-inline: 2.5%;
	}
	.wrapper {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
