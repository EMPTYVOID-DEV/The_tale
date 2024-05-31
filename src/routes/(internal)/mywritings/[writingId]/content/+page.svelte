<script lang="ts">
	import { page } from '$app/stores';
	import { Section as SectionType } from '$global/types.global';
	import { setContext } from 'svelte';
	import AddNode from './components/addNode.svelte';
	import Section from '$components/sections/section.svelte';
	import Sections from '$components/sections/sections.svelte';
	$: rootSection = $page.data.rootSection as SectionType;
	setContext('location', 'editing');
</script>

<div class="content">
	{#if rootSection}
		<Sections --padding="0" --border="0">
			<Section section={rootSection} />
		</Sections>
	{:else}
		<section class="empty">
			<h3>There is no root section</h3>
			<AddNode action="addRoot" sectionType="root" />
		</section>
	{/if}
</div>

<style>
	.content {
		width: 100%;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		padding-bottom: 30px;
	}

	.empty {
		width: 100%;
		display: flex;
		flex-grow: 1;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}

	.empty h3 {
		color: var(--foregroundColor);
	}
</style>
