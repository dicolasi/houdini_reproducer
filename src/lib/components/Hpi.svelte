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
</script>

<pre>Debug: {JSON.stringify({ hpiData: $hpiData }, null, 2)}</pre>

{#if $hpiData.uk_data_house_price_index && $hpiData.uk_data_house_price_index.length > 0}
	<ul>
		{#each $hpiData.uk_data_house_price_index as data}
			<li>Region: {data.regionname}</li>
			<li>Date: {data.date}</li>
			<li>Average Price: {data.averageprice}</li>
			<li>Detached Price: {data.detachedprice}</li>
		{/each}
	</ul>
{:else}
	<p>No data available</p>
{/if}
