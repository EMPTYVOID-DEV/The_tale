<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import SyncButton from '$components/button/syncButton.svelte';
	import BubbleCursor from '$components/other/bubbleCursor.svelte';
	import Bubbles from '$components/other/bubbles.svelte';
	import Navbar from '$components/other/navbar.svelte';
	$: isAuthenticated = $page.data.isAuthenticated;
</script>

<div class="home">
	<Navbar />
	<div class="content">
		<section class="left">
			<h1>Fast way to connect your users</h1>
			<p>
				QuickLink is a service that aims to provide an easy and seamless way to integrate real-time
				communication capabilities into your applications through a powerful API. Enable voice,
				video, chat, and more for enhanced user engagement.
			</p>
			<SyncButton
				text={isAuthenticated ? 'Continue your journey' : 'Get started'}
				on:click={() => {
					if (isAuthenticated) goto('/dashboard');
					else goto('/auth');
				}}
			/>
		</section>
		<section class="right">
			<svg xmlns="http://www.w3.org/2000/svg">
				<filter id="blend">
					<feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
					<feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -8" />
					<feBlend in2="SourceGraphic" mode="normal" />
				</filter>
			</svg>
			<BubbleCursor />
			<Bubbles />
		</section>
	</div>
</div>

<style>
	.home {
		width: 100vw;
		min-height: 100vh;
		background-color: var(--backgroundColor);
		display: flex;
		flex-direction: column;
		overflow: hidden;
		padding-bottom: 30px;
	}

	.content {
		width: 100%;
		flex-grow: 1;
		display: grid;
		grid-template-columns: 50% 40%;
		align-items: center;
		padding-inline: 2.5%;
		gap: 5%;
		--width: 40%;
	}

	.left {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.left h1 {
		font-size: var(--huge);
		color: var(--primaryColor);
	}

	.left p {
		color: var(--foregroundColor);
	}

	.right {
		width: 100%;
		height: 100%;
		filter: url('#blend');
	}

	.right svg {
		display: none;
	}

	@media screen and (max-width: 768px) {
		.content {
			grid-template-columns: 95%;
			padding-inline: 2.5%;
			--width: 70%;
		}

		.right {
			display: none;
		}
	}
</style>
