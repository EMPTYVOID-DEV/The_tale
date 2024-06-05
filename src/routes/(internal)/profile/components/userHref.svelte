<script lang="ts">
	import { page } from '$app/stores';
	import SyncButton from '$components/button/syncButton.svelte';
	import CopyIcon from '$icons/copyIcon.svelte';
	import { PUBLIC_ORIGIN } from '$env/static/public';
	import DoneIcon from '$icons/doneIcon.svelte';
	let status: 'idle' | 'copying' = 'idle';

	function constructProfileLink() {
		const { id } = $page.data;
		return `${PUBLIC_ORIGIN}/writers/${id}`;
	}
	function copyToClipboard() {
		status = 'copying';
		navigator.clipboard.writeText(constructProfileLink());
		setTimeout(() => {
			status = 'idle';
		}, 1200);
	}
</script>

<div class="id">
	<section class="input">
		<h3>ID</h3>
		<span>This is your The_tale link.</span>
		<SyncButton
			icon={status == 'idle' ? CopyIcon : DoneIcon}
			text="Copy to my clipboard"
			on:click={copyToClipboard}
		/>
	</section>
	<span class="description"
		>You can share this link with your community , making it easier for them to find your work.</span
	>
</div>

<style>
	.id {
		--mixed-light: color-mix(in srgb, var(--foregroundColor) 8%, transparent 92%);
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: var(--mixed-light);
		border: 1px solid var(--mutedColor);
		border-radius: var(--border-radius);
		overflow: hidden;
	}

	.input {
		display: flex;
		flex-direction: column;
		padding: 1rem;
		gap: 0.75rem;
		--width: 50%;
	}

	.input h3,
	.input span {
		color: var(--foregroundColor);
	}

	.description {
		padding-inline: 1rem;
		padding-block: 0.5rem;
		border-top: 1px solid var(--mutedColor);
		color: var(--mutedColor);
		font-size: var(--small);
	}

	@media screen and (max-width: 768px) {
		.input {
			--width: 80%;
		}
	}
</style>
