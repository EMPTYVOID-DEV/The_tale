<script lang="ts">
	import type { QueryResult } from '$global/types.global';
	import WritingBackground from '$components/other/background.svelte';
	import Avatar from '$components/other/avatar.svelte';
	export let result: QueryResult;
</script>

<a class="result" href="/reading/{result.id}">
	<div class="context">
		<a class="queryOwner" href="/writers/{result.ownerId}">
			<Avatar avatar={result.ownerAvatar} />
			<span class="owner">{result.ownerUsername}</span>
		</a>
		<h4>{result.name}</h4>
		{#if result.description.length == 0}
			<p>No description is provided by the author.</p>
		{:else}
			<p>{result.description}</p>
		{/if}
		<span class="tags">
			{result.tags.join(' , ')}
		</span>
	</div>
	<div class="bg">
		<WritingBackground background={result.background} />
	</div>
</a>

<style>
	.result {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem;
		background-color: color-mix(in srgb, var(--foregroundColor) 8%, transparent 92%);
		border-radius: var(--border-radius);
		border: 2px solid var(--foregroundColor);
		transition: all 400ms ease-in-out;
		cursor: pointer;
	}

	.bg {
		display: contents;
		--radius: var(--border-radius);
		--width: 5rem;
		--height: 5rem;
	}

	.result:hover {
		border-color: var(--primaryColor);
		box-shadow:
			2px 2px 2px var(--primaryColor),
			2px 2px 2px var(--primaryColor),
			2px 2px 2px var(--primaryColor);
	}

	.context {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.context :is(h4, p, .tags) {
		color: var(--foregroundColor);
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.context h4 {
		-webkit-line-clamp: 1;
		word-break: break-all;
	}

	.context p {
		font-size: var(--small);
		-webkit-line-clamp: 3;
	}

	.context .tags {
		text-transform: capitalize;
		color: var(--mutedColor);
		font-size: var(--small);
		-webkit-line-clamp: 1;
		margin-top: 0.5rem;
	}

	.tags:empty {
		display: none;
	}

	.queryOwner {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.queryOwner span {
		font-size: var(--small);
		color: var(--primaryColor);
		font-weight: 600;
	}

	@media screen and (max-width: 764px) {
		.bg {
			--width: 3rem;
			--height: 3rem;
		}
		.context p {
			-webkit-line-clamp: 2;
		}
	}
</style>
