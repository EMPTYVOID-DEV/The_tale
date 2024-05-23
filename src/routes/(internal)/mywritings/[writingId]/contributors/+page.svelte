<script lang="ts">
	import { page } from '$app/stores';
	import Dialog from '$components/other/dialog.svelte';
	import StaticInput from '$components/input/staticInput.svelte';
	import type { WritingContributors } from '$global/types.global';
	import PlusIcon from '$icons/plusIcon.svelte';
	import SyncButton from '$components/button/syncButton.svelte';
	import { quadInOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	import { enhance } from '$app/forms';
	import { showToast } from '$client/utils.client';
	import { Toaster } from 'svelte-sonner';
	import Avatar from '$components/other/avatar.svelte';
	import DeleteIcon from '$icons/deleteIcon.svelte';
	let contributors = [];
	$: contributors = $page.data.contributors as WritingContributors[];

	function filter(query: string) {
		const fullContributions = $page.data.contributors as WritingContributors[];
		if (query == '') contributors = fullContributions;
		else contributors = fullContributions.filter((el) => el.contributorUsername.includes(query));
	}
</script>

<div class="contributors">
	<section class="control">
		<StaticInput placeholder="Search for a contributor" on:change={(e) => filter(e.detail.value)} />
		<Dialog let:close>
			<svelte:fragment let:open slot="trigger">
				<button class="add" on:click={() => open()}>
					<PlusIcon />
					<span>new contributor</span>
				</button>
			</svelte:fragment>

			<form
				use:enhance={async () => {
					return ({ result, update }) => {
						//@ts-ignore
						if (result.type == 'failure') showToast('Error', result.data.message, 'danger');
						else {
							close();
							update();
						}
					};
				}}
				action="?/addContributor"
				method="post"
				class="addContributor"
				transition:scale={{ duration: 520, easing: quadInOut, start: 0, opacity: 0.2 }}
			>
				<h3>Add a new contributor</h3>
				<StaticInput label="Contributor ID" name="contributorId" />
				<SyncButton text="Add Contributor" --width="100%" />
			</form>
			<Toaster expand duration={3500} />
		</Dialog>
	</section>
	<section class="list">
		{#each contributors as contributor}
			<form
				action="?/removeContributor"
				class="contributor"
				method="post"
				use:enhance={async ({ formData }) => {
					//@ts-ignore
					formData.append('contributorId', contributor.contributorId);
					return ({ result, update }) => {
						//@ts-ignore
						if (result.type == 'success')
							showToast('Success', 'The contributor has been removed.', 'success');
						update();
					};
				}}
			>
				<Avatar avatar={contributor.contributorAvatar} />
				<div class="layer">
					<span>{contributor.contributorUsername}</span>
					<span>{contributor.contributorId}</span>
				</div>
				<div class="layer">
					<SyncButton type="danger" icon={DeleteIcon} --padding-inline="0.5rem" />
				</div>
			</form>
		{/each}
	</section>
</div>

<Toaster duration={3500} expand />

<style>
	.contributors {
		width: 100%;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		padding-bottom: 30px;
		gap: 1.5rem;
	}
	.control {
		width: 100%;
		display: flex;
		gap: 0.75rem;
	}

	.add {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.25rem;
		width: fit-content;
		padding-inline: 0.5rem;
		padding-block: 0.5rem;
		cursor: pointer;
		outline: none;
		border: none;
		background-color: var(--primaryColor);
		border-radius: var(--border-radius);
	}
	.add span {
		color: var(--backgroundColor);
		font-weight: 600;
		text-wrap: nowrap;
	}

	.add :global(svg) {
		width: 20px;
		height: 20px;
		--icon: var(--backgroundColor);
	}

	.list {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.5rem;
	}
	.contributor {
		--mixed-light: color-mix(in srgb, var(--foregroundColor) 8%, transparent 92%);
		background-color: var(--mixed-light);
		border: 1px solid var(--mutedColor);
		border-radius: var(--border-radius);
		width: 100%;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem;
		cursor: pointer;
	}

	.contributor .layer {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.layer:last-child {
		margin-left: auto;
	}

	.layer span {
		font-size: var(--small);
	}

	.layer span:first-child {
		color: color-mix(in srgb, var(--primaryColor) 70%, var(--foregroundColor) 30%);
		font-weight: 600;
	}
	.layer span:last-child {
		color: var(--foregroundColor);
	}

	.addContributor {
		width: 40vw;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
	}

	.addContributor h3 {
		color: var(--foregroundColor);
	}

	@media screen and (width < 764px) {
		.add {
			width: 2.5rem;
			aspect-ratio: 1/1;
		}
		.add span {
			display: none;
		}
		.addContributor {
			width: 90vw;
		}
		.list {
			grid-template-columns: 100%;
		}
	}
</style>
