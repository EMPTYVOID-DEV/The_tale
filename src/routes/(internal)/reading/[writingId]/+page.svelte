<script lang="ts">
	import Background from '$components/other/background.svelte';
	import Reference from '$components/reference/reference.svelte';
	import Avatar from '$components/other/avatar.svelte';
	import LinkIcon from '$icons/linkIcon.svelte';

	export let data;
	let owner = data.contributors.find((el) => el.id == data.info.ownerId);
	let writers = data.contributors.filter((el) => el.id != data.info.ownerId);
</script>

<div class="reading">
	<div class="wrapper">
		<Background
			background={data.info.background}
			--width="100%"
			--ration="3/1"
			--radius="var(--border-radius)"
		/>
		<a href="/external/{data.info.id}/{data.info.rootSection.name}" class="name">
			<h1>{data.info.name}</h1>
			<LinkIcon />
		</a>
		<section class="extra-info">
			<div>
				<h4>Owner</h4>
				<a class="user" href="/reading/authors/{owner.id}">
					<Avatar avatar={owner.avatar} />
					<span class="owner">{owner.username}</span>
				</a>
			</div>
			<div>
				<h4>Created at</h4>
				<span>{data.info.creationDate}</span>
			</div>
		</section>
		<section class="layer">
			<h3>Description</h3>
			{#if data.info.description.length === 0}
				<span>No description is provided by the author</span>
			{:else}
				<span>{data.info.description}</span>
			{/if}
		</section>
		<section class="layer">
			<h3>References</h3>
			<Reference referenceList={data.references} />
		</section>
		<section class="layer">
			<h3>Writers</h3>
			<div class="contributors">
				{#each writers as writer}
					<a class="user" href="/reading/authors/{writer.id}">
						<Avatar avatar={writer.avatar} />
						<span>{writer.username}</span>
					</a>
				{/each}
			</div>
		</section>
	</div>
</div>

<style>
	.reading {
		width: 100%;
		display: flex;
		justify-content: center;
		padding: 60px 2.5%;
		flex-grow: 1;
	}

	.wrapper {
		width: 80%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.name {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		color: var(--primaryColor);
	}

	.extra-info {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.extra-info div {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.extra-info div h4:first-child {
		color: var(--primaryColor);
		font-weight: 600;
	}

	.layer {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.user {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.contributors {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	:is(.extra-info, .layer) :is(p, h3, span) {
		color: var(--foregroundColor);
	}

	@media screen and (max-width: 764px) {
		.wrapper {
			width: 100%;
		}
	}
</style>
