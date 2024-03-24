<script lang="ts">
	import { emailSchema, passwordSchema } from '$lib/schema/authSchema';
	import SyncButton from '$components/button/syncButton.svelte';
	import ReactiveInput from '$components/input/reactiveInput.svelte';
	import StaticInput from '$components/input/staticInput.svelte';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import CloseIcon from '$icons/closeIcon.svelte';

	export let form = '';

	let stage: 'sign up' | 'sign in' = 'sign up';

	function validateEmail(email: string): { state: 'valid' | 'invalid'; errorMsg: string } {
		const parseResult = emailSchema.safeParse(email);
		if (parseResult.success == true)
			return {
				state: 'valid',
				errorMsg: ''
			};
		else
			return {
				errorMsg: parseResult.error.errors[0].message,
				state: 'invalid'
			};
	}

	function validatePassword(password: string): { state: 'valid' | 'invalid'; errorMsg: string } {
		const parseResult = passwordSchema.safeParse(password);
		if (parseResult.success == true) return { state: 'valid', errorMsg: '' };
		else return { state: 'invalid', errorMsg: parseResult.error.errors[0].message };
	}
</script>

<div class="authPage">
	<div class="leftSide">
		{#if stage == 'sign in'}
			<h1>Welcome Back</h1>
			<p>
				Reconnect and resume your journey through seamless communication. Dive back into meaningful
				conversations with ease, catching up where you left off, and forging new connections
				effortlessly.
			</p>
		{:else}
			<h1>Where it All Began</h1>
			<p>
				Embark on your communication journey effortlessly by signing up. Start engaging in vibrant
				discussions, meeting like-minded individuals, and exploring new horizons—all in one place,
				tailored to your preferences.
			</p>
		{/if}
	</div>
	<form action="?/{stage}" class="rightSide" use:enhance>
		<StaticInput name="username" label="Username" />
		<ReactiveInput name="email" label="Email" checkFunction={validateEmail} />
		<ReactiveInput name="password" label="password" checkFunction={validatePassword} />
		<SyncButton text={stage} />
		<SyncButton text="{stage} with github" on:click={() => goto('/auth/github')} type="passive" />

		{#if stage == 'sign in'}
			<!-- svelte-ignore a11y-interactive-supports-focus -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<span class="status"
				>Don't have an account? <span role="button" on:click={() => (stage = 'sign up')}
					>Sign in.</span
				></span
			>
		{:else}
			<!-- svelte-ignore a11y-interactive-supports-focus -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<span class="status"
				>Already have an account? <span role="button" on:click={() => (stage = 'sign in')}
					>Sign up.</span
				></span
			>
		{/if}
		{#if form == ''}
			<div class="error">
				<CloseIcon />
				<span>{form}</span>
			</div>
		{/if}
	</form>
</div>

<style>
	.authPage {
		background: linear-gradient(to right, var(--backgroundColor), var(--secondBackgroundColor));
		width: 100vw;
		height: 100vh;
		display: grid;
		grid-template-columns: 45% 40%;
		align-items: center;
		gap: 5%;
		padding-inline: 5%;
	}
	.leftSide {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
	.leftSide h1 {
		font-size: var(--huge);
		color: var(--foregroundColor);
	}
	.leftSide p {
		color: var(--foregroundColor);
	}
	.rightSide {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 12px;
		align-items: center;
	}

	.rightSide .status {
		cursor: pointer;
		color: var(--foregroundColor);
	}
	.rightSide .status span {
		color: var(--primaryColor);
	}
	.rightSide .error {
		display: flex;
		gap: 4px;
		--icon: var(--dangerColor);
	}
	.rightSide .error span {
		color: var(--dangerColor);
	}

	@media screen and (width<768px) {
		.authPage {
			grid-template-columns: 95%;
			align-items: 2.5%;
		}
		.leftSide {
			display: none;
		}
	}
</style>
