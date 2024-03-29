import { toast } from 'svelte-sonner';
import SyncToast from '$components/toast/syncToast.svelte';

export function showToast(
	header: string,
	description: string,
	type: 'primary' | 'success' | 'danger',
	toastAction?: { label: string; action: (e: MouseEvent) => void }
) {
	if (description)
		toast.custom(SyncToast, {
			componentProps: {
				header: header,
				description,
				type,
				toastAction
			}
		});
}
