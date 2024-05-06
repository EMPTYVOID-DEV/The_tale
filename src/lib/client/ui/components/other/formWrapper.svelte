<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	export let action: SubmitFunction;
	export let actionName: string;
</script>

<form
	action={actionName}
	use:enhance={action}
	class="formWrapper"
	enctype="multipart/form-data"
	method="post"
>
	<slot />
	<div class="submitter">
		<slot name="submitter" />
	</div>
</form>

<style>
	.formWrapper {
		--mixed-light: color-mix(in srgb, var(--foregroundColor) 8%, transparent 92%);
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: var(--mixed-light);
		border: 1px solid var(--mutedColor);
		border-radius: var(--border-radius);
	}
	.submitter {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: var(--justify, space-between);
		padding-inline: 1rem;
		padding-block: 0.5rem;
		border-top: 1px solid var(--mutedColor);
	}
</style>
