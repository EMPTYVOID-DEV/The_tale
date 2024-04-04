<script>
	/**@type {string}*/
	export let text;
	/**@type {string}*/
	export let href;
	/**@type {boolean}*/
	export let isBlank = false;
	/**@type {"primary"|"secondary"}*/
	export let type = 'primary';
	/**@type {import("$client/components").iconComponent|null}*/
	export let icon = null;
	/**@type {boolean}*/
	export let active = false;
</script>

<a class:active class="link {type}" {href} target={isBlank ? '_blank' : ''} on:click>
	<svelte:component this={icon} />
	<span>{text}</span>
</a>

<style>
	.link {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		cursor: pointer;
		text-decoration: none;
		padding-bottom: 2px;
		--text: var(--foregroundColor);
		--icon: var(--foregroundColor);
	}
	.link span {
		color: var(--text);
		font-family: var(--bodyFont);
		font-size: var(--body);
		font-weight: 600;
	}
	.link:hover {
		--text: var(--primaryColor);
		--icon: var(--primaryColor);
	}

	.active {
		border-bottom: 0.2rem solid var(--primaryColor);
		--text: var(--primaryColor);
		--icon: var(--primaryColor);
	}
	.link span:empty {
		display: none;
	}
</style>
