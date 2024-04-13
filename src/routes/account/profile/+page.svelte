<script lang="ts">
	import { Toaster } from 'svelte-sonner';
	import AvatarForm from './components/avatarForm.svelte';
</script>

<div class="profile">
	<AvatarForm />
</div>

<Toaster expand duration={3500} />

<style>
	.profile {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}
</style>
