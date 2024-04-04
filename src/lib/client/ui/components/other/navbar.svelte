<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import SyncButton from '$components/button/syncButton.svelte';
	import Link from './link.svelte';
	import Logo from '$icons/logo.svelte';
	import MenuClose from '$icons/menuCloseIcon.svelte';
	import MenuOpen from '$icons/menuOpenIcon.svelte';
	import ThemeToggle from '$components/toggle/themeToggle.svelte';
	import { changeTheme } from '$client/utils/theme';
	import type { theme } from '$global/types.global';
	import { onMount } from 'svelte';
	let mobileAppear = false;
	let currentTheme: theme = 'dark';
	$: activeRoute = $page.url.pathname;
	$: isAuthenticated = $page.data.isAuthenticated;
	onMount(() => {
		const html = document.querySelector('html');
		const dataset = html?.dataset;
		currentTheme = dataset.theme as theme;
	});
</script>

<nav class="navBar">
	<div class="logoWrapper">
		<Logo />
	</div>
	<div class="links" class:mobileAppear>
		<Link
			href="/docs"
			text="Docs"
			isBlank={false}
			active={activeRoute == '/docs'}
			on:click={() => (mobileAppear = false)}
		/>
		<Link
			href="/contact"
			text="Contact"
			isBlank={false}
			active={activeRoute == '/contact'}
			on:click={() => (mobileAppear = false)}
		/>
		{#if isAuthenticated}
			<Link
				on:click={() => (mobileAppear = false)}
				href="/dashboard"
				text="Dashboard"
				isBlank={false}
				active={activeRoute == '/dashboard'}
			/>
		{:else}
			<SyncButton
				text="Sign in"
				on:click={() => {
					goto('/auth');
					mobileAppear = false;
				}}
				type="passive"
			/>
		{/if}
	</div>
	<ThemeToggle
		on:change={(e) => changeTheme(e.detail.theme)}
		--left="-56px"
		--top="38px"
		active={currentTheme}
	/>
	<button class="menu" on:click={() => (mobileAppear = !mobileAppear)}>
		{#if mobileAppear}
			<MenuClose />
		{:else}
			<MenuOpen />
		{/if}
	</button>
</nav>

<style>
	.navBar {
		width: 100%;
		height: 80px;
		display: flex;
		align-items: center;
		padding-inline: 2.5%;
		gap: 20px;
	}

	.logoWrapper {
		margin-right: auto;
	}
	.links {
		display: flex;
		gap: 1.5rem;
	}
	.menu {
		display: none;
		cursor: pointer;
	}

	.menu :global(svg) {
		width: 1.75rem;
		height: 1.75rem;
	}
	@media screen and (width<768px) {
		.menu {
			display: contents;
		}
		.links {
			background-color: var(--backgroundColor);
			width: 100%;
			height: 100%;
			flex-direction: column;
			position: fixed;
			top: 80px;
			left: -100%;
			transition: all 600ms ease-in-out;
			padding-left: 1rem;
			padding-top: 1rem;
			gap: 2.5rem;
			--body: var(--h4);
		}
		.mobileAppear {
			left: 0;
		}
	}
</style>
