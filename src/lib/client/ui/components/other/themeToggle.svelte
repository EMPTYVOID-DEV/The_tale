<script>
	import MoonIcon from '$icons/moonIcon.svelte';
	import SunIcon from '$icons/sunIcon.svelte';
	import { createEventDispatcher } from 'svelte';

	/**@type {"dark"|"light"}*/
	export let active = 'dark';

	const dispatcher = createEventDispatcher();

	function toggleTheme() {
		dispatcher('change', {
			theme: active
		});
	}
</script>

{#if active == 'dark'}
	<button
		on:click={() => {
			active = 'light';
			toggleTheme();
		}}
	>
		<MoonIcon />
	</button>
{:else}
	<button
		on:click={() => {
			active = 'dark';
			toggleTheme();
		}}
	>
		<SunIcon />
	</button>
{/if}

<style>
	button {
		all: unset;
		cursor: pointer;
	}
</style>
