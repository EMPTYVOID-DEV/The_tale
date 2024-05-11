<script lang="ts">
	import { isOwner, isReferenceCreator } from '$client/utils.client';
	import AccordianItem from './referenceItem.svelte';

	export let accordianList: { title: string; href: string; description: string }[] = [];

	function checkAbility(title: string) {
		return isOwner() || isReferenceCreator(title);
	}
</script>

<div class="accordian">
	{#each accordianList as item}
		<AccordianItem
			title={item.title}
			description={item.description}
			href={item.href}
			canRemove={checkAbility(item.title)}
		/>
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
