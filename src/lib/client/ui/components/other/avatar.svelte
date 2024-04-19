<script lang="ts">
	import { page } from '$app/stores';
	export let active = false;
	$: username = $page.data.username;
	$: avatar = $page.data.avatar;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="avatar" class:active on:click>
	<div class="wrapper">
		{#if avatar}
			<img src={avatar} alt="avatar" />
		{:else}
			<span class="default" />
		{/if}
	</div>
	<span>{username}</span>
</div>

<style>
	.avatar {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		cursor: pointer;
	}
	.avatar span {
		font-size: var(--small);
		color: var(--foregroundColor);
		font-weight: bold;
	}
	.wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 42px;
		height: 42px;
		padding: 2px;
		border-radius: 50%;
	}

	.wrapper img {
		width: 38px;
		aspect-ratio: 1/1;
		border-radius: 50%;
		object-fit: cover;
		object-position: center;
	}

	.wrapper .default {
		width: 38px;
		aspect-ratio: 1/1;
		border-radius: 50%;
		background: radial-gradient(circle at center, var(--primaryColor), var(--foregroundColor));
	}

	.active span {
		color: var(--primaryColor);
	}

	.active .wrapper {
		border: 3px solid var(--primaryColor);
	}
</style>
