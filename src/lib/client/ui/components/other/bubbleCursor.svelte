<script lang="ts">
	import { onMount } from 'svelte';

	let cursorRef: HTMLDivElement;

	onMount(() => {
		let mx = 0;
		let my = 0;
		window.addEventListener('mousemove', (e) => {
			mx = e.clientX / 1.5;
			my = e.clientY / 1.5;
		});

		function move() {
			cursorRef.style.transform = `translate(${mx}px,${my}px)`;
			requestAnimationFrame(() => move());
		}
		move();
	});
</script>

<div class="bubbleCursor" bind:this={cursorRef}></div>

<style>
	.bubbleCursor {
		filter: blur(12px);
		--shade1: color-mix(in srgb, var(--primaryColor) 90%, transparent 10%);
		--shade2: color-mix(in srgb, var(--primaryColor) 10%, transparent 90%);
		background: radial-gradient(circle at center, var(--shade1), var(--shade2) 100%) no-repeat;
		position: absolute;
		border-radius: 50%;
		width: 120px;
		height: 120px;
		top: 0;
		left: 0;
		transition: transform 400ms cubic-bezier(0.165, 0.84, 0.44, 1);
	}
</style>
