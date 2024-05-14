<script lang="ts">
	import { page } from '$app/stores';
	import { Section } from '$global/types.global';
	import SectionComponent from './components/section.svelte';
	import Sections from './components/sections.svelte';
	$: rootSection = $page.data.rootSection as Section;
</script>

<div class="content">
	<span
		>Here, you can build a graph to represent the structure of your writing. If you're creating a
		blog, create one section. In the case of an article, create a list of sections. For
		documentation, create a graph with nested sections.</span
	>

	<Sections --padding="0" --border="0">
		<SectionComponent section={rootSection} />
	</Sections>
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
	span {
		color: var(--foregroundColor);
		border-left: 0.25rem solid var(--primaryColor);
		padding-left: 1rem;
		font-weight: 600;
	}
</style>
