<script>
	import { quadInOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';
</script>

<div class="sectionsWrapper" in:slide={{ axis: 'y', duration: 800, easing: quadInOut }}>
	<slot />
</div>

<style>
	.sectionsWrapper {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding-left: var(--padding);
		border-left: var(--border) solid var(--primaryColor);
		gap: 1rem;
	}
</style>
