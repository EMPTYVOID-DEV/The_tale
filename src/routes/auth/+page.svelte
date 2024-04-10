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
	import Morph from '$components/other/morph.svelte';

	let stage: 'sign up' | 'sign in' = 'sign up';
	const handleAction: SubmitFunction = async () => {
		return ({ result, update }) => {
			if (result.type == 'failure') showToast('Error', result.data.message, 'danger');
			update({ reset: false });
		};
	};
</script>

<div class="auth">
	<Morph />
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
				>Forget your account password? <button on:click={() => goto('/auth/password-reset')}
					>Reset it.</button
				></span
			>
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
		--intermediate-color: color-mix(in srgb, var(--backgroundColor) 80%, var(--primaryColor) 20%);
		--mixed: color-mix(in srgb, var(--foregroundColor) 70%, var(--backgroundColor) 30%);
	}
	.auth {
		width: 100%;
		flex-grow: 1;
		display: grid;
		grid-template-columns: 50% 40%;
		align-items: center;
		padding-inline: 2.5%;
		gap: 5%;
		background: linear-gradient(to bottom, var(--backgroundColor), var(--intermediate-color));
	}

	.right-side {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
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
			padding-top: 20px;
		}

		.right-side {
			align-self: flex-start;
		}
	}
</style>
