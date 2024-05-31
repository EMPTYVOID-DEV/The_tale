<script>
	import { quadInOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';
</script>

<div class="sectionsWrapper" transition:slide={{ axis: 'y', duration: 400, easing: quadInOut }}>
	<slot />
</div>

<style>
	.sectionsWrapper {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding-left: var(--padding);
		border-left: var(--border) solid var(--primaryColor);
		gap: 0.75rem;
	}
</style>
