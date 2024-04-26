<script lang="ts">
	import type { banner } from '$global/types.global';
	export let banner: banner;
</script>

{#if banner.type == 'color'}
	<span class="colorBanner" style:background-color="#{banner.value}" />
{:else}
	<img src={banner.value} alt="banner" class="imgBanner" />
{/if}

<style>
	.colorBanner {
		display: inline-block;
		width: var(--width, 2rem);
		aspect-ratio: 1/1;
		border-radius: 50%;
	}
	.imgBanner {
		width: var(--width, 2rem);
		aspect-ratio: 1/1;
		object-fit: cover;
		object-position: center;
		border-radius: 50%;
	}
</style>
