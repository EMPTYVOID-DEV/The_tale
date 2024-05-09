import type { WritingColors, WritingFonts } from './types.global';

export const defaultBgUrl = '/backgrounds/default.jpg';

export const defaultBgColor = '#dfdafa';

export const templates = {
	Sveltekit: 0,
	NextJs: 1,
	NuxtJs: 2
} as const;

export const defaultColors: WritingColors = {
	dark: { text: '#dfdafa', bg: '#040110', primary: '#6f3dd4' },
	light: { text: '#333333', bg: '#F0F0F0', primary: '#8A6EE6' }
};

export const defaultFonts: WritingFonts = {
	heading: 'anek-tamil',
	body: 'aileron'
};
