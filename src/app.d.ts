declare namespace App {
	interface Locals {
		user: import('lucia').User;
		session: import('lucia').Session;
	}
	infer;
}
declare module '*.svelte' {
	export { SvelteComponentDev as default } from 'svelte/internal';
}
