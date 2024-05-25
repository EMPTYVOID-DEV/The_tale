<script lang="ts">
	export let background: string;
</script>

<img src={background} alt="banner" class="imgBackground" />

<style>
	.imgBackground {
		min-width: var(--width, 2rem);
		max-width: var(--width, 2rem);
		aspect-ratio: var(--ratio, 1/1);
		object-fit: cover;
		object-position: center;
		border-radius: var(--radius, 50%);
	}
</style>
