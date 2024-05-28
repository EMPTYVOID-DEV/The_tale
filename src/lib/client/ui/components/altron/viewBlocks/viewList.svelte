<script>
	export let items;
	export let type;
</script>

{#if type == 'ordered'}
	<ol>
		{#each items as item, index}
			<div class="item">
				<span class="pointer">{index + 1}.</span>
				<li>{item}</li>
			</div>
		{/each}
	</ol>
{:else}
	<ul>
		{#each items as item}
			<div class="item">
				<span class="pointer">-</span>
				<li>{item}</li>
			</div>
		{/each}
	</ul>
{/if}

<style>
	ul,
	ol {
		color: var(--textColor);
		list-style: none;
		text-transform: capitalize;
		inset: unset;
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.item {
		width: 100%;
		display: flex;
		gap: 0.25rem;
	}

	.pointer {
		font-weight: 600;
		color: var(--mutedColor);
	}
</style>
