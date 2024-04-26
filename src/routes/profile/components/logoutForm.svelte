<script lang="ts">
	import { enhance } from '$app/forms';
	import { showToast } from '$client/utils.client';
	import SyncButton from '$components/button/syncButton.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';

	const logout: SubmitFunction = async () => {
		return ({ result, update }) => {
			if (result.type == 'failure') showToast('Error', 'Unable to logout.', 'danger');
			update();
		};
	};
</script>

<form class="logout-form" action="?/logout" method="post" use:enhance={logout}>
	<section class="input">
		<h3>Logout</h3>
		<span
			>This action will log you out from all active sessions. Do this if you need to reset your
			password, like if your account was compromised. Logging out will revoke access from anyone
			unauthorized.
		</span>
	</section>
	<div class="submitter">
		<SyncButton text="Logout" type="passive" />
	</div>
</form>

<style>
	.logout-form {
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

	.submitter {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding-inline: 1rem;
		padding-block: 0.5rem;
		border-top: 1px solid var(--mutedColor);
	}
	@media screen and (max-width: 768px) {
		.input {
			--width: 80%;
		}
	}
</style>
