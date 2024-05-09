<script>
	import ColorPicker from 'svelte-awesome-color-picker';
	import CustomInput from './customInput.svelte';
	/**@type {string}*/
	export let label = '';
	/**@type {string}*/
	export let name = '';
	/**@type {string}*/
	export let hex = '#dfdafa';
	/**@type {boolean}*/
	export let isAlpha = false;
</script>

<div class="colorPickerWrapper">
	<label for="input">{label}</label>
	<ColorPicker
		bind:hex
		on:input
		{isAlpha}
		{name}
		components={{ input: CustomInput }}
		--picker-z-index="10"
		--picker-indicator-size="0.75rem"
		--focus-color="var(--primaryColor)"
		--cp-bg-color="var(--foregroundColor)"
		--cp-border-color="var(--backgroundColor)"
		--cp-input-color="color-mix(in srgb , var(--primaryColor) 30%, transparent 70%)"
		--cp-button-hover-color="var(--primaryColor)"
	/>
</div>

<style>
	.colorPickerWrapper {
		width: var(--width, 100%);
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: 0.5rem;
	}
	.colorPickerWrapper label {
		font-family: var(--headerFont);
		font-size: var(--body);
		font-weight: 600;
		color: var(--foregroundColor);
	}
	.colorPickerWrapper label:empty {
		display: none;
	}
</style>
