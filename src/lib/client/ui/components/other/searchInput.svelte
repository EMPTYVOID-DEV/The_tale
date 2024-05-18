<script>
	import CloseIcon from '$icons/closeIcon.svelte';
	import SearchIcon from '$icons/searchIcon.svelte';
	export let name = 'search';
	export let placeholder = 'Search for anything';
	export let value = '';
</script>

<div class="search">
	<SearchIcon />
	<input type="text" bind:value {placeholder} {name} on:input />
	{#if value.length > 0}
		<button class="close" on:click={() => (value = '')}>
			<CloseIcon />
		</button>
	{/if}
</div>

<style>
	.search {
		width: var(--width, 100%);
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding-block: 0.5rem;
		padding-inline: 0.25rem;
		border-bottom: 2px solid var(--foregroundColor);
		transition: all 500ms ease-in-out;
	}

	.search :global(svg) {
		width: 1.75rem;
		height: 1.75rem;
	}

	.search input {
		width: 100%;
		font-size: var(--body);
		font-family: var(--bodyFont);
		color: var(--foregroundColor);
		background-color: transparent;
		outline: none;
		border: none;
	}

	.search:has(input:focus) {
		border-bottom-color: var(--primaryColor);
	}

	.search input::placeholder {
		color: var(--mutedColor);
	}

	.search .close {
		all: unset;
		cursor: pointer;
	}
</style>
