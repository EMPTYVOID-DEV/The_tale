import { toast } from 'svelte-sonner';
import SyncToast from '$components/toast/syncToast.svelte';
import AsyncToast from '$components/toast/asyncToast.svelte';
import type { Contribution, Reference } from '$global/types.global';
import { get } from 'svelte/store';
import { page } from '$app/stores';
import type { toastState } from './types.client';
import { destructorFileName } from '$global/utils.global';
import uuid from 'short-uuid';
import type { dataBlock } from '@altron/altron/types';

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

export function showAsyncToast(header: string, description: string, promise: Promise<toastState>) {
	toast.custom(AsyncToast, {
		duration: 12000,
		componentProps: {
			promise,
			loadingState: {
				header: header,
				description: description,
				toastAction: null
			}
		}
	});
}

export function addBlockFile(el: dataBlock, formData: FormData) {
	if (el.name != 'attachment' && el.name != 'image') return;
	if (!el.data.file) return;
	const random = uuid().generate();
	const { extension } = destructorFileName(el.data.file.name);
	const name = `${random}.${extension}`;
	const file = new File([el.data.file], name, { type: el.data.file.type });
	el.data.file = null;
	el.data.src = `/sections/${name}`;
	formData.append('files', file);
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

export function isSectionCreator() {
	const pageData = get(page);
	const id = pageData.data.id;
	const writerId = pageData.data.sectionData.writerId;
	return writerId == id;
}
