<script>
	// @ts-ignore
	import { mimeToFileNameMap } from '@altron/altron/consts';
	export let src;
	export let title;
	export let type;
	export let size;
	import { getContext } from 'svelte';
	const componentMap = getContext('componentMap');
	const UploadIcon = componentMap.get('uploadIcon');
</script>

<div class="attachment">
	<div class="info">
		<span class="type">{mimeToFileNameMap.get(type) || 'file'}</span>
		<div class="subInfo">
			<span>{title}</span>
			<span>{(size / Math.pow(10, 6)).toString().substring(0, 5)} Mb</span>
		</div>
	</div>
	<a href={src} download={title} on:click|stopPropagation>
		<svelte:component this={UploadIcon} />
	</a>
</div>

<style>
	.attachment {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
	}
	.attachment .info {
		display: flex;
		align-items: center;
		gap: 20px;
		border-left: 0.25rem solid var(--primaryColor);
		padding-left: 10px;
	}
	.attachment .info .type {
		color: color-mix(in srgb, var(--primaryColor) 80%, transparent 20%);
		font-weight: bold;
		text-transform: capitalize;
	}
	.subInfo {
		display: flex;
		flex-direction: column;
	}
	.subInfo span:first-child {
		color: var(--textColor);
		text-transform: capitalize;
		font-weight: bold;
	}
	.subInfo span:last-child {
		color: color-mix(in srgb, var(--primaryColor) 80%, transparent 20%);
	}
	.attachment a {
		--secondaryColor: var(--primaryColor);
	}
</style>
