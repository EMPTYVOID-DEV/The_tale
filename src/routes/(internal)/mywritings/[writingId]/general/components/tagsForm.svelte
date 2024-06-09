<script lang="ts">
	import FormWrapper from '$components/other/formWrapper.svelte';
	import SyncButton from '$components/button/syncButton.svelte';
	import ReactiveInput from '$components/input/reactiveInput.svelte';
	import { getValidator, tagSchema } from '$global/zod';
	import { page } from '$app/stores';
	import type { SubmitFunction } from '@sveltejs/kit';
	import CloseIcon from '$icons/closeIcon.svelte';
	import { showToast } from '$client/utils.client';

	const tagValidator = getValidator(tagSchema);
	const maxTags = 5;
	let newTag = '';

	const updateTags: SubmitFunction = async ({ formData }) => {
		formData.append('tags', JSON.stringify(tags));
		return ({ result, update }) => {
			if (result.type == 'failure') showToast('Failure', result.data.message, 'danger');
			if (result.type == 'success') showToast('Success', 'The name has been updated', 'success');
			update({ reset: false });
		};
	};

	function addTag() {
		if (tags.find((el) => el == newTag) || tags.length == maxTags) return;
		tags.push(newTag.toLowerCase());
		tags = tags;
	}

	function removeTag(idx: number) {
		tags.splice(idx, 1);
		tags = tags;
	}

	$: tags = $page.data.settings.tags as string[];
</script>

<FormWrapper action={updateTags} actionName="?/updateTags">
	<section class="input">
		<h3>Tags</h3>
		<span>Tags can help in search of writing as well as showing what it contains.</span>
		<div class="add">
			<ReactiveInput
				checkFunction={tagValidator}
				label="New tag"
				on:change={(e) => (newTag = e.detail.value)}
			/>
			<SyncButton
				text="add"
				type="passive"
				on:click={(e) => {
					e.preventDefault();
					addTag();
				}}
			/>
		</div>
		<div class="tags">
			{#each tags as tag, idx}
				<div class="tag">
					<span>{tag}</span>
					<button class="controls" on:click={() => removeTag(idx)}>
						<CloseIcon />
					</button>
				</div>
			{/each}
		</div>
	</section>
	<svelte:fragment slot="submitter">
		<span class="description"
			>Your Writing can have at max {maxTags} tags and need to be different</span
		>
		<SyncButton text="save" type="passive" />
	</svelte:fragment>
</FormWrapper>

<style>
	.input {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		gap: 0.75rem;
	}

	.input h3,
	.input span {
		color: var(--foregroundColor);
	}

	.add {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		--width: 50%;
	}

	.tags {
		width: 100%;
		display: flex;
		gap: 0.75rem;
		overflow: scroll;
	}

	.tags::-webkit-scrollbar {
		display: none;
	}

	.tag {
		display: flex;
		align-items: center;
		padding: 0.25rem;
		gap: 0.25rem;
		background-color: rgb(from var(--primaryColor) r g b / 0.3);
		border-radius: var(--border-radius);
		--icon: var(--foregroundColor);
	}

	.tag button {
		outline: none;
		border: none;
		background: none;
		display: flex;
		align-items: center;
		border-radius: var(--border-radius);
		--icon: var(--dangerColor);
		cursor: pointer;
	}

	.description {
		font-size: var(--small);
		color: var(--mutedColor);
	}

	@media screen and (max-width: 768px) {
		.add {
			--width: 100%;
		}
	}
</style>
