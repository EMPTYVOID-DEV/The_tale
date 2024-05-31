<script lang="ts">
	import { goto } from '$app/navigation';
	import { isMobileExternal, mobileAppear } from '$client/stores';
	import ThemeToggle from '$components/other/themeToggle.svelte';
	import { navHeight } from '$global/const.global';
	import Logo from '$icons/logo.svelte';
	import MenuClose from '$icons/menuCloseIcon.svelte';
	import MenuOpen from '$icons/menuOpenIcon.svelte';
	export let isOneSection: Boolean;
</script>

<nav class="navbar" style:height="{navHeight}px">
	<button class="logoWrapper" on:click={() => goto('/')}>
		<Logo />
	</button>
	<div class="control">
		<ThemeToggle on:change />
		{#if !isOneSection && $isMobileExternal}
			<button class="menu" on:click={() => mobileAppear.set(!$mobileAppear)}>
				{#if $mobileAppear}
					<MenuClose />
				{:else}
					<MenuOpen />
				{/if}
			</button>
		{/if}
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
		all: unset;
		cursor: pointer;
	}
	.menu :global(svg) {
		width: 1.75rem;
		height: 1.75rem;
		flex-shrink: 0;
	}
</style>
