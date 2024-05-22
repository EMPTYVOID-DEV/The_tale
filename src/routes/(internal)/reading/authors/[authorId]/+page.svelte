<script lang="ts">
	import Avatar from '$components/other/avatar.svelte';
	import type { Contribution } from '$global/types.global';
	import type { User } from 'lucia';

	export let data: { info: User; work: Contribution[] };
</script>

<div class="author">
	<section class="bio">
		<Avatar avatar={data.info.avatar} />
		<div class="identity">
			<h4>{data.info.username}</h4>
			<span>{data.info.id}</span>
		</div>
	</section>
	<section class="about">
		<h3>About</h3>
		<p>{data.info.about}</p>
	</section>
	<section class="work">
		<h3>Work</h3>
	</section>
</div>

<style>
	.author {
		width: 100%;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		padding-inline: 2.5%;
		padding-block: 30px;
		gap: 2rem;
	}

	.author h3 {
		color: var(--primaryColor);
	}

	.bio {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		--width: 8rem;
		--color: var(--primaryColor);
	}

	.identity {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	.identity :is(h4, span) {
		color: var(--foregroundColor);
	}
	.about {
		display: flex;
		flex-direction: column;
	}
	.about p {
		color: var(--foregroundColor);
	}

	@media screen and (width < 764px) {
		.bio {
			--width: 5rem;
		}
	}
</style>
