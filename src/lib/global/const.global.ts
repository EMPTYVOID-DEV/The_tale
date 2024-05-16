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

export const bodyFontsUrl =
	'https://api.fontsource.org/v1/fonts?subsets=latin&weights=400,600&styles=normal';

export const headerFontsUrl =
	'https://api.fontsource.org/v1/fonts?weights=700&styles=normal&subsets=latin';

export const codeLanguages = [
	'JavaScript',
	'Python',
	'Java',
	'C#',
	'PHP',
	'C++',
	'C',
	'Swift',
	'Ruby',
	'Objective-C',
	'R',
	'Go',
	'Kotlin',
	'Scala',
	'Rust',
	'Zig',
	'Dart',
	'TypeScript',
	'Shell',
	'PowerShell',
	'Perl',
	'Haskell',
	'Svelte',
	'Tsx',
	'Vue'
];
