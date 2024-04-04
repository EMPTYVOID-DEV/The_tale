<script lang="ts">
	import Navbar from '$components/other/navbar.svelte';
	import '../app.css';
</script>

<div class="app">
	<Navbar />
	<slot />
</div>

<style>
	.app {
		background-color: var(--backgroundColor);
		width: 100vw;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}
</style>
