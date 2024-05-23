<script lang="ts">
	import Avatar from '$components/other/avatar.svelte';
	import WritingBackground from '$components/other/background.svelte';
	import type { Contribution } from '$global/types.global';
	import type { User } from 'lucia';
	export let data: { info: User; contributions: Contribution[] };
	const myworks = data.contributions.filter((el) => el.role == 'owner');
	const contributions = data.contributions.filter((el) => el.role == 'writer');
</script>

<div class="author">
	<div class="bio">
		<Avatar avatar={data.info.avatar} />
		<div class="bio-identity">
			<h4>{data.info.username}</h4>
			<span>ID:{data.info.id}</span>
		</div>
	</div>
	<div class="about">
		<h3>About</h3>
		<p>{data.info.about}</p>
	</div>
	<div class="owned-writings">
		<h3>Owned writings</h3>
		<div class="writings-grid">
			{#each myworks as mywork}
				<a href="/reading/{mywork.writingId}" class="writing-link">
					<div class="writing-info">
						<h4>{mywork.writingName}</h4>
						<WritingBackground background={mywork.writingBackground} />
					</div>
				</a>
			{/each}
		</div>
	</div>
	<div class="contributions">
		<h3>Contributions</h3>
		<div class="writings-grid">
			{#each contributions as contribution}
				<a href="/reading/{contribution.writingId}" class="writing-link">
					<div class="writing-info">
						<h4>{contribution.writingName}</h4>
						<WritingBackground background={contribution.writingBackground} />
					</div>
				</a>
			{/each}
		</div>
	</div>
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
	.owned-writings,
	.contributions {
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

	.bio-identity {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.bio-identity :is(h4, span) {
		color: var(--foregroundColor);
	}

	.about p {
		color: var(--foregroundColor);
	}

	.writings-grid {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}

	.writing-link {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 0.5rem;
		border-radius: var(--border-radius);
		background-color: color-mix(in srgb, var(--foregroundColor) 8%, transparent 92%);
		border: 2px solid var(--foregroundColor);
	}

	.writing-link:hover {
		border-color: var(--primaryColor);
		box-shadow:
			2px 2px 2px var(--primaryColor),
			2px 2px 2px var(--primaryColor),
			2px 2px 2px var(--primaryColor);
	}

	.writing-info {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: var(--foregroundColor);
	}

	@media screen and (max-width: 764px) {
		.bio {
			--width: 5rem;
		}
		.writings-grid {
			grid-template-columns: 100%;
		}
	}
</style>
