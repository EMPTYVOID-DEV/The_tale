<script lang="ts">
	import type { AsyncToastState } from '$client/types.client';
	import DangerIcon from '$icons/dangerIcon.svelte';
	import LoadingIcon from '$icons/loadingIcon.svelte';
	import SuccessIcon from '$icons/successIcon.svelte';
	import CustomToast from './customToast.svelte';
	export let status: AsyncToastState;
</script>

{#if status.status == 'loading'}
	<div class="loadingToast">
		<CustomToast
			on:closeToast
			icon={LoadingIcon}
			description={status.description}
			header={status.header}
			toastAction={null}
		/>
	</div>
{:else if status.status == 'success'}
	<div class="successToast">
		<CustomToast
			on:closeToast
			icon={SuccessIcon}
			description={status.description}
			header={status.header}
			toastAction={null}
		/>
	</div>
{:else}
	<div class="dangerToast">
		<CustomToast
			on:closeToast
			icon={DangerIcon}
			description={status.description}
			header={status.header}
			toastAction={null}
		/>
	</div>
{/if}

<style>
	.dangerToast,
	.successToast,
	.loadingToast {
		/* this width css variable is passed by svelte-sonner */
		width: var(--width);
	}
	.loadingToast {
		--icon: var(--mutedColor);
		--main-color: var(--mutedColor);
	}
	.successToast {
		--icon: var(--successColor);
		--main-color: var(--successColor);
	}
	.dangerToast {
		--icon: var(--dangerColor);
		--main-color: var(--dangerColor);
	}
</style>
