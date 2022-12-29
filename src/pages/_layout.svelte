<!-- routify:options preload="proximity" -->
<script lang="ts">
	import { goto, page, url } from '@roxi/routify';
	import { ENVIRONMENT } from '$lib/environment';
	import { isLoggedIn, user } from '$lib/stores/user';
	import { storage } from '$lib/stores/storage';
	import { authHeaders } from '$lib/stores/auth';
	import LoadingSpinner from '$lib/loadingSpinner.svelte';

	$: if (!$storage.jwt && !$page.path.startsWith('/login')) $goto('/login');
	$: if ($isLoggedIn && !$page.path.startsWith('/dashboard')) $goto('/dashboard');

	const fetchUser = async () => {
		const response = await fetch(`${ENVIRONMENT.API_PATH}/authentication/me`, {
			headers: $authHeaders,
		});
		if (response.status === 401) {
			$user = undefined;
			$storage.jwt = undefined;
		} else {
			$user = await response.json();
		}
	};

	$: if ($storage.jwt) fetchUser();
</script>

<header>
	<h1><a class="no-default" href={$url('/')}><span class="bahn-red">Bahn</span> Alaaaarm</a></h1>

	<div class="info">
		{#if $isLoggedIn}
			<button on:click={() => ($storage.jwt = $user = undefined)}>Logout</button>
		{/if}
	</div>
</header>

{#if !$user && !$page.path.startsWith('/login')}
	<LoadingSpinner />
{:else}
	<main>
		<slot />
	</main>
{/if}

<style lang="scss">
	@use 'src/scss/colors';

	.bahn-red {
		color: colors.$fg-ter;
	}
	header {
		padding: 1rem;
		margin-bottom: 1rem;
		border-bottom: 1px solid var(--bg-sec);
		display: flex;
		justify-content: space-between;
	}

	main {
		margin: 0 1rem 0;
	}

	a {
		text-decoration: none;
	}
</style>
