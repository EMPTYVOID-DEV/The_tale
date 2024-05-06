import type { changeEvent } from '$client/types.client';

export function checkType(attachmentTypes: string, type: string) {
	const typeArray = type.split('/');
	for (const v of attachmentTypes.split(',')) {
		const testType = v.trim().split('/');
		if (testType[0] == typeArray[0] && (testType[1] == '*' || testType[1] == typeArray[1]))
			return true;
	}
	return false;
}
/**
 * sizelimit can be -1 to indicate there is no size limit also it in kilos.
 */

export function checkSize(sizeLimit: number, sizeInBytes: number) {
	const sizeInKilos = sizeInBytes / 1024;
	if (sizeLimit == -1) return true;
	if (sizeInKilos <= sizeLimit) return true;
	return false;
}

export function destructorFileName(name: string) {
	const [filename, extension] = name.split('.');
	return { filename, extension };
}

export function imgHandler(e: changeEvent<HTMLInputElement>, cb: (url: string) => void) {
	const file = e.currentTarget.files?.[0];
	if (file && checkType('image/*', file.type) && checkSize(2500, file.size)) {
		const url = URL.createObjectURL(file);
		cb(url);
	}
}
