<script lang="ts">
	import { fragment, graphql, type Hpi } from '$houdini';

	export let hpi: Hpi;

	$: hpiData = fragment(hpi, graphql(`
    fragment Hpi on Query @arguments(countries: {type: "[String!]!"}) {
      uk_data_house_price_index (
        where: {regionname: {_in: $countries}},
        order_by: {date: desc},
        limit: 1
      ) {
        averageprice
        detachedprice
        date
        regionname
      }
    }
  `));

	$: console.log('hpiData updated:', $hpiData);
</script>

{#if $hpiData.fetching}
	<p>Loading data...</p>
{:else if $hpiData.error}
	<p>Error: {$hpiData.error.message}</p>
{:else if $hpiData.data?.uk_data_house_price_index && $hpiData.data.uk_data_house_price_index.length > 0}
	<ul>
		{#each $hpiData.data.uk_data_house_price_index as data}
			<li>Region: {data.regionname}</li>
			<li>Date: {data.date}</li>
			<li>Average Price: {data.averageprice}</li>
			<li>Detached Price: {data.detachedprice}</li>
		{/each}
	</ul>
{:else}
	<p>No data available</p>
{/if}