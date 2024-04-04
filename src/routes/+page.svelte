<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	$: isAuthenticated = $page.data.isAuthenticated;
</script>

<div class="home">
	<div class="content">
		<h1>Rapid User Connectivity</h1>
		<p>
			QuickLink is a service that aims to provide an easy and seamless way to integrate real-time
			communication capabilities into your applications through a powerful API. Enable voice, video,
			chat, and more for enhanced user engagement.
		</p>
		<button
			on:click={() => {
				if (isAuthenticated) goto('/dashboard');
				else goto('/auth');
			}}
		>
			{isAuthenticated ? 'Continue your journey' : 'Get started'}</button
		>
	</div>
</div>

<style>
	.home {
		width: 100%;
		flex-grow: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.content {
		width: 60%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1.25rem;
	}

	.content h1 {
		font-size: var(--huge);
		color: var(--primaryColor);
		text-align: center;
	}

	.content p {
		color: var(--foregroundColor);
		text-align: center;
	}

	.content button {
		width: var(--width, fit-content);
		padding-inline: var(--padding-inline, 2rem);
		padding-block: var(--padding-block, 0.8rem);
		cursor: pointer;
		outline: none;
		border: 1px solid var(--primaryColor);
		border-radius: var(--border-radius);
		background-color: transparent;
		text-transform: capitalize;
		color: var(--foregroundColor);
		font-family: var(--bodyFont);
		font-size: var(--h4);
		font-weight: 600;
		box-shadow:
			4px 4px 4px var(--primaryColor),
			4px 4px 4px var(--primaryColor);
	}

	@media screen and (max-width: 768px) {
		.content {
			width: 95%;
		}
	}
</style>
