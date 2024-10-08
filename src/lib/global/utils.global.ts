import type { changeEvent } from '$client/types.client';
import { Section } from './types.global';

function constructPath(target: Section, parentMap: Map<Section, Section>) {
	const path: Section[] = [];
	let currentNode = target;

	while (currentNode) {
		path.unshift(currentNode);
		currentNode = parentMap.get(currentNode);
	}

	return path;
}

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

export function imgHandler(
	e: changeEvent<HTMLInputElement>,
	cb: (url: string, file?: File) => void,
	type: string = 'image/*'
) {
	const file = e.currentTarget.files?.[0];
	if (file && checkType(type, file.type) && checkSize(2500, file.size)) {
		const url = URL.createObjectURL(file);
		cb(url, file);
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

	return [];
}

export function getDepthPath(path: Section[]) {
	const newPath: Section[] = [];
	for (let i = 0; i < path.length; i++) {
		const current = path.at(i);
		const neigbor = path.at(i + 1);
		if (!current || !neigbor) {
			newPath.push(path.at(-1));
			return newPath;
		}
		if (current.rootChild == neigbor) newPath.push(current);
	}
}

export function renameSection(
	root: Section,
	previousName: string,
	newName: string
): 'updated' | 'duplicate' | 'not found' {
	const target = traverseToTarget(root, previousName).at(-1);
	if (!target) return 'not found';
	const other = traverseToTarget(root, newName).at(-1);
	if (other && other != target) return 'duplicate';
	target.name = newName;
	return 'updated';
}

export function addSectionGraph(
	root: Section,
	type: 'sibling' | 'child',
	newSectionName: string,
	adjacentName: string
): 'updated' | 'duplicate' | 'not found' | 'max depth' {
	const pathToAdjacent = traverseToTarget(root, adjacentName);
	const depthPath = getDepthPath(pathToAdjacent);
	if (type == 'child' && depthPath.length == 3) return 'max depth';
	const adjacent = pathToAdjacent.at(-1);
	const target = traverseToTarget(root, newSectionName).at(-1);
	if (target) return 'duplicate';
	if (!adjacent) return 'not found';
	const newSection = new Section(newSectionName);
	if (type == 'child') {
		const currentRootChild = adjacent.rootChild;
		adjacent.rootChild = newSection;
		newSection.sibling = currentRootChild;
	} else {
		const currentSibling = adjacent.sibling;
		adjacent.sibling = newSection;
		newSection.sibling = currentSibling;
	}
	return 'updated';
}

export function deleteSectionGraph(root: Section, sectionName: string) {
	const pathToTarget = traverseToTarget(root, sectionName);
	const target = pathToTarget.at(-1);
	const parent = pathToTarget.at(-2);
	if (!target) return;
	if (parent.rootChild == target) parent.rootChild = target.sibling;
	if (parent.sibling == target) parent.sibling = target.sibling;
}

export function getNeighbors(root: Section, name: string): { prev: Section; next: Section } {
	const neigbors = { prev: null, next: null };
	const path = traverseToTarget(root, name);
	const parent = getDepthPath(path)[0];
	const [target, prev] = path.reverse();
	if (prev) neigbors.prev = prev;
	if (target.rootChild) neigbors.next = target.rootChild;
	else if (target.sibling) neigbors.next = target.sibling;
	else if (parent?.sibling) neigbors.next = parent.sibling;
	return neigbors;
}

export function getParent(root: Section, target: string) {
	const path = traverseToTarget(root, target);
	const depthPath = getDepthPath(path);
	const parent = depthPath.at(-2);
	if (parent) return parent.name;
	return null;
}
