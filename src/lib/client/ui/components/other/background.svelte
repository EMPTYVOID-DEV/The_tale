<script lang="ts">
	import type { Background } from '$global/types.global';
	export let background: Background;
</script>

{#if background.type == 'color'}
	<span class="colorBackground" style:background-color={background.value} />
{:else}
	<img src={background.value} alt="banner" class="imgBackground" />
{/if}

<style>
	.colorBackground {
		display: inline-block;
		min-width: var(--width, 2rem);
		max-width: var(--width, 2rem);
		aspect-ratio: var(--ration, 1/1);
		border-radius: var(--radius, 50%);
	}
	.imgBackground {
		min-width: var(--width, 2rem);
		max-width: var(--width, 2rem);
		aspect-ratio: var(--ration, 1/1);
		object-fit: cover;
		object-position: center;
		border-radius: var(--radius, 50%);
	}
</style>
