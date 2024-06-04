<script lang="ts">
	import { page } from '$app/stores';
	import Copy from '$components/other/copy.svelte';
	$: id = $page.data.settings.id;
</script>

<div class="id">
	<section class="input">
		<h3>ID</h3>
		<span>This is {$page.data.settings.name} writing id.</span>
		<Copy text={id} />
	</section>
	<span class="description">
		Sharing this writing id with your community will make it easier to find
	</span>
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
