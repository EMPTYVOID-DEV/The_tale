<script lang="ts">
	export let numberOfInputs: number = 6;
	export let validator: (val: string) => boolean;
	export let otpString = '';
	let boxValues: string[] = new Array(numberOfInputs).fill('');
	let otpRef: HTMLDivElement;
	function handler(val: string, index: number) {
		if (!validator(val)) boxValues[index] = '';
		else {
			boxValues[index] = val;
			const nextBoxIndex = Math.min(index + 1, numberOfInputs - 1);
			const nextBox = otpRef.childNodes.item(nextBoxIndex) as HTMLInputElement;
			nextBox.focus();
		}
		otpString = boxValues.reduce((pre, curr) => pre + curr);
	}
</script>

<div class="otp" bind:this={otpRef}>
	{#each boxValues as boxVal, idx}
		<input
			class="box"
			type="text"
			on:input={(e) => handler(e.currentTarget.value, idx)}
			bind:value={boxVal}
		/>
	{/each}
</div>

<style>
	.otp {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.box {
		all: unset;
		width: 3rem;
		aspect-ratio: 1/1;
		font-family: var(--bodyFont);
		font-size: var(--h4);
		font-weight: bold;
		text-align: center;
		color: var(--foregroundColor);
		border: 2px solid var(--foregroundColor);
		border-radius: var(--border-radius);
		background-color: var(--backgroundColor);
	}
	.box:focus {
		border-color: var(--primaryColor);
		color: var(--primaryColor);
	}
</style>
