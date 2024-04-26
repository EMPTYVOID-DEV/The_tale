<script lang="ts">
	import { page } from '$app/stores';
	import StaticInput from '$components/input/staticInput.svelte';
	import Select from '$components/other/select.svelte';
	import type { contribution } from '$global/types.global';
	import PlusIcon from '$icons/plusIcon.svelte';
	const contributions: contribution[] = $page.data.contributions as contribution[];
	const elements: { value: string; label: string }[] = [
		{
			value: 'name',
			label: 'Order by name'
		},
		{
			value: 'role',
			label: 'Order by role'
		},
		{
			value: 'contribution',
			label: 'Order by contribution time'
		},
		{
			value: 'creation',
			label: 'Order by creation date'
		}
	];
	let orderCriteria = [elements[0]];
</script>

<div class="writings">
	<section class="control">
		<StaticInput placeholder="Search for a writing" />
		<div class="actions">
			<Select {elements} value={orderCriteria} />
			<button class="add">
				<PlusIcon />
				<span>new writing</span>
			</button>
		</div>
	</section>
</div>

<style>
	.writings {
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
		text-transform: capitalize;
		color: var(--backgroundColor);
		font-weight: bold;
		text-wrap: nowrap;
	}

	@media screen and (width < 764px) {
		.control {
			flex-wrap: wrap;
		}
		.add span {
			display: none;
		}
	}
</style>
