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
			<Heading as="h1" style="color:#9a25d0;">QuickLink Real time communication</Heading>
		</Section>
		<Section class="description" style="display: flex;flex-direction: column; gap: 0.75rem;">
			<Heading as="h3" style="color:#0f0811;">Verification email</Heading>
			<Text style="color: #0f0811;">
				We are thrilled to extend our warmest welcome to you as you embark on your journey with
				QuickLink. Before using our service, we kindly ask for your assistance in verifying your
				account. Simply copy the provided code and seamlessly paste it into the verification form
				provided.
			</Text>
		</Section>
		<Heading class="code" as="h3" style="color:#9a25d0;">
			{code}
		</Heading>
	</Section>
</Html>
