<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import ShadowButton from '$components/button/shadowButton.svelte';
	$: isAuthenticated = $page.data.isAuthenticated as boolean;
</script>

<div class="home">
	<div class="wrapper">
		<h1>
			Craft Stunning Content Experiences with <span class="attention">The_tale</span>
		</h1>
		<p>
			Blogs, articles, docs or presentations? Tale's your go-to platform. Compose with a rich text
			editor, format with flair. Templates, navigation polished content anywhere.
		</p>
		<div class="actions">
			<ShadowButton
				--padding-inline="1.75rem"
				--padding-block=".75rem"
				type="passive"
				text="start reading"
				on:click={() => {
					goto('/reading');
				}}
			/>
			<ShadowButton
				--padding-inline="1.75rem"
				--padding-block=".75rem"
				text={isAuthenticated ? 'continue writing' : 'start writing'}
				on:click={() => {
					if (isAuthenticated) goto('/mywritings');
					else goto('/auth');
				}}
			/>
		</div>
	</div>
</div>

<style>
	.home {
		--intermediate-color: color-mix(in srgb, var(--backgroundColor) 80%, var(--primaryColor) 20%);
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

	.wrapper h1 .attention {
		font-size: var(--h1);
		font-family: var(--headerFont);
		color: var(--primaryColor);
	}

	.wrapper p {
		color: var(--mutedColor);
		font-weight: bold;
		text-align: center;
		line-height: 1.8;
	}

	.actions {
		display: flex;
		gap: 1.5rem;
	}

	@media screen and (width<768px) {
		.wrapper {
			width: 90%;
		}
	}
</style>
