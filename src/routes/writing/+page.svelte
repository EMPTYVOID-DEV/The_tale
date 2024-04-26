<script lang="ts">
	import { page } from '$app/stores';
	import StaticInput from '$components/input/staticInput.svelte';
	import ProjectBanner from '$components/other/banner.svelte';
	import Select from '$components/other/select.svelte';
	import type { contribution } from '$global/types.global';
	import PlusIcon from '$icons/plusIcon.svelte';
	let contributions: contribution[] = $page.data.contributions as contribution[];
	const rolesOrder = ['writer', 'manager', 'owner'];
	const elements: { value: 'name' | 'role' | 'writingTime'; label: string }[] = [
		{
			value: 'name',
			label: 'Order by name'
		},
		{
			value: 'role',
			label: 'Order by role level'
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
		const fullContributions = $page.data.contributions as contribution[];
		if (query == '') contributions = fullContributions;
		else contributions = fullContributions.filter((el) => el.projectName.includes(query));
	}

	function order(orderCriteria: 'name' | 'role' | 'writingTime') {
		if (orderCriteria == 'name')
			contributions = contributions.sort((a, b) => sortNames(a.projectName, b.projectName));
		else if (orderCriteria == 'writingTime')
			contributions = contributions.sort((a, b) => b.writingTime - a.writingTime);
		else
			contributions = contributions.sort(
				(a, b) => rolesOrder.indexOf(b.role) - rolesOrder.indexOf(a.role)
			);
	}
	order('name');
</script>

<div class="writing">
	<section class="control">
		<StaticInput placeholder="Search for a writing" on:change={(e) => filter(e.detail.value)} />
		<div class="actions">
			<Select
				{elements}
				value={[elements[0]]}
				clearable={false}
				on:change={(e) => order(e.detail.selected[0].value)}
			/>
			<button class="add">
				<PlusIcon />
				<span>new writing</span>
			</button>
		</div>
	</section>
	<section class="list">
		{#each contributions as contribution}
			<a href="/writing/{contribution.projectId}" class="writingLink">
				<ProjectBanner banner={contribution.projectBanner} />
				<div class="layer">
					<span>{contribution.projectName}</span>
					<span>{contribution.projectId}</span>
				</div>
				<div class="layer">
					<span>Role</span>
					<span>{contribution.role}</span>
				</div>
				<div class="layer">
					<span>Writing time</span>
					<span>{Math.floor(contribution.writingTime / 60)} minutes</span>
				</div>
			</a>
		{/each}
	</section>
</div>

<style>
	.writing {
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
	.writingLink {
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

	.writingLink .layer {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
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

	@media screen and (width < 764px) {
		.control {
			flex-wrap: wrap;
		}
		.add {
			width: 3rem;
			aspect-ratio: 1/1;
		}
		.add span {
			display: none;
		}
	}
</style>
