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

	export let form: string = '';

	let stage: 'sign up' | 'sign in' = 'sign up';

	$: {
		showToast(form, SyncToast);
	}
</script>

<div class="authPage">
	<Navbar />
	<div class="core">
		<div class="leftSide">
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
		<div class="rightSide">
			<form method="post" action="?/{stage}" use:enhance>
				{#if stage == 'sign up'}
					<ReactiveInput name="username" label="Username" checkFunction={validateUsername} />
				{/if}
				<ReactiveInput name="email" label="Email" checkFunction={validateEmail} />
				<ReactiveInput name="password" label="password" checkFunction={validatePassword} />
				<SyncButton text={stage} />
			</form>
			<SyncButton text="{stage} with github" on:click={() => goto('/auth/github')} type="passive" />

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
	.authPage {
		background-image: linear-gradient(
				45deg,
				var(--backgroundColor) 25%,
				var(--secondBackgroundColor) 25%,
				var(--secondBackgroundColor) 75%,
				var(--backgroundColor) 75%
			),
			linear-gradient(
				-45deg,
				var(--backgroundColor) 25%,
				var(--secondBackgroundColor) 25%,
				var(--secondBackgroundColor) 75%,
				var(--backgroundColor) 75%
			);
		background-size: 75px 75px;
		background-position:
			0px 0px,
			25px 25px;
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
	.leftSide {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}
	.leftSide h1 {
		font-size: var(--huge);
		color: var(--primaryColor);
	}
	.leftSide p {
		color: var(--foregroundColor);
	}
	.rightSide {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		align-items: center;
	}
	.rightSide form {
		display: contents;
	}

	.rightSide .status {
		cursor: pointer;
		color: var(--foregroundColor);
	}
	.rightSide .status button {
		color: var(--primaryColor);
		font-size: var(--body);
		font-family: var(--bodyFont);
		border: none;
		outline: none;
		background: none;
	}

	@media screen and (width<768px) {
		.core {
			grid-template-columns: 95%;
			align-items: 2.5%;
		}
		.leftSide {
			display: none;
		}
	}
</style>
