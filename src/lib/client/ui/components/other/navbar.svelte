<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import SyncButton from '$components/button/syncButton.svelte';
	import Link from './link.svelte';
	import Logo from '$icons/logo.svelte';
	import MenuClose from '$icons/menuCloseIcon.svelte';
	import MenuOpen from '$icons/menuOpenIcon.svelte';
	import Avatar from './avatar.svelte';
	let mobileAppear = false;
	$: activeRoute = $page.url.pathname;
	$: isAuthenticated = $page.data.isAuthenticated;
</script>

<nav class="navBar">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="logoWrapper"
		on:click={() => {
			mobileAppear = false;
			goto('/');
		}}
	>
		<Logo />
	</div>
	<div class="links" class:mobileAppear>
		<Link
			href="/about"
			text="about"
			isBlank={false}
			active={activeRoute == '/about'}
			on:click={() => (mobileAppear = false)}
		/>
		<Link
			href="/docs"
			text="docs"
			isBlank={false}
			active={activeRoute == '/docs'}
			on:click={() => (mobileAppear = false)}
		/>
		<Link
			href="/reading"
			text="reading"
			isBlank={false}
			active={activeRoute == '/reading'}
			on:click={() => (mobileAppear = false)}
		/>
		{#if isAuthenticated}
			<Link
				href="/mywritings"
				text="my-writings"
				isBlank={false}
				active={activeRoute.startsWith('/mywritings')}
				on:click={() => (mobileAppear = false)}
			/>
			<Avatar
				active={activeRoute == '/profile'}
				on:click={() => {
					goto('/profile');
					mobileAppear = false;
				}}
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
		height: 68px;
		display: flex;
		align-items: center;
		padding-inline: 2.5%;
		gap: 20px;
	}

	.logoWrapper {
		cursor: pointer;
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
		flex-shrink: 0;
	}
	@media screen and (width<768px) {
		.menu {
			display: contents;
		}
		.links {
			background-color: var(--backgroundColor);
			width: 0;
			height: 100%;
			flex-direction: column;
			position: fixed;
			top: 68px;
			left: -50%;
			transition: all 800ms cubic-bezier(0.215, 0.61, 0.355, 1);
			padding-left: 1rem;
			padding-top: 1rem;
			gap: 2.5rem;
			--body: var(--h4);
			z-index: 999;
		}
		.mobileAppear {
			left: 0;
			width: 100%;
		}
	}
</style>
