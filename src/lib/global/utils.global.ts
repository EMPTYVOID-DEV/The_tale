import type { changeEvent } from '$client/types.client';
import type { Section } from './types.global';

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

export function isTreeRooted(root: Section) {
	return root.rootChild == null && root.sibling == null;
}

export function traverseToTarget(root: Section, targetName: string) {
	const parentMap = new Map();
	const queue = [root];

	while (queue.length > 0) {
		const currentTarget = queue.shift();

		if (currentTarget.name === targetName) {
			return constructPath(currentTarget, parentMap);
		}

		if (currentTarget.rootChild) {
			parentMap.set(currentTarget.rootChild, currentTarget);
			queue.push(currentTarget.rootChild);
		}

		if (currentTarget.sibling) {
			parentMap.set(currentTarget.sibling, currentTarget);
			queue.push(currentTarget.sibling);
		}
	}

	return null;
}

function constructPath(target: Section, parentMap: Map<Section, Section>) {
	const path: Section[] = [];
	let currentNode = target;

	while (currentNode) {
		path.unshift(currentNode);
		currentNode = parentMap.get(currentNode);
	}

	return path;
}

export function promiseTimeout(timeout: number, cb: () => void) {
	return new Promise<void>((res) => {
		setTimeout(() => {
			cb();
			res();
		}, timeout);
	});
}
