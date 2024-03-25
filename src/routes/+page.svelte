<script>
	import Navbar from '$components/other/navbar.svelte';
</script>

<div class="home">
	<Navbar />
</div>

<style>
	.home {
		background-image: linear-gradient(
				45deg,
				var(--backgroundColor) 25%,
				var(--secondBackgroundColor) 25%,
				var(--secondBackgroundColor) 75%,
				var(--backgroundColor) 75%
			),
			linear-gradient(
				-45deg,
				var(--backgroundColor) 25%,
				var(--secondBackgroundColor) 25%,
				var(--secondBackgroundColor) 75%,
				var(--backgroundColor) 75%
			);
		background-size: 75px 75px;
		background-position:
			0px 0px,
			25px 25px;
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
	}
</style>
