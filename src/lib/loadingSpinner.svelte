<script lang="ts">
	import 'spinkit/spinkit.min.css';

	export let size: 'small' | undefined = undefined;
	export let isCentered = true;
</script>

<div class="sk-wander {size ?? ''}" class:sk-center={isCentered}>
	<div class="sk-wander-cube" />
	<div class="sk-wander-cube" />
</div>

<style lang="scss">
	.sk-wander-cube:nth-child(2) {
		animation-delay: -0.9s;
	}

	.small {
		--sk-size: 2.25rem;
		--wander-cube-size: 40%;
	}

	:global(.sk-wander-cube) {
		width: var(--wander-cube-size);
		height: var(--wander-cube-size);
	}
</style>
