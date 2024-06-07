<script lang="ts">
	import WritingBackground from '$components/other/background.svelte';
	import type { Contribution } from '$global/types.global';
	export let contribution: Contribution;
</script>

<a href="/mywritings/{contribution.writingId}/content" class="writingLink">
	<WritingBackground background={contribution.writingBackground} />
	<div class="layer">
		<span class="name">{contribution.writingName}</span>
		{#if contribution.mode}
			<span>Private</span>
		{:else}
			<span>Public</span>
		{/if}
	</div>
	<div class="layer">
		<span>Role</span>
		<span>{contribution.role}</span>
	</div>
	<div class="layer">
		<span>Date</span>
		<span>{contribution.creationDate}</span>
	</div>
</a>

<style>
	.writingLink {
		--mixed-light: color-mix(in srgb, var(--foregroundColor) 8%, transparent 92%);
		background-color: var(--mixed-light);
		border: 1px solid var(--mutedColor);
		border-radius: var(--border-radius);
		padding: 0.5rem;
		width: 100%;
		display: grid;
		grid-template-columns: max-content repeat(3, 1fr);
		align-items: center;
		gap: 0.5rem;
		cursor: pointer;
	}

	.writingLink .layer {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.layer span {
		font-size: var(--small);
	}

	.layer span:first-child {
		color: color-mix(in srgb, var(--primaryColor) 70%, var(--foregroundColor) 30%);
		font-weight: 600;
	}
	.layer span:last-child {
		color: var(--foregroundColor);
	}

	.name {
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
		word-break: break-all;
	}
</style>
