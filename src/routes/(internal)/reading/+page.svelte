<script lang="ts">
	import SearchInput from '$components/other/searchInput.svelte';
	import ShadowButton from '$components/button/shadowButton.svelte';
	import SyncButton from '$components/button/syncButton.svelte';
	import type { QueryResult } from '$global/types.global';
	import { queryLimit } from '$global/const.global';
	import Result from './components/result.svelte';
	import Loading from '$components/other/loading.svelte';
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
	<section class="search">
		<h1>Explore Collaborative Writings.</h1>
		<SearchInput bind:value={query} />
		<ShadowButton
			--width="100%"
			--padding-inline="1.5rem"
			--padding-block="0.75rem"
			type="primary"
			text="search"
			on:click={intialFetch}
		/>
		<span>You can search for a writing through it id , name or owner id.</span>
	</section>
	{#if queryResults.length != 0}
		<section class="queryResults">
			{#each queryResults as result}
				<Result {result} />
			{/each}
		</section>
	{/if}
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
		padding-block: 30px;
		gap: 3rem;
		background: linear-gradient(to bottom, var(--backgroundColor), var(--intermediate-color));
		--intermediate-color: color-mix(in srgb, var(--backgroundColor) 80%, var(--primaryColor) 20%);
	}
	.search {
		width: 75%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
	}
	.search h1 {
		color: var(--foregroundColor);
	}
	.search span {
		color: var(--mutedColor);
		text-align: center;
	}

	.queryResults {
		width: 75%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	@media screen and (width < 764px) {
		.search {
			width: 95%;
		}
		.queryResults {
			width: 95%;
		}
	}
</style>
