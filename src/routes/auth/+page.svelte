<script lang="ts">
	import SyncButton from '$components/button/syncButton.svelte';
	import ReactiveInput from '$components/input/reactiveInput.svelte';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import { showToast } from '$lib/client/utils/toast';
	import { validateEmail, validatePassword, validateUsername } from '$global/zod/authSchema';
	import { Toaster } from 'svelte-sonner';
	import GithubIcon from '$lib/client/ui/icons/githubIcon.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';

	let stage: 'sign up' | 'sign in' = 'sign up';
	const handleAction: SubmitFunction = async () => {
		return ({ result, update }) => {
			if (result.type == 'failure') showToast('Error', result.data.message, 'danger');
			update({ reset: false });
		};
	};
</script>

<div class="auth">
	<div class="left-side">
		{#if stage == 'sign in'}
			<h1>Welcome Back to CodeNest</h1>
			<p>
				Reconnect and resume seamless real-time communication for your applications and services
				with QuickLink. Dive back into conversations, catch up where you left off.
			</p>
		{:else}
			<h1>Breeze documentation with CodeNest</h1>
			<p>
				Integrate real-time communication into your applications and services effortlessly by
				signing up for QuickLink. Start enabling vibrant discussions, connecting users.
			</p>
		{/if}
	</div>
	<div class="right-side">
		<form method="post" action="?/{stage}" use:enhance={handleAction}>
			{#if stage == 'sign up'}
				<ReactiveInput name="username" label="Username" checkFunction={validateUsername} />
			{/if}
			<ReactiveInput name="email" label="Email" checkFunction={validateEmail} />
			<ReactiveInput
				name="password"
				label="password"
				checkFunction={validatePassword}
				inputType="password"
			/>
			<SyncButton text={stage} --width="80%" />
		</form>
		<SyncButton
			on:click={() => goto('/auth/github')}
			icon={GithubIcon}
			text="{stage} with github"
			type="passive"
			--width="80%"
		/>
		{#if stage == 'sign in'}
			<span class="status"
				>Don't have an account? <button on:click={() => (stage = 'sign up')}>Sign in.</button></span
			>
		{:else}
			<span class="status"
				>Already have an account? <button on:click={() => (stage = 'sign in')}>Sign up.</button
				></span
			>
		{/if}
	</div>
</div>
<Toaster expand duration={3500} />

<style>
	.auth {
		width: 100%;
		flex-grow: 1;
		display: grid;
		grid-template-columns: 45% 40%;
		align-items: center;
		padding-inline: 5%;
		gap: 5%;
	}

	.left-side {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.left-side h1 {
		color: var(--primaryColor);
	}

	.left-side p {
		color: var(--foregroundColor);
	}

	.right-side {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		align-items: center;
	}

	.right-side form {
		display: contents;
	}

	.status {
		cursor: pointer;
		color: var(--foregroundColor);
	}

	.status button {
		color: var(--primaryColor);
		font-size: var(--body);
		font-family: var(--bodyFont);
		border: none;
		outline: none;
		background: none;
		cursor: pointer;
	}

	@media screen and (max-width: 768px) {
		.auth {
			grid-template-columns: 95%;
			gap: 0;
		}

		.left-side {
			flex-grow: 0;
		}

		.right-side {
			align-self: flex-start;
		}
	}
</style>
