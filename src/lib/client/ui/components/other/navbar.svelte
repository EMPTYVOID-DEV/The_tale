<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import SyncButton from '$components/button/syncButton.svelte';
	import Link from './link.svelte';
	import Logo from '$icons/logo.svelte';
	import MenuClose from '$icons/menuCloseIcon.svelte';
	import MenuOpen from '$icons/menuOpenIcon.svelte';
	const activeRoute = $page.url.pathname;
	let mobileAppear = false;
</script>

<nav class="navBar">
	<Logo />
	<button class="menu" on:click={() => (mobileAppear = !mobileAppear)}>
		{#if mobileAppear}
			<MenuClose />
		{:else}
			<MenuOpen />
		{/if}
	</button>
	<div class="links" class:mobileAppear>
		<Link href="/" text="Home" isBlank={false} active={activeRoute == '/'} />
		<Link href="/docs" text="Docs" isBlank={false} active={activeRoute == '/docs'} />
		<Link href="/contact" text="Contact" isBlank={false} active={activeRoute == '/contact'} />
		{#if $page.data.isAuthenticated}
			<Link
				href="/dashboard"
				text="Dashboard"
				isBlank={false}
				active={activeRoute == '/dashboard'}
			/>
		{:else}
			<SyncButton text="Sign in" on:click={() => goto('/auth')} type="passive" />
		{/if}
	</div>
</nav>

<style>
	.navBar {
		width: 100%;
		height: 80px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-inline: 2.5%;
	}
	.links {
		display: flex;
		gap: 1.5rem;
	}
	.menu {
		display: none;
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
			width: 100vw;
			height: 100vh;
			flex-direction: column;
			position: fixed;
			top: 80px;
			left: -100%;
			transition: all 600ms ease-in-out;
			padding-left: 1rem;
			padding-top: 1rem;
			--body: var(--h4);
			gap: 2.5rem;
		}
		.mobileAppear {
			left: 0;
		}
	}
</style>
