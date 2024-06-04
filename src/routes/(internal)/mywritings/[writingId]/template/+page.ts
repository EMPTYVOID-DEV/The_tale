import { bodyFontsUrl, headerFontsUrl } from '$global/const.global';
import type { FontSource } from '$global/types.global';
import type { Load } from '@sveltejs/kit';

//TODO: revert to error checking

export const load: Load = async ({ fetch, data }) => {
	const bodyFonts: Promise<FontSource[]> = fetch(bodyFontsUrl)
		.then((res) => res.json())
		.then((fonts) =>
			fonts.filter((el: FontSource) => el.weights.includes(400) && el.weights.includes(600))
		);
	const headingFonts: Promise<FontSource[]> = fetch(headerFontsUrl).then((res) => res.json());
	const fonts = await Promise.allSettled([bodyFonts, headingFonts]);
	if (fonts[0].status == 'rejected' || fonts[1].status == 'rejected')
		return {
			bodyFonts: [],
			headingFonts: [],
			template: data
		};
	// throw new Error('Service unavailable');
	else
		return {
			bodyFonts: fonts[0].value,
			headingFonts: fonts[1].value,
			template: data
		};
};
