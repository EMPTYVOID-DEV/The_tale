<script lang="ts">
	import { Html, Heading, Text, Section } from 'svelte-email';
	export let code: string;
</script>

<Html lang="en">
	<Section
		class="email"
		style="display: flex; flex-direction: column; gap: 1rem; width: 100%; height: 100%;"
	>
		<Section
			class="header"
			style="display: flex;flex-direction: column; gap: 0.5rem; align-self: center;"
		>
			<Heading as="h1">QuickLink Real time communication</Heading>
		</Section>
		<Section class="description" style="display: flex;flex-direction: column; gap: 0.75rem;">
			<Heading as="h3">Verification email</Heading>
			<Text>
				We are thrilled to extend our warmest welcome to you as you embark on your journey with
				QuickLink. Before using our service, we kindly ask for your assistance in verifying your
				account. Simply copy the provided code and seamlessly paste it into the verification form
				provided.
			</Text>
		</Section>
		<Heading class="code" as="h3">This code will expire in 10 mins</Heading>
		<Heading class="code" as="h3">
			{code}
		</Heading>
	</Section>
</Html>
