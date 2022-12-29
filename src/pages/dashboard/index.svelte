<script lang="ts">
	import { url } from '@roxi/routify';
	import { ENVIRONMENT } from '$lib/environment';
	import { authHeaders } from '$lib/stores/auth';
	import LoadingSpinner from '$lib/loadingSpinner.svelte';
	import { EditIcon } from 'svelte-feather-icons';

	const fetchTrackedConnections = async (): Promise<
		Array<{
			destination_station: string;
			origin_station: string;
			hours: number;
			minutes: number;
			id: number;
		}>
	> => {
		const response = await fetch(`${ENVIRONMENT.API_PATH}/tracking/connections`, {
			headers: $authHeaders,
		});

		return await response.json();
	};
</script>

<div class="section-heading">
	<h3>Tracked Connections</h3>
	<a href={$url('./create')} class="no-default button">Add</a>
</div>

{#await fetchTrackedConnections()}
	<LoadingSpinner />
{:then connections}
	<div class="table">
		<div class="header">
			<div><span title="Origin">Origin</span></div>
			<div><span title="Destination">Destination</span></div>
			<div><span title="Departure">Departure</span></div>
			<div />
		</div>

		{#each connections as connection (connection.id)}
			<div class="row">
				<div><span title={connection.origin_station}>{connection.origin_station}</span></div>
				<div>
					<span title={connection.destination_station}>{connection.destination_station}</span>
				</div>
				<div class="allow-overflow" title="{connection.hours}:{connection.minutes}">
					{connection.hours}:{connection.minutes}
				</div>
				<div>
					<a class="no-default button icon" href={$url('./edit/:id', { id: connection.id })}
						><EditIcon /></a
					>
				</div>
			</div>
		{/each}
	</div>
{:catch e}
	<p>An error occurred while loading your tracked connections :(</p>
{/await}

<style lang="scss">
	@use 'sass:color';
	@use 'src/scss/colors';

	.section-heading {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		margin-bottom: 1rem;
	}

	.table {
		border-radius: 5px;

		@media (min-width: 640px) {
			background: color.adjust(colors.$bg-prim, $lightness: -1%);
			padding: 1rem;
		}

		.header,
		.row {
			display: grid;
			grid: auto / 2fr 2fr 1fr 2rem;
			gap: 1rem;
			border-bottom: 1px solid var(--bg-sec);

			& > * {
				display: flex;
				align-items: center;

				&:not(.allow-overflow) {
					overflow: hidden;

					span {
						overflow: hidden;
						text-overflow: ellipsis;
						display: inline-block;
					}
				}
			}
		}

		.header {
			font-weight: bold;
			padding-bottom: 0.5rem;
		}

		.row {
			padding-top: 0.5rem;
			padding-bottom: 0.5rem;
		}
	}
</style>
