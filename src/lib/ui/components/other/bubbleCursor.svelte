<script lang="ts">
	import { onMount } from 'svelte';

	let cursorRef: HTMLDivElement;

	onMount(() => {
		let mx = 0;
		let my = 0;
		window.addEventListener('mousemove', (e) => {
			mx = e.clientX / 2;
			my = e.clientY / 2;
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
		--shade1: color-mix(in srgb, var(--primaryColor) 80%, transparent 20%);
		--shade2: color-mix(in srgb, var(--primaryColor) 10%, transparent 90%);
		background: radial-gradient(circle at center, var(--shade1), var(--shade2) 80%) no-repeat;
		position: absolute;
		mix-blend-mode: hard-light;
		border-radius: 50%;
		width: 200px;
		height: 200px;
		top: 0;
		left: 0;
		transition: transform 400ms cubic-bezier(0.165, 0.84, 0.44, 1);
	}
</style>
