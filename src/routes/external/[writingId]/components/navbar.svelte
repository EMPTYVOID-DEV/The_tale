<script>
	import { goto } from '$app/navigation';
	import ThemeToggle from '$components/other/themeToggle.svelte';
	import SiteSearch from '$components/siteSearch/siteSearch.svelte';
	import { navHeight } from '$global/const.global';
	import Logo from '$icons/logo.svelte';
	import MenuClose from '$icons/menuCloseIcon.svelte';
	import MenuOpen from '$icons/menuOpenIcon.svelte';
	let mobileAppear = false;
</script>

<nav class="navbar" style:height="{navHeight}px">
	<button class="logoWrapper" on:click={() => goto('/')}>
		<Logo />
	</button>
	<div class="control">
		<ThemeToggle on:change --top="45px" --left="-30px" />
		<SiteSearch --width="220px" />
		<button class="menu" on:click={() => (mobileAppear = !mobileAppear)}>
			{#if mobileAppear}
				<MenuClose />
			{:else}
				<MenuOpen />
			{/if}
		</button>
	</div>
</nav>

<style>
	.navbar {
		background-color: var(--backgroundColor);
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-inline: 2.5%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;
	}

	.control {
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}
	.logoWrapper {
		all: unset;
		display: contents;
		cursor: pointer;
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
		.control {
			gap: 1rem;
		}
		.menu {
			display: contents;
		}
	}
</style>
