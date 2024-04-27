<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import type { changeEvent } from '$client/types.client';
	import { showToast } from '$client/utils.client';
	import AsyncButton from '$components/button/asyncButton.svelte';
	import { checkType, checkSize } from '$global/utils.global';
	import type { SubmitFunction } from '@sveltejs/kit';

	let state: 'idle' | 'loading' = 'idle';
	$: avatar = $page.data.avatar;

	function handleChange(e: changeEvent<HTMLInputElement>) {
		const file = e.currentTarget.files?.[0];
		if (file && checkType('image/*', file.type) && checkSize(1200, file.size)) {
			avatar = URL.createObjectURL(file);
		}
	}

	const changeAvatar: SubmitFunction = async () => {
		state = 'loading';
		return ({ result, update }) => {
			if (result.type == 'failure') showToast('Error', result.data.message, 'danger');
			if (result.type == 'success') showToast('Success', 'We updated your avatar.', 'success');
			state = 'idle';
			update();
		};
	};
</script>

<form
	action="?/changeAvatar"
	method="post"
	class="avatar-form"
	enctype="multipart/form-data"
	use:enhance={changeAvatar}
>
	<section class="input">
		<div class="info">
			<h3>Avatar</h3>
			<span>This is your avatar.<br />You can change it by clicking on it.</span>
		</div>
		<input type="file" id="avatarInput" name="avatar" accept="image/*" on:input={handleChange} />
		<label for="avatarInput">
			{#if avatar}
				<img src={avatar} alt="avatarImg" />
			{:else}
				<span />
			{/if}
		</label>
	</section>
	<section class="submitter">
		<span>Only images under or equal to 1.2mb are accepted.</span>
		<AsyncButton text="save" type="passive" {state} />
	</section>
</form>

<style>
	.avatar-form {
		--mixed-light: color-mix(in srgb, var(--foregroundColor) 8%, transparent 92%);
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: var(--mixed-light);
		border: 1px solid var(--mutedColor);
		border-radius: var(--border-radius);
		overflow: hidden;
	}

	.input {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem;
	}

	.info {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.info h3,
	.info span {
		color: var(--foregroundColor);
	}

	.input input {
		display: none;
	}

	.input label {
		width: 76px;
		aspect-ratio: 1/1;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		overflow: hidden;
		cursor: pointer;
	}

	.input label img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}

	.input label span {
		width: 100%;
		height: 100%;
		background: radial-gradient(circle at center, var(--primaryColor), var(--foregroundColor));
	}

	.submitter {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-inline: 1rem;
		padding-block: 0.5rem;
		border-top: 1px solid var(--mutedColor);
	}

	.submitter span {
		color: var(--mutedColor);
	}
</style>
