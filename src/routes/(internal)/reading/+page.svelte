<script lang="ts">
	import SearchInput from '$components/other/searchInput.svelte';
	import ShadowButton from '$components/button/shadowButton.svelte';
	import Loading from './components/loading.svelte';
	import SyncButton from '$components/button/syncButton.svelte';
	import type { QueryResult } from '$global/types.global';
	import { queryLimit } from '$global/const.global';
	let queryResults: QueryResult[] = [];
	let query = '';
	let page = 1;
	let fetchState: 'idle' | 'loading' = 'idle';
	let isMore = false;

	async function handleQuery() {
		fetchState = 'loading';
		const url = `/reading/?query=${query}&page=${page}`;
		const results: QueryResult[] = await fetch(url).then((res) => res.json());
		if (results.length > queryLimit - 1) {
			isMore = true;
			results.pop();
		} else {
			isMore = false;
		}
		fetchState = 'idle';
		queryResults = [...queryResults, ...results];
	}

	function intialFetch() {
		page = 1;
		queryResults = [];
		handleQuery();
	}
	function fetchMore() {
		page++;
		handleQuery();
	}
</script>

<div class="reading">
	<h1>Explore Our Literary</h1>
	<section class="search">
		<SearchInput bind:value={query} />
		<ShadowButton
			--padding-inline="1.5rem"
			--padding-block="0.75rem"
			type="primary"
			text="search"
			on:click={intialFetch}
		/>
	</section>
	<span>You can search for a writing through it id , name or owner id.</span>
	<section class="queryResults"></section>
	{#if fetchState == 'loading'}
		<Loading />
	{/if}
	{#if isMore}
		<SyncButton text="Show more" on:click={fetchMore} />
	{/if}
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
		background: linear-gradient(to bottom, var(--backgroundColor), var(--intermediate-color));
		--intermediate-color: color-mix(in srgb, var(--backgroundColor) 80%, var(--primaryColor) 20%);
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
