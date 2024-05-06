<script lang="ts">
	import { page } from '$app/stores';
	import { showToast } from '$client/utils.client';
	import AsyncButton from '$components/button/asyncButton.svelte';
	import FormWrapper from '$components/other/formWrapper.svelte';
	import { imgHandler } from '$global/utils.global';
	import type { SubmitFunction } from '@sveltejs/kit';

	let state: 'idle' | 'loading' = 'idle';
	$: avatar = $page.data.avatar;

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

<FormWrapper action={changeAvatar} actionName="?/changeAvatar">
	<section class="input">
		<div class="info">
			<h3>Avatar</h3>
			<span>This is your avatar.<br />You can change it by clicking on it.</span>
		</div>
		<input
			type="file"
			id="avatarInput"
			name="avatar"
			accept="image/*"
			on:input={(e) => {
				imgHandler(e, (url) => (avatar = url));
			}}
		/>
		<label for="avatarInput">
			{#if avatar}
				<img src={avatar} alt="avatarImg" />
			{:else}
				<span />
			{/if}
		</label>
	</section>

	<svelte:fragment slot="submitter">
		<span class="description">Only images under or equal to 2.5mb are accepted.</span>
		<AsyncButton text="save" type="passive" {state} />
	</svelte:fragment>
</FormWrapper>

<style>
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
	.description {
		color: var(--mutedColor);
	}
</style>
