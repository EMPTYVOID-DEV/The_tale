<div class="sectionsWrapper">
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
