<script>
	/**@type {string}*/
	export let text = 'button';
	/**@type {"passive"|"primary"}*/
	export let type = 'primary';
	/**@type {import("$client/types.client").iconComponent|null} */
	export let icon = null;
</script>

<button on:click class={type}>
	<svelte:component this={icon} />
	<span>{text}</span>
</button>

<style>
	:is(.primary, .passive) {
		--icon: var(--backgroundColor);
	}
	.passive {
		--main: var(--foregroundColor);
	}
	.primary {
		--main: var(--primaryColor);
	}

	button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.25rem;
		width: var(--width, fit-content);
		padding-inline: var(--padding-inline, 1rem);
		padding-block: var(--padding-block, 0.5rem);
		cursor: pointer;
		outline: none;
		border: none;
		background-color: transparent;
		border: 1px solid var(--main);
		border-radius: var(--border-radius);
		box-shadow:
			4px 4px 4px var(--main),
			4px 4px 4px var(--main),
			4px 4px 4px var(--main);
	}

	button span {
		text-transform: capitalize;
		color: var(--foregroundColor);
		font-family: var(--bodyFont);
		font-size: var(--body);
		font-weight: bold;
	}
	button :global(svg) {
		width: 1.25rem;
		height: 1.25rem;
	}
</style>
