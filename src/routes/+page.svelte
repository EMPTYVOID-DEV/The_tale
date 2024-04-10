<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import ShadowButton from '$components/button/shadowButton.svelte';
	$: isAuthenticated = $page.data.isAuthenticated;
</script>

<div class="home">
	<div class="wrapper">
		<h1>The code documentation platform</h1>
		<p>
			Got docs to write? Our platform makes it a breeze. Streamlined documentation tools keep your
			package info clear and up-to-date with minimal hassle. Spend less time formatting, more time
			shipping great software.
		</p>
		<ShadowButton
			--padding-inline="1.75rem"
			--padding-block=".75rem"
			text={isAuthenticated ? 'Continue your journey' : 'Getting started'}
			on:click={() => {
				if (isAuthenticated) goto('/profile');
				else goto('/auth');
			}}
		/>
	</div>
</div>

<style>
	.home {
		--intermediate-color: color-mix(in srgb, var(--backgroundColor) 80%, var(--primaryColor) 20%);
		--mixed: color-mix(in srgb, var(--foregroundColor) 70%, var(--backgroundColor) 30%);
	}

	.home {
		width: 100%;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: linear-gradient(to bottom, var(--backgroundColor), var(--intermediate-color));
	}

	.wrapper {
		width: 70%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1.5rem;
	}

	.wrapper h1 {
		color: var(--foregroundColor);
		text-align: center;
	}

	.wrapper p {
		color: var(--mixed);
		font-weight: bold;
		text-align: center;
		line-height: 1.8;
	}

	@media screen and (width<768px) {
		.wrapper {
			width: 90%;
		}
	}
</style>
