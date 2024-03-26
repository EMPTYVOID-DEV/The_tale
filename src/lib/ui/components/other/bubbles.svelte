<script lang="ts">
	export let bubbles: { color: string; position: { x: string; y: string } }[] = [
		{ color: '#25d09a', position: { x: '25%', y: '50%' } },
		{ color: '#d09a25', position: { x: '50%', y: '25%' } },
		{ color: '#259ad0', position: { x: '50%', y: '75%' } },
		{ color: '#d0259a', position: { x: '75%', y: '50%' } }
	];
</script>

<div class="bubbleContainer">
	{#each bubbles as bubble}
		<div
			class="bubble"
			style:--color={bubble.color}
			style:--top={bubble.position.y}
			style:--left={bubble.position.x}
		></div>
	{/each}
</div>

<style>
	.bubbleContainer {
		filter: blur(12px);
		width: 100%;
		height: 100%;
		position: relative;
		--size: 40%;
	}

	.bubble {
		--shade1: color-mix(in srgb, var(--color) 80%, transparent 20%);
		--shade2: color-mix(in srgb, var(--color) 10%, transparent 90%);
		background: radial-gradient(circle at center, var(--shade1), var(--shade2) 80%) no-repeat;
		position: absolute;
		mix-blend-mode: hard-light;
		border-radius: 50%;
		width: var(--size);
		height: var(--size);
		top: var(--top);
		left: var(--left);
		translate: -50% -50%;
	}
</style>
