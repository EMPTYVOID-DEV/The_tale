<script lang="ts">
	import { onMount } from 'svelte';
	let configuration = 1;
	let roundness = 0;

	onMount(() => {
		const Morphs: { roundness: number; configuration: number }[] = [
			{ roundness: 0, configuration: 1 },
			{ roundness: 2, configuration: 3 },
			{ roundness: 1, configuration: 2 },
			{ roundness: 0, configuration: 2 }
		];
		let idx = 0;
		const timer = setInterval(() => {
			if (idx == 0) Morphs.sort(() => Math.random() - 0.5);
			idx = (idx + 1) % 4;
			configuration = Morphs[idx].configuration;
			roundness = Morphs[idx].roundness;
		}, 1500);
		return () => clearInterval(timer);
	});
</script>

<div class="wrapper" data-roundness={roundness} data-configuration={configuration}>
	<div class="shape" />
	<div class="shape" />
	<div class="shape" />
	<div class="shape" />
	<div class="shape" />
	<div class="shape" />
	<div class="shape" />
</div>

<style>
	.wrapper {
		position: relative;
		width: 100%;
		aspect-ratio: 3/2;
	}
	.wrapper .shape {
		position: absolute;
		transition: all 680ms cubic-bezier(0.39, 0.575, 0.565, 1);
	}
	.wrapper .shape:nth-child(1) {
		background-color: #6f3dd4;
	}
	.wrapper .shape:nth-child(2) {
		background-color: #7b55da;
	}
	.wrapper .shape:nth-child(3) {
		background-color: #876ae0;
	}
	.wrapper .shape:nth-child(4) {
		background-color: #957de5;
	}
	.wrapper .shape:nth-child(5) {
		background-color: #a290ea;
	}
	.wrapper .shape:nth-child(6) {
		background-color: #b1a3ef;
	}
	.wrapper .shape:nth-child(7) {
		background-color: #c0b5f3;
	}

	.wrapper[data-configuration='1'] .shape:nth-child(3) {
		width: 12.5%;
		height: 25%;
		right: 0;
		bottom: 0;
	}
	.wrapper[data-configuration='1'] .shape:nth-child(2) {
		width: 25%;
		height: 50%;
		right: 0;
		bottom: 0;
	}
	.wrapper[data-configuration='1'] .shape:nth-child(1) {
		width: 50%;
		height: 100%;
		right: 0;
		bottom: 0;
	}
	.wrapper[data-configuration='1'] .shape:nth-child(4) {
		width: 20%;
		height: 50%;
		right: 50%;
		bottom: 0;
	}
	.wrapper[data-configuration='1'] .shape:nth-child(5) {
		width: 30%;
		height: 50%;
		right: 70%;
		bottom: 0;
	}
	.wrapper[data-configuration='1'] .shape:nth-child(6) {
		width: 30%;
		height: 50%;
		right: 50%;
		bottom: 50%;
	}
	.wrapper[data-configuration='1'] .shape:nth-child(7) {
		width: 20%;
		height: 50%;
		right: 80%;
		bottom: 50%;
	}

	/* config two */

	.wrapper[data-configuration='2'] .shape:nth-child(3) {
		width: 10%;
		height: 50%;
		right: 0;
		bottom: 0;
	}
	.wrapper[data-configuration='2'] .shape:nth-child(2) {
		width: 15%;
		height: 70%;
		right: 10%;
		bottom: 20%;
	}
	.wrapper[data-configuration='2'] .shape:nth-child(1) {
		width: 25%;
		height: 100%;
		right: 25%;
		bottom: 0;
	}
	.wrapper[data-configuration='2'] .shape:nth-child(4) {
		width: 10%;
		height: 35%;
		right: 50%;
		bottom: 35%;
	}
	.wrapper[data-configuration='2'] .shape:nth-child(5) {
		width: 15%;
		height: 70%;
		right: 60%;
		bottom: 0;
	}
	.wrapper[data-configuration='2'] .shape:nth-child(6) {
		width: 15%;
		height: 70%;
		right: 75%;
		bottom: 30%;
	}
	.wrapper[data-configuration='2'] .shape:nth-child(7) {
		width: 10%;
		height: 35%;
		right: 90%;
		bottom: 65%;
	}

	.wrapper[data-configuration='3'] .shape:nth-child(3) {
		width: 12.5%;
		right: 0;
		bottom: 0;
	}
	.wrapper[data-configuration='3'] .shape:nth-child(2) {
		width: 25%;
		right: 0;
		bottom: 0;
	}
	.wrapper[data-configuration='3'] .shape:nth-child(1) {
		width: 49%;
		right: 0;
		bottom: 0;
		z-index: -1;
	}
	.wrapper[data-configuration='3'] .shape:nth-child(4) {
		width: 12.5%;
		right: 38%;
		bottom: 15%;
	}
	.wrapper[data-configuration='3'] .shape:nth-child(5) {
		width: 25%;
		right: 50.5%;
		bottom: 0;
	}
	.wrapper[data-configuration='3'] .shape:nth-child(6) {
		width: 25%;
		right: 40%;
		bottom: 45.8%;
		z-index: -2;
	}
	.wrapper[data-configuration='3'] .shape:nth-child(7) {
		width: 12.5%;
		right: 64.4%;
		bottom: 47.5%;
	}

	.wrapper[data-roundness='1'] .shape {
		border-radius: 7rem;
	}
	/* roundness four */
	.wrapper[data-roundness='2'] .shape {
		border-radius: 50%;
		aspect-ratio: 1/1;
	}
	.wrapper[data-roundness='2'] {
		transform: translateX(-15%);
	}
	/* config three */
</style>
