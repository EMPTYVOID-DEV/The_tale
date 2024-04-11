<script lang="ts">
	import { Html, Heading, Text, Section } from 'svelte-email';
	export let code: string;
</script>

<Html lang="en">
	<Section style="display: flex; flex-direction: column; gap: 1rem; width: 100%; height: 100%;">
		<Section style="display: flex;flex-direction: column; gap: 0.5rem; align-self: center;">
			<Heading as="h1">CodeNest</Heading>
		</Section>
		<Section style="display: flex;flex-direction: column; gap: 0.75rem;">
			<Heading as="h3">Password reset</Heading>
			<Text>
				In order to reset your passoword we ask you kindly to simply type the provided code into the
				verification form provided.
			</Text>
		</Section>
		<Heading as="h3">This code will expire in 10 mins</Heading>
		<Heading as="h3">
			{code}
		</Heading>
	</Section>
</Html>
