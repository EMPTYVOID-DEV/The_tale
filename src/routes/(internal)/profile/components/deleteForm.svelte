<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import SyncButton from '$components/button/syncButton.svelte';
	import StaticInput from '$components/input/staticInput.svelte';
	import Dialog from '$components/other/dialog.svelte';
	import { quadInOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';

	function cancelAction(e: MouseEvent, close: Function) {
		e.preventDefault();
		close();
	}
</script>

<div class="deleteAccount">
	<section class="input">
		<h3>Delete account</h3>
		<span
			>Permanently remove your Personal Account and all of its contents from the CodeNest platform.
			This action is not reversible, so please continue with caution.</span
		>
	</section>
	<section class="submitter">
		<Dialog let:close>
			<svelte:fragment slot="trigger" let:open>
				<SyncButton text="Delete account" type="danger" on:click={open} />
			</svelte:fragment>
			<form
				use:enhance={() => {
					return ({ update }) => {
						close();
						update();
					};
				}}
				action="?/deleteAccount"
				method="post"
				class="deleteForm"
				transition:scale={{ duration: 520, easing: quadInOut, start: 0, opacity: 0.2 }}
			>
				<h2>Delete account</h2>
				<span
					>This action will erase all content related to your account.We recommend backing all of
					your projects</span
				>
				<StaticInput
					name="confirmation"
					label={`Enter your "${$page.data.username}" to delete.`}
					--primaryColor="var(--dangerColor)"
				/>
				<section class="actions">
					<SyncButton
						text="Cancel"
						type="passive"
						on:click={(e) => {
							cancelAction(e, close);
						}}
					/>
					<SyncButton text="Confirm" type="danger" />
				</section>
			</form>
		</Dialog>
	</section>
</div>

<style>
	.deleteAccount {
		--mixed-light: color-mix(in srgb, var(--foregroundColor) 8%, transparent 92%);
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: var(--mixed-light);
		border: 1px solid var(--dangerColor);
		border-radius: var(--border-radius);
		overflow: hidden;
	}

	.input {
		display: flex;
		flex-direction: column;
		padding: 1rem;
		gap: 0.75rem;
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
		border-top: 1px solid var(--dangerColor);
		background-color: color-mix(in srgb, var(--dangerColor) 25%, var(--backgroundColor) 75%);
	}
	.deleteForm {
		width: 60vw;
		background-color: var(--backgroundColor);
		border: 1px solid var(--foregroundColor);
		border-radius: var(--border-radius);
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.deleteForm h2 {
		color: var(--foregroundColor);
	}
	.deleteForm span {
		color: var(--dangerColor);
	}
	.deleteForm .actions {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		gap: 0.5rem;
	}
	@media screen and (max-width: 768px) {
		.deleteForm {
			width: 90vw;
		}
	}
</style>
