<script>
	import CloseQuoteIcon from '$altron/icons/closeQuoteIcon.svelte';
	import OpenQuoteIcon from '$altron/icons/openQuoteIcon.svelte';
	export let text;
	export let owner;
</script>

<div class="quote">
	<OpenQuoteIcon />
	<h4 class="quoteContent">{text}</h4>
	<CloseQuoteIcon />
	<span class="quoteOwner">_{owner}</span>
</div>

<style>
	.quote {
		width: 100%;
		color: var(--textColor);
	}

	.quote * {
		display: inline;
	}

	.quoteOwner {
		font-weight: 600;
	}
	.quoteContent {
		font-style: italic;
	}
</style>
