<script lang="ts">
	import { showToast } from '$client/utils.client';
	import Otp from '$client/ui/components/other/otp.svelte';
	import { isNumberSchema } from '$global/zod';
	import MailBox from '$assets/images/mailBox.svg';
	import EmailSent from '$assets/images/mailSent.svg';
	import SyncButton from '$components/button/syncButton.svelte';
	import SendIcon from '$icons/sendIcon.svelte';
	import { Toaster } from 'svelte-sonner';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import ReactiveInput from '$components/input/reactiveInput.svelte';
	import { validateEmail, validatePassword } from '$global/zod';
	let otpString = '';
	let state: 'send' | 'verify' | 'reset' = 'send';
	let email = '';
	const sendEnhance: SubmitFunction = async ({ formData }) => {
		formData.append('email', email);
		return ({ result }) => {
			if (result.type == 'failure') showToast('Failure', result.data.message, 'danger');
			else if (result.type == 'success') {
				state = 'verify';
				showToast('Success', 'We send you an email.', 'success');
			}
		};
	};
	const verifyEnhance: SubmitFunction = async ({ formData }) => {
		formData.append('otp', otpString);
		return ({ result }) => {
			if (result.type == 'failure') {
				otpString = '';
				showToast('Failure', result.data.message, 'danger');
			} else if (result.type == 'success') state = 'reset';
		};
	};
	const resetPassword: SubmitFunction = async ({ formData }) => {
		formData.append('email', email);
		return ({ update, result }) => {
			if (result.type == 'failure') showToast('Error', result.data.message, 'danger');
			update();
		};
	};
</script>

<div class="emailVerification">
	<div class="wrapper">
		{#if state == 'send'}
			<img src={MailBox} alt="Mail box" />
			<span class="message"
				>Please provide the email address associated with the account for which you would like to
				reset the password.</span
			>
			<ReactiveInput
				checkFunction={(val) => {
					email = val;
					return validateEmail(val);
				}}
			/>
			<form action="?/send" method="post" use:enhance={sendEnhance}>
				<SyncButton text="Send me an email" icon={SendIcon} --width="80%" />
			</form>
		{:else if state == 'verify'}
			<img src={EmailSent} alt="Email sent" />
			<span class="message">
				An email has been sent to <span class="email">{email}</span>. If you have not yet received
				it, we recommend checking your spam folder. Once located, please proceed by copying the
				verification code and pasting it below.</span
			>
			<form action="?/verify" method="post" use:enhance={verifyEnhance}>
				<Otp validator={(val) => isNumberSchema.safeParse(val).success} bind:otpString />
				<SyncButton text="Verify the code" --width="80%" />
			</form>
			<form action="?/send" method="post" use:enhance={sendEnhance}>
				<SyncButton text="Resend email" icon={SendIcon} type="passive" --width="80%" />
			</form>
		{:else}
			<h4>Type your new password</h4>
			<span class="message">Make sure you keep this password in a safe and secure location</span>
			<form action="?/reset" method="post" use:enhance={resetPassword}>
				<ReactiveInput name="password" inputType="password" checkFunction={validatePassword} />
				<SyncButton text="Confirm" --width="80%" />
			</form>
		{/if}
	</div>
</div>

<Toaster duration={3500} expand />

<style>
	.emailVerification {
		background-color: var(--backgroundColor);
		width: 100vw;
		flex-grow: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.wrapper {
		width: 40%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}
	.wrapper img {
		width: 280px;
		aspect-ratio: 1/1;
		object-fit: contain;
		object-position: center;
	}
	.wrapper form {
		display: contents;
	}
	.wrapper h4 {
		color: var(--foregroundColor);
	}
	.wrapper .message {
		color: var(--foregroundColor);
		word-break: break-all;
	}

	.wrapper .message .email {
		color: var(--primaryColor);
	}

	@media screen and (max-width: 768px) {
		.wrapper {
			width: 95%;
		}
	}
</style>
