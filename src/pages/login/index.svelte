<script lang="ts">
	import { ENVIRONMENT } from '$lib/environment';
	import { goto } from '@roxi/routify';
	import { storage } from '$lib/stores/storage';
	import { isLoggedIn } from '$lib/stores/user';
	import LoadingSpinner from '$lib/loadingSpinner.svelte';

	let form: HTMLFormElement;
	let isInvalid = false;
	let isLoading = false;

	$: if ($isLoggedIn) $goto('/');

	const onSubmit = async () => {
		isLoading = true;
		const response = await fetch(`${ENVIRONMENT.API_PATH}/authentication/token`, {
			method: 'post',
			body: new FormData(form),
		});

		if (response.status === 401) {
			isInvalid = true;
		} else {
			storage.merge({ jwt: (await response.json()).access_token });
			$goto('/');
		}
		isLoading = false;
	};
</script>

<h2>Login</h2>

<form on:submit|preventDefault={onSubmit} bind:this={form}>
	<div class="inputs">
		<label>
			Username
			<input name="username" required minlength="3" />
		</label>

		<label>
			Password
			<input name="password" type="password" required />
		</label>
	</div>

	{#if isInvalid}
		<p class="error">Invalid username or password</p>
	{/if}

	{#if isLoading}
		<LoadingSpinner size="small" />
	{:else}
		<button type="submit">Submit</button>
	{/if}
</form>

<style lang="scss">
	.error {
		margin-top: 1rem;
	}

	h2 {
		text-align: center;
		margin-bottom: 1rem;
	}

	.inputs {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-evenly;
		gap: 1rem;
	}

	input {
		margin-left: 1rem;
	}

	button {
		display: block !important;
		margin: 1rem auto 0;
	}
</style>
