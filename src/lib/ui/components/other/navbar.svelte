<script>
	import DefaultLink from '$components/link/defaultLink.svelte';
	import Logo from '$icons/logo.svelte';
</script>

<nav class="navBar">
	<Logo />
	<div class="links">
		<DefaultLink href="/about" text="About" />
		<DefaultLink href="/docs" text="Docs" />
		<DefaultLink href="/login" text="Login" />
	</div>
</nav>

<style>
	.navBar {
		width: 100%;
		height: 80px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-inline: 5%;
	}
	.links {
		display: flex;
		gap: 1.5rem;
	}
</style>
