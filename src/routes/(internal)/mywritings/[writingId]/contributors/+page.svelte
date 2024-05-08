<script lang="ts">
	import { page } from '$app/stores';
	import Dialog from '$components/other/dialog.svelte';
	import StaticInput from '$components/input/staticInput.svelte';
	import Select from '$components/other/select.svelte';
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
	const elements: { value: 'name' | 'role' | 'writingTime'; label: string }[] = [
		{
			value: 'name',
			label: 'Order by name'
		},
		{
			value: 'writingTime',
			label: 'Order by writing time'
		}
	];

	function sortNames(a: string, b: string) {
		const lengthA = a.length;
		const lengthB = b.length;

		for (let i = 0; i < Math.min(lengthA, lengthB); i++) {
			const charCodeA = a.charCodeAt(i);
			const charCodeB = b.charCodeAt(i);

			if (charCodeA < charCodeB) {
				return -1;
			} else if (charCodeA > charCodeB) {
				return 1;
			}
		}

		return lengthA - lengthB;
	}

	function filter(query: string) {
		const fullContributions = $page.data.contributors as WritingContributors[];
		if (query == '') contributors = fullContributions;
		else contributors = fullContributions.filter((el) => el.contributorUsername.includes(query));
	}

	function order(orderCriteria: 'name' | 'writingTime') {
		if (orderCriteria == 'name')
			contributors = contributors.sort((a, b) =>
				sortNames(a.contributorUsername, b.contributorUsername)
			);
		else orderCriteria == 'writingTime';
		contributors = contributors.sort((a, b) => b.writingTime - a.writingTime);
	}
	order('name');
</script>

<div class="contributors">
	<section class="control">
		<StaticInput placeholder="Search for a contributor" on:change={(e) => filter(e.detail.value)} />
		<div class="actions">
			<Select
				{elements}
				value={[elements[0]]}
				clearable={false}
				on:change={(e) => order(e.detail.selected[0].value)}
			/>
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
		</div>
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
					<span>ID-{contributor.contributorId}</span>
				</div>
				<div class="layer">
					<span>Writing time</span>
					<span>{Math.floor(contributor.writingTime / 60)} minutes</span>
				</div>
				<div class="layer">
					<SyncButton type="danger" text="remove" icon={DeleteIcon} />
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

	.actions {
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
		background-color: var(--foregroundColor);
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
	}

	.list {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}
	.contributor {
		--mixed-light: color-mix(in srgb, var(--foregroundColor) 8%, transparent 92%);
		background-color: var(--mixed-light);
		border: 1px solid var(--mutedColor);
		border-radius: var(--border-radius);
		padding: 0.5rem;
		width: 100%;
		display: grid;
		grid-template-columns: max-content repeat(3, 1fr);
		align-items: center;
		gap: 0.5rem;
		cursor: pointer;
	}

	.contributor .layer {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.layer:last-child {
		justify-self: flex-end;
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
		.control {
			flex-wrap: wrap;
		}
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
	}
</style>
