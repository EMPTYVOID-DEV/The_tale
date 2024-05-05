<script lang="ts">
	import { enhance } from '$app/forms';
	import { showToast } from '$client/utils.client';
	import SyncButton from '$components/button/syncButton.svelte';
	import FormWrapper from '$components/other/formWrapper.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';

	const logout: SubmitFunction = async () => {
		return ({ result, update }) => {
			if (result.type == 'failure') showToast('Error', 'Unable to logout.', 'danger');
			update();
		};
	};
</script>

<FormWrapper action={logout} actionName="?/logout" --justify="flex-end">
	<section class="input">
		<h3>Logout</h3>
		<span
			>This action will log you out from all active sessions. Do this if you need to reset your
			password, like if your account was compromised. Logging out will revoke access from anyone
			unauthorized.
		</span>
	</section>
	<svelte:fragment slot="submitter">
		<SyncButton text="Logout" type="passive" />
	</svelte:fragment>
</FormWrapper>

<style>
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

	@media screen and (max-width: 768px) {
		.input {
			--width: 80%;
		}
	}
</style>
