<script lang="ts">
	import { page } from '$app/stores';
	import Dialog from '$components/other/dialog.svelte';
	import StaticInput from '$components/input/staticInput.svelte';
	import Select from '$components/other/select.svelte';
	import type { Contribution, WritingMode } from '$global/types.global';
	import PlusIcon from '$icons/plusIcon.svelte';
	import ReactiveInput from '$components/input/reactiveInput.svelte';
	import { getValidator, writingNameSchema } from '$global/zod';
	import SyncButton from '$components/button/syncButton.svelte';
	import { quadInOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	import { enhance } from '$app/forms';
	import { showToast } from '$client/utils.client';
	import { Toaster } from 'svelte-sonner';
	import Writing from './components/writing.svelte';

	type ModeElement = { value: WritingMode; label: WritingMode };

	type OrderingCriteria = 'name' | 'role' | 'date' | 'mode';

	let newWritingMode: ModeElement = { value: 'public', label: 'public' };

	let contributions = $page.data.contributions as Contribution[];

	const validateWritingName = getValidator(writingNameSchema);

	const rolesOrder = ['writer', 'owner'];

	const elements: { value: OrderingCriteria; label: string }[] = [
		{
			value: 'name',
			label: 'Order by name'
		},
		{
			value: 'role',
			label: 'Order by role level'
		},
		{
			value: 'date',
			label: 'Order by creation date'
		},
		{
			value: 'mode',
			label: 'Order by visibility '
		}
	];

	const writingModes: ModeElement[] = [
		{ value: 'public', label: 'public' },
		{ value: 'private', label: 'private' }
	];

	function compareNames(a: string, b: string) {
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

	function compareDates(a: string, b: string) {
		const dateA = new Date(a);
		const dateB = new Date(b);
		return dateA.getTime() - dateB.getTime();
	}

	function filter(query: string) {
		const fullContributions = $page.data.contributions as Contribution[];
		if (query == '') contributions = fullContributions;
		else contributions = fullContributions.filter((el) => el.writingName.includes(query));
	}

	function order(orderCriteria: OrderingCriteria) {
		if (orderCriteria == 'name')
			contributions = contributions.sort((a, b) => compareNames(a.writingName, b.writingName));
		else if (orderCriteria == 'date')
			contributions = contributions.sort((a, b) => compareDates(b.creationDate, a.creationDate));
		else if (orderCriteria == 'role')
			contributions = contributions.sort(
				(a, b) => rolesOrder.indexOf(b.role) - rolesOrder.indexOf(a.role)
			);
		else contributions = contributions.sort((a, b) => +b.mode - +a.mode);
	}
	order('name');
</script>

<div class="myWritings">
	<section class="control">
		<StaticInput placeholder="Search for a writing" on:change={(e) => filter(e.detail.value)} />
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
						<span>new writing</span>
					</button>
				</svelte:fragment>

				<form
					use:enhance={async ({ formData }) => {
						formData.append('mode', newWritingMode.value);
						return ({ result, update }) => {
							// @ts-ignore
							if (result.type == 'failure') showToast('Error', result.data.message, 'danger');
							else {
								close();
								update();
							}
						};
					}}
					method="post"
					class="addwriting"
					transition:scale={{ duration: 520, easing: quadInOut, start: 0, opacity: 0.2 }}
				>
					<h3>Create a new writing</h3>
					<Select
						elements={writingModes}
						value={[newWritingMode]}
						clearable={false}
						label="The writing visibility cannot be changed later"
						on:change={(e) => (newWritingMode = e.detail.selected[0])}
					/>
					<ReactiveInput
						checkFunction={validateWritingName}
						label="Writing name"
						name="writingName"
					/>
					<SyncButton text="Create writing" --width="100%" />
				</form>
				<Toaster expand duration={3500} />
			</Dialog>
		</div>
	</section>
	<section class="list">
		{#each contributions as contribution}
			<Writing {contribution} />
		{/each}
	</section>
</div>

<style>
	.myWritings {
		width: 100%;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		padding-inline: 2.5%;
		padding-block: 30px;
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
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.addwriting {
		width: 40vw;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
	}

	.addwriting h3 {
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
		.addwriting {
			width: 90vw;
		}
	}
</style>
