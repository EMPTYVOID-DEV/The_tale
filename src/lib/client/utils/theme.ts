import type { theme } from '$global/types.global';

export function changeTheme(theme: theme) {
	const actualTheme = theme == 'system' ? detectSystemTheme() : theme;
	const html = document.querySelector('html');
	const dataset = html?.dataset;
	dataset.theme = actualTheme;
	document.cookie = `theme=${actualTheme};path=/;`;
}

export function detectSystemTheme(): 'light' | 'dark' {
	const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)');
	if (darkModePreference.matches) return 'dark';
	else return 'light';
}
