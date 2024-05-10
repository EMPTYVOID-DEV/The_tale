declare namespace App {
	interface Locals {
		user: import('lucia').User;
		session: import('lucia').Session;
	}
}
declare module '*.svelte' {
	export { SvelteComponentDev as default } from 'svelte/internal';
}
