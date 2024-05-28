<script>
	import QuoteIcon from '$icons/quoteIcon.svelte';
	import { getContext } from 'svelte';
	const componentMap = getContext('componentMap');
	const CloseQuoteIcon = componentMap.get('closeQuoteIcon');
	const OpenQuoteIcon = componentMap.get('openQuoteIcon');
	export let text;
	export let owner;
</script>

<div class="quote">
	<QuoteIcon />
	<h4 class="quoteContent">{text}</h4>
	<QuoteIcon />
	<span class="quoteOwner">{owner}</span>
</div>

<style>
	.quote {
		width: 100%;
		display: flex;
		color: var(--textColor);
	}
	.quoteOwner {
		color: var(--primaryColor);
		text-transform: capitalize;
		font-weight: 600;
	}
	.quoteContent {
		font-style: italic;
	}
</style>
