<script>
	import BackgroudForm from './components/backgroudForm.svelte';
	import DeleteForm from './components/deleteForm.svelte';
	import DescriptionForm from './components/descriptionForm.svelte';
	import NameForm from './components/nameForm.svelte';
	import { Toaster } from 'svelte-sonner';
</script>

<div class="general">
	<NameForm />
	<DescriptionForm />
	<BackgroudForm />
	<DeleteForm />
</div>

<Toaster duration={3500} expand />

<style>
	.general {
		width: 100%;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		padding-bottom: 30px;
	}
</style>
