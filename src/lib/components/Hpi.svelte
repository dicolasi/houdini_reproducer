<script lang="ts">
	import { onMount } from 'svelte';

	let hpiData: any = null;
	let error: string | null = null;
	let loading = true;

	async function fetchHpiData() {
		try {
			loading = true;
			const response = await fetch('/api/hpi');
			if (!response.ok) throw new Error('Failed to fetch HPI data');
			const data = await response.json();
			hpiData = data.uk_data_house_price_index[0];
		} catch (err) {
			console.error('Error:', err);
			error = err instanceof Error ? err.message : 'An unknown error occurred';
		} finally {
			loading = false;
		}
	}

	onMount(fetchHpiData);

	function reload() {
		fetchHpiData();
	}
</script>

{#if loading}
	<p>Loading HPI data...</p>
{:else if error}
	<p>Error: {error}</p>
{:else if hpiData}
	<p>Average Price: £{hpiData.averageprice.toLocaleString()}</p>
{:else}
	<p>No HPI data available</p>
{/if}

<button on:click={reload}>Reload Data</button>