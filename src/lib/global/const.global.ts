import type { ThemeInput } from 'shiki/types.mjs';
import type { WritingColors, WritingFonts } from './types.global';

export const defaultBgUrl = '/backgrounds/default.png';

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
	'Html',
	'Css',
	'Bash',
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

export const queryLimit = 9;

export const altronTheme: ThemeInput = {
	name: 'altronTheme',
	bg: 'transparent',
	fg: 'var(--foregroundColor)',
	settings: [
		{
			scope: ['comment'],
			settings: {
				foreground: 'color-mix(in srgb, var(--primaryColor) 90%, black)'
			}
		},
		{
			scope: ['string'],
			settings: {
				foreground: 'color-mix(in srgb, var(--primaryColor) 80%, black)'
			}
		},
		{
			scope: ['keyword'],
			settings: {
				foreground: 'color-mix(in srgb, var(--primaryColor) 95%, black)'
			}
		},
		{
			scope: ['constant'],
			settings: {
				foreground: 'color-mix(in srgb, var(--primaryColor) 80%, black)'
			}
		},
		{
			scope: ['parameter'],
			settings: {
				foreground: 'color-mix(in srgb, var(--primaryColor) 100%, black)'
			}
		},
		{
			scope: ['function'],
			settings: {
				foreground: 'color-mix(in srgb, var(--primaryColor) 95%, white 5%)'
			}
		},
		{
			scope: ['string-expression'],
			settings: {
				foreground: 'color-mix(in srgb, var(--primaryColor) 90%, white 10%)'
			}
		},
		{
			scope: ['punctuation'],
			settings: {
				foreground: 'color-mix(in srgb, var(--primaryColor) 85%, white 15%)'
			}
		},
		{
			scope: ['link'],
			settings: {
				foreground: 'color-mix(in srgb, var(--primaryColor) 80%, white 20%)'
			}
		}
	]
};

export const navHeight = 72;
