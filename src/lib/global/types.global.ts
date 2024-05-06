type colorSet = {
	bg: string;
	text: string;
	primary: string;
};

type fontDescritpion = {
	id: string;
	subset: string;
};

/**
 * main in case one theme system
 * extra in case we have light and dark (extra is dark)
 */
export type writingColors = {
	main: colorSet;
	extra?: colorSet;
};

export type writingFonts = {
	heading: fontDescritpion;
	body: fontDescritpion;
};

export type writingLogo = {
	type: 'url' | 'text';
	value: string;
};

export type background = {
	type: 'url' | 'color';
	value: string;
};

export type sectionsGraph =
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

export type contribution = {
	writingId: string;
	role: 'owner' | 'writer';
	writingTime: number;
	writingName: string;
	writingBanner: background;
};

export type actionStatus = {
	state: 'valid' | 'invalid';
	errorMsg: string;
};
