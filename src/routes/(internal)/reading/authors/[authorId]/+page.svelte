<script lang="ts">
	import Avatar from '$components/other/avatar.svelte';
	import WritingBackground from '$components/other/background.svelte';
	import type { Contribution } from '$global/types.global';
	import type { User } from 'lucia';

	export let data: { info: User; contributions: Contribution[] };
</script>

<div class="author">
	<section class="bio">
		<Avatar avatar={data.info.avatar} />
		<div class="identity">
			<h4>{data.info.username}</h4>
			<span>ID:{data.info.id}</span>
		</div>
	</section>
	<section class="about">
		<h3>About</h3>
		<p>{data.info.about}</p>
	</section>
	<section class="work">
		<h3>Work</h3>
		<div class="contributions">
			{#each data.contributions as contribution}
				<a href="/reading/{contribution.writingId}" class="contribution">
					<div>
						<h4>{contribution.writingName}</h4>
						<WritingBackground background={contribution.writingBackground} />
					</div>
					<div>
						<span> <span class="context">Writing Time</span> is {contribution.writingTime}</span>
						<span><span class="context">Role</span> is {contribution.role}</span>
					</div>
				</a>
			{/each}
		</div>
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

	.bio,
	.about,
	.work {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.bio {
		align-items: center;
		--width: 8rem;
		--color: var(--primaryColor);
	}

	.bio .identity {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.bio .identity :is(h4, span) {
		color: var(--foregroundColor);
	}

	.about p {
		color: var(--foregroundColor);
	}

	.contributions {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}

	.contribution {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 0.5rem;
		border-radius: var(--border-radius);
		background-color: color-mix(in srgb, var(--foregroundColor) 8%, transparent 92%);
		border: 2px solid var(--foregroundColor);
	}

	.contribution:hover {
		border-color: var(--primaryColor);
		box-shadow:
			2px 2px 2px var(--primaryColor),
			2px 2px 2px var(--primaryColor),
			2px 2px 2px var(--primaryColor);
	}

	.contribution div {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: var(--foregroundColor);
	}

	.contribution .context {
		color: var(--primaryColor);
	}

	@media screen and (width < 764px) {
		.bio {
			--width: 5rem;
		}
		.contributions {
			grid-template-columns: 100%;
		}
	}
</style>
