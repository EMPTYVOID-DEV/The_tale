<script lang="ts">
	import { page } from '$app/stores';
	import { AvatarBeam, AvatarMarble, AvatarPixel } from 'svelte-boring-avatars';
	export let active = false;
	const randomAvatar = Math.floor(Math.random() * 3);
	const avatarsList = [AvatarBeam, AvatarMarble, AvatarPixel];
	$: username = $page.data.username;
	$: avatar = $page.data.avatar;
</script>

<!-- svelte-ignore missing-declaration -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="avatar" on:click>
	<div class="wrapper" class:active>
		{#if avatar}
			<img src={avatar} alt="avatar" />
		{:else}
			<svelte:component
				this={avatarsList[randomAvatar]}
				size={38}
				name={username}
				colors={['#9a25d0', '#e5dee7']}
			/>
		{/if}
	</div>
	<span>{username}</span>
</div>

<style>
	.avatar {
		display: flex;
		align-items: center;
		gap: 1rem;
		cursor: pointer;
	}

	.wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 42px;
		height: 42px;
		padding: 2px;
	}

	.wrapper img {
		width: 38px;
		height: 38px;
		border-radius: 50%;
		object-fit: cover;
		object-position: center;
	}

	.wrapper.active {
		border-radius: 50%;
		border: 3px solid var(--primaryColor);
	}

	.avatar span {
		display: none;
	}

	@media screen and (width<768px) {
		.avatar span {
			display: inline-block;
			color: var(--foregroundColor);
		}
	}
</style>
