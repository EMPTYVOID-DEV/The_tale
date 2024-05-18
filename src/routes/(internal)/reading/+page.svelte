<script>
	import SearchInput from '$components/other/searchInput.svelte';
	import ShadowButton from '$components/button/shadowButton.svelte';
	import { goto } from '$app/navigation';
	export let query = '';
</script>

<div class="reading">
	<h1>Explore Our Literary</h1>
	<div class="search">
		<SearchInput bind:value={query} />
		<ShadowButton
			--padding-inline="1.5rem"
			--padding-block="0.75rem"
			type="primary"
			text="search"
			on:click={() => {
				if (query.length != 0) goto(`/reading/${query}`);
			}}
		/>
	</div>
	<span>You can search for writing through it id , name , owner id or one of contributors id.</span>
</div>

<style>
	.reading {
		width: 100%;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-inline: 2.5%;
		gap: 1rem;
		--intermediate-color: color-mix(in srgb, var(--backgroundColor) 80%, var(--primaryColor) 20%);
		background: linear-gradient(to bottom, var(--backgroundColor), var(--intermediate-color));
	}
	.reading h1 {
		color: var(--foregroundColor);
	}
	.reading span {
		color: var(--mutedColor);
		text-align: center;
	}
	.search {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		--width: 75%;
	}

	@media screen and (width < 764px) {
		.search {
			--width: 95%;
		}
	}
</style>
