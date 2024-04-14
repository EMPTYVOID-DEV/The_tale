<script lang="ts">
	import AvatarForm from './components/avatarForm.svelte';
	import UsernameForm from './components/usernameForm.svelte';
	import IdCopy from './components/idCopy.svelte';
	import DeleteForm from './components/deleteForm.svelte';
	import { Toaster } from 'svelte-sonner';
</script>

<div class="profile">
	<AvatarForm />
	<UsernameForm />
	<IdCopy />
	<DeleteForm />
</div>
<Toaster duration={3500} expand />

<style>
	.profile {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding-bottom: 30px;
		gap: 1.5rem;
	}
</style>
