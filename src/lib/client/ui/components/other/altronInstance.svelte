<script lang="ts">
	import { componentMap } from '$altron/index';
	import { codeLanguages } from '$global/const.global';
	import Altron from '@altron/altron/altron.svelte';
	import type { dataBlock } from '@altron/altron/types';
	export let viewMode: boolean = false;
	export let content: dataBlock[] = [];
	export let altronRef: Altron = null;
</script>

<Altron
	--width="100%"
	--secondary-color="#ff6ec7"
	--text-color="var(--foregroundColor)"
	--primary-color="var(--primaryColor)"
	--body-font="var(--bodyFont)"
	--heading-font="var(--headerFont)"
	--block-gap="0.75rem"
	{componentMap}
	{viewMode}
	bind:this={altronRef}
	initialData={content}
	sizeLimits={{ attachments: 2.2, imgs: 2.2 }}
	codeBlockLanguages={codeLanguages}
	excludedBlocks={['embed']}
/>
