import { toast } from 'svelte-sonner';
import type { ComponentType, SvelteComponent } from 'svelte';

export function showToast(description: string, SyncToast: ComponentType<SvelteComponent>) {
	if (description)
		toast.custom(SyncToast, {
			componentProps: {
				header: 'Error',
				description,
				type: 'danger'
			}
		});
}
