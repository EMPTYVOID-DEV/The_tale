import type { dataBlock } from '@altron/altron/types';
import type { writingMode } from './const.global';

export type ColorSet = {
	bg: string;
	text: string;
	primary: string;
	muted: string;
};

export type WritingColors = {
	light: ColorSet;
	dark: ColorSet;
};

export type WritingFonts = {
	heading: string;
	body: string;
};

export type Contribution = {
	writingId: string;
	role: 'owner' | 'writer';
	writingName: string;
	writingBackground: string;
	creationDate: string;
	mode: boolean;
};

export type WritingContributors = {
	contributorId: string;
	contributorUsername: string;
	contributorAvatar: string;
};

export type ActionStatus = {
	state: 'valid' | 'invalid';
	errorMsg: string;
};

export type FontSource = {
	id: string;
	family: string;
	subset: string[];
	weights: number[];
	styles: string[];
};

export type Reference = {
	description: string;
	title: string;
	href: string;
	writerId: string;
};

export class Section {
	name: string;
	sibling: Section;
	rootChild: Section;

	constructor(name: string) {
		this.name = name;
		this.rootChild = null;
		this.sibling = null;
	}
}

export type SectionData = {
	name: string;
	writingId: string;
	writerId: string;
	content: dataBlock[];
};

export type QueryResult = {
	background: string;
	creationDate: string;
	ownerId: string;
	ownerUsername: string;
	ownerAvatar: string;
	name: string;
	description: string;
	tags: string[];
	id: string;
};

export type SectionsLocation = 'viewing' | 'editing';

export type WritingMode = keyof typeof writingMode;
