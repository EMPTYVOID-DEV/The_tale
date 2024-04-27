<script>
	import LoadingIcon from '$icons/loadingIcon.svelte';

	/**@type {string}*/
	export let text = 'button';

	/**@type {import("$client/types.client").iconComponent|null} */
	export let icon = null;

	/**@type {"disabled"|"passive"|"primary"|"secondary"|"danger"} */
	export let type = 'primary';

	/**@type {"idle"|"loading"}*/
	export let state = 'idle';

	/**
	 * @function handleClick This function will take care of state changes
	 * @param {MouseEvent} event
	 */
</script>

<button
	on:click
	disabled={type == 'disabled' || state == 'loading'}
	class:loading={state == 'loading'}
	class={type}
>
	{#if state == 'loading'}
		<LoadingIcon />
	{:else}
		<svelte:component this={icon} />
	{/if}
	<span>{text}</span>
</button>

<style>
	:is(.disabled, .primary, .secondary, .danger, .passive) {
		--icon: var(--backgroundColor);
	}
	.disabled {
		--bg: var(--mutedColor);
		cursor: not-allowed;
	}
	.passive {
		--bg: var(--foregroundColor);
	}
	.primary {
		--bg: var(--primaryColor);
	}
	.secondary {
		--bg: var(--secondaryColor);
	}
	.danger {
		--bg: var(--dangerColor);
	}
	/**The padding will determine the width and height of the button*/
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.25rem;
		width: var(--width, fit-content);
		padding-inline: 1rem;
		padding-block: 0.5rem;
		cursor: pointer;
		outline: none;
		border: none;
		background-color: var(--bg);
		border-radius: var(--border-radius);
		transition: all 400ms linear;
	}
	button span {
		text-transform: capitalize;
		color: var(--backgroundColor);
		font-family: var(--bodyFont);
		font-size: var(--body);
		font-weight: bold;
	}
	button :global(svg) {
		width: 1.25rem;
		height: 1.25rem;
	}
	.loading {
		opacity: 0.8;
		cursor: not-allowed;
	}
</style>
