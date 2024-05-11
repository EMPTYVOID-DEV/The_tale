import { toast } from 'svelte-sonner';
import SyncToast from '$components/toast/syncToast.svelte';
import type { Contribution, Reference } from '$global/types.global';
import { get } from 'svelte/store';
import { page } from '$app/stores';

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

export function isOwner() {
	const pageData = get(page);
	const writingId = pageData.params.writingId;
	const contributions: Contribution[] = pageData.data.contributions;
	return contributions.find((el) => el.writingId == writingId && el.role == 'owner') != null;
}

export function isReferenceCreator(title: string) {
	const pageData = get(page);
	const id = pageData.data.id;
	const references = pageData.data.references as Reference[];
	const writerId = references.find((el) => el.title == title).writerId;
	return id == writerId;
}
