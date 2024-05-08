import { templates } from './const.global';

type ColorSet = {
	bg: string;
	text: string;
	primary: string;
};

type FontDescritpion = {
	id: string;
	subset: string;
};

/**
 * main in case one theme system
 * extra in case we have light and dark (extra is dark)
 */
export type WritingColors = {
	main: ColorSet;
	extra?: ColorSet;
};

export type WritingFonts = {
	heading: FontDescritpion;
	body: FontDescritpion;
};

export type Background = {
	type: 'url' | 'color';
	value: string;
};

export type SectionsGraph =
	| { type: 'tier0'; section: string }
	| { type: 'tier1'; sections: string[] }
	| { type: 'tier2'; categories: { category: string; sections: string[] }[] }
	| {
			type: 'tier3';
			categories: {
				category: string;
				sections: ({ subcategories: string; sections: string[] } | string)[];
			}[];
	  };

export type Contribution = {
	writingId: string;
	role: 'owner' | 'writer';
	writingTime: number;
	writingName: string;
	writingBackground: Background;
};

export type WritingContributors = {
	contributorId: string;
	contributorUsername: string;
	contributorAvatar: string;
	writingTime: number;
};

export type ActionStatus = {
	state: 'valid' | 'invalid';
	errorMsg: string;
};

export type Templates = keyof typeof templates;
