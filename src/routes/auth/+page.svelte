<script lang="ts">
	import SyncButton from '$components/button/syncButton.svelte';
	import ReactiveInput from '$components/input/reactiveInput.svelte';
	import SyncToast from '$components/toast/syncToast.svelte';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import Navbar from '$components/other/navbar.svelte';
	import { showToast } from '$lib/utils/clientUtils';
	import { validateEmail, validatePassword, validateUsername } from '$schema/zod/authSchema';
	import { Toaster } from 'svelte-sonner';
	import GithubIcon from '$icons/githubIcon.svelte';
	export let form: string = '';
	let stage: 'sign up' | 'sign in' = 'sign up';

	$: {
		showToast(form, SyncToast);
	}
</script>

<div class="auth">
	<Navbar />
	<div class="core">
		<div class="left-side">
			{#if stage == 'sign in'}
				<h1>Welcome Back to QuickLink</h1>
				<p>
					Reconnect and resume seamless real-time communication for your applications and services
					with QuickLink. Dive back into conversations, catch up where you left off.
				</p>
			{:else}
				<h1>Real-Time Communication with QuickLink</h1>
				<p>
					Integrate real-time communication into your applications and services effortlessly by
					signing up for QuickLink. Start enabling vibrant discussions, connecting users.
				</p>
			{/if}
		</div>
		<div class="right-side">
			<form
				method="post"
				action="?/{stage}"
				use:enhance={() => {
					return ({ update }) => {
						update({ reset: false });
					};
				}}
			>
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
					>Don't have an account? <button on:click={() => (stage = 'sign up')}>Sign in.</button
					></span
				>
			{:else}
				<span class="status"
					>Already have an account? <button on:click={() => (stage = 'sign in')}>Sign up.</button
					></span
				>
			{/if}
		</div>
	</div>
</div>
<Toaster expand duration={2500} />

<style>
	.auth {
		background-color: var(--backgroundColor);
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.core {
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
		.core {
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
