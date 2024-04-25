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
export type projectColors = {
	main: colorSet;
	extra?: colorSet;
};

export type projectFonts = {
	heading: fontDescritpion;
	body: fontDescritpion;
};

export type projectLogo = {
	type: 'url' | 'text';
	value: string;
};

export type projectBanner = {
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
