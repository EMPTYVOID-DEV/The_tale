import { templates } from './const.global';

export type ColorSet = {
	bg: string;
	text: string;
	primary: string;
};

export type WritingColors = {
	light: ColorSet;
	dark: ColorSet;
};

export type WritingFonts = {
	heading: string;
	body: string;
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

export type fontSource = {
	id: string;
	family: string;
	subset: string[];
	weights: number[];
	styles: string[];
};
