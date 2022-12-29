<script lang="ts">
	import { goto, url } from '@roxi/routify';
	import { ENVIRONMENT } from '$lib/environment';
	import { authHeaders } from '$lib/stores/auth';
	import LoadingSpinner from '$lib/loadingSpinner.svelte';

	let originStation: string;
	let destinationStation: string;
	let departure: string;
	let hasError = false;
	let isLoading = false;
	$: hours = departure && Number.parseInt(departure.split(':')[0]);
	$: minutes = departure && Number.parseInt(departure.split(':')[1]);

	const onSubmit = async () => {
		isLoading = true;
		const response = await fetch(`${ENVIRONMENT.API_PATH}/tracking/connections`, {
			method: 'post',
			body: JSON.stringify({
				origin_station: originStation,
				destination_station: destinationStation,
				hours,
				minutes,
			}),
			headers: {
				...$authHeaders,
				'content-type': 'application/json',
			},
		});
		isLoading = false;

		if (response.status === 201) {
			$goto('../');
		} else {
			hasError = true;
		}
	};
</script>

<form on:submit|preventDefault={onSubmit}>
	<h3>Add Tracked Connection</h3>

	<div class="inputs">
		<label>
			Origin Station
			<input bind:value={originStation} required />
		</label>

		<label>
			Destination Station
			<input bind:value={destinationStation} required />
		</label>

		<label>
			Departure
			<input type="time" bind:value={departure} required />
		</label>
	</div>

	{#if hasError}
		<p class="error">An unknown error occurred</p>
	{/if}

	<div class="actions">
		<a class="no-default button cancel" href={$url('../')}>Go back</a>
		<button type="reset">Reset</button>
		{#if isLoading}
			<LoadingSpinner isCentered={false} size="small" />
		{:else}
			<button type="submit">Add</button>
		{/if}
	</div>
</form>

<style lang="scss">
	.error {
		margin-bottom: 1rem;
	}

	h3 {
		margin-bottom: 1rem;
	}

	.inputs {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		justify-content: space-evenly;
		margin-bottom: 1rem;
	}

	input {
		margin-left: 1rem;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		justify-content: center;
	}
</style>
