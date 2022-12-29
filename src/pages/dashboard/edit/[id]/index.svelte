<script lang="ts">
	import { goto, params, url } from '@roxi/routify';
	import { ENVIRONMENT } from '$lib/environment';
	import { authHeaders } from '$lib/stores/auth';
	import LoadingSpinner from '$lib/loadingSpinner.svelte';
	import { ArrowRightIcon } from 'svelte-feather-icons';

	let isDeleting = false;
	let hasDeletionErrors = false;

	const fetchConnection = async () => {
		const response = await fetch(`${ENVIRONMENT.API_PATH}/tracking/connections/${$params.id}`, {
			headers: $authHeaders,
		});

		if (response.status !== 200) {
			throw new Error('unknown error');
		}

		return await response.json();
	};

	const onDeleteConnection = async () => {
		isDeleting = true;
		const response = await fetch(`${ENVIRONMENT.API_PATH}/tracking/connections/${$params.id}`, {
			method: 'delete',
			headers: $authHeaders,
		});

		if (response.status !== 204) {
			hasDeletionErrors = true;
			isDeleting = false;
		} else {
			$goto('../../');
		}
	};
</script>

<div class="header">
	<h3>Edit tracked connection</h3>
	<a href={$url('../')} class="no-default button">Go back</a>
</div>

{#await fetchConnection()}
	<LoadingSpinner />
{:then connection}
	<div class="info">
		<div class="header">
			<div>Origin</div>
			<div />
			<div>Destination</div>
			<div>Departure</div>
		</div>

		<div class="body">
			<div>{connection.origin_station}</div>
			<div><ArrowRightIcon /></div>
			<div>{connection.destination_station}</div>
			<div>{connection.hours}:{connection.minutes}</div>
		</div>
	</div>

	<div class="action">
		<p>Delete this tracked connection</p>
		{#if isDeleting}
			<LoadingSpinner isCentered={false} size="small" />
		{:else}
			<button on:click={onDeleteConnection} class="cancel">Delete</button>
		{/if}
	</div>
{:catch error}
	<p class="error">An unknown error occurred</p>
{/await}

<style lang="scss">
	@use 'src/scss/colors';

	.action {
		display: flex;
		gap: 1rem;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		border-radius: 5px;
		border: 1px solid colors.$bg-cancel;
	}

	.header {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
	}

	.info {
		margin: 1rem 0;

		> * {
			display: grid;
			gap: 1rem;
			grid: auto / 3fr 1fr 3fr 2fr;

			> * {
				text-align: center;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}

		.header {
			font-weight: bold;
			padding-bottom: 0.5rem;
			border-bottom: 1px solid colors.$bg-sec;
		}

		.body {
			padding-top: 0.5rem;
		}
	}
</style>
