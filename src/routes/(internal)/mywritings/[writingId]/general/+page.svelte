<script>
	import NameForm from './components/nameForm.svelte';
	import { Toaster } from 'svelte-sonner';
</script>

<div class="general">
	<NameForm />
</div>

<Toaster duration={3500} expand />

<style>
	.general {
		width: 100%;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}
</style>
