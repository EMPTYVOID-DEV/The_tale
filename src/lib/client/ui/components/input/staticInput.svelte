<script>
	import { createEventDispatcher } from 'svelte';

	/**@type {string}*/
	export let name = '';
	/**@type {string}*/
	export let value = '';
	/**@type {string}*/
	export let label = '';
	/**@type {"text"|"password"|"email"|"number"}*/
	export let inputType = 'text';
	/**@type {boolean}*/
	export let disabled = false;
	/**@type {string}*/
	export let placeholder = '';
	const dispatcher = createEventDispatcher();

	/**@type {import("$client/types.client").inputChangeHandler<HTMLInputElement>}*/
	function handleChange(e) {
		dispatcher('change', {
			value: e.currentTarget.value
		});
	}
</script>

<div class="input-container" class:disabled>
	<label for="input">{label}</label>
	<input type={inputType} {disabled} {value} {name} {placeholder} on:input={handleChange} />
</div>

<style>
	.input-container {
		width: var(--width, 100%);
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: 0.5rem;
	}

	.input-container label {
		font-family: var(--headerFont);
		font-size: var(--body);
		font-weight: 600;
		color: var(--foregroundColor);
	}

	.input-container label:empty {
		display: none;
	}
	.input-container input {
		width: 100%;
		padding-left: 0.5rem;
		padding-block: 0.5rem;
		font-size: var(--body);
		font-family: var(--bodyFont);
		font-weight: bold;
		color: var(--foregroundColor);
		background-color: transparent;
		border-radius: var(--border-radius);
		border: 2px solid var(--foregroundColor);
		outline: none;
	}
	.input-container input:focus {
		border-color: var(--primaryColor);
		background-color: color-mix(in srgb, var(--primaryColor) 30%, transparent 70%);
	}
	.input-container input[type='number']::-webkit-outer-spin-button,
	.input-container input::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}
	.input-container input::placeholder {
		color: var(--mutedColor);
	}

	.disabled input {
		border-color: var(--mutedColor);
		color: var(--mutedColor);
	}
	.disabled label {
		color: var(--mutedColor);
	}
</style>
