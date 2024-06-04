<script lang="ts">
	import AvatarForm from './components/avatarForm.svelte';
	import UsernameForm from './components/usernameForm.svelte';
	import IdCopy from './components/copyId.svelte';
	import DeleteForm from './components/deleteForm.svelte';
	import { Toaster } from 'svelte-sonner';
	import LogoutForm from './components/logoutForm.svelte';
	import AboutForm from './components/aboutForm.svelte';
</script>

<div class="profile">
	<AvatarForm />
	<UsernameForm />
	<AboutForm />
	<IdCopy />
	<LogoutForm />
	<DeleteForm />
</div>
<Toaster duration={3500} expand />

<style>
	.profile {
		width: 100%;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		padding-inline: 2.5%;
		padding-block: 30px;
		gap: 1.5rem;
	}
</style>
