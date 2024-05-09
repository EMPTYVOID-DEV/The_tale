<script>
	import { Toaster } from 'svelte-sonner';
	import TemplateForm from './components/templateForm.svelte';
	import LogoForm from './components/logoForm.svelte';
	import FontForm from './components/fontForm.svelte';
</script>

<div class="template">
	<TemplateForm />
	<LogoForm />
	<FontForm />
</div>

<Toaster duration={3500} expand />

<style>
	.template {
		width: 100%;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		padding-bottom: 30px;
	}
</style>
