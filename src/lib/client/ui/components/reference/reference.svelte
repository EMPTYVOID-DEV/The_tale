<script lang="ts">
	import ReferenceItem from './referenceItem.svelte';

	export let referenceList: { title: string; href: string; description: string }[] = [];
</script>

<div class="accordian">
	{#each referenceList as item}
		<ReferenceItem title={item.title} description={item.description} href={item.href} />
	{/each}
</div>

<style>
	.accordian {
		width: var(--width, 100%);
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}
</style>
