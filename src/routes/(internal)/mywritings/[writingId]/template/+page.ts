import type { fontSource } from '$global/types.global';
import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ fetch, data }) => {
	const bodyFontsList: fontSource[] = await fetch(
		'https://api.fontsource.org/v1/fonts?subsets=latin&weights=400,600&styles=normal'
	)
		.then((res) => res.json())
		.then((fonts: fontSource[]) =>
			fonts.filter((el) => el.weights.includes(400) && el.weights.includes(600))
		);
	const headingFontsList: fontSource[] = await fetch(
		'https://api.fontsource.org/v1/fonts?weights=700&styles=normal&subsets=latin'
	).then((res) => res.json());
	return {
		bodyFontsList,
		headingFontsList,
		template: data
	};
};
