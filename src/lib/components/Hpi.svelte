<script lang="ts">
	import { fragment, graphql, type Hpi, type Hpi$data } from '$houdini';
	import { Chart, Card, Button, Dropdown, DropdownItem, Span, Tooltip, Tabs, TabItem } from 'flowbite-svelte';
	import {
		ChevronDownOutline,
		ArrowUpOutline,
		ArrowDownOutline,
		InfoCircleSolid
	} from 'flowbite-svelte-icons';

	export let hpi: Hpi;
	export let country: string;

	type HpiDataItem = Hpi$data['uk_data_house_price_index'][0];

	$: hpiData = fragment(hpi, graphql(`
    fragment Hpi on query_root @arguments(countries: {type: "[String!]!"}) {
      uk_data_house_price_index (
        where: {regionname: {_in: $countries}},
        order_by: {date: desc},
      ) {
       averageprice
				detachedprice
				semidetachedprice
				terracedprice
				flatprice
				ftbprice
				fooprice
				cashprice
				mortgageprice
				salesvolume
				cashsalesvolume
				mortgagesalesvolume
				newprice
				oldprice
				date
				regionname
				twelvemonthpercentchange
       }
    }
  `));

	$: allData = ($hpiData.uk_data_house_price_index || [])
		.filter(d => d.regionname === country)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	$: latestDataDate = allData[0]?.date ? new Date(allData[0].date) : new Date();

	$: stats = filterDataByTimeRange(allData, timeRange);

	const categories: { id: string, name: string, metrics: (keyof HpiDataItem)[] }[] = [
		{
			id: 'property_type',
			name: 'Property Type',
			metrics: ['averageprice', 'detachedprice', 'semidetachedprice', 'terracedprice', 'flatprice']
		},
		{ id: 'buyer', name: 'Buyer Status', metrics: ['ftbprice', 'fooprice'] },
		{ id: 'funding', name: 'Funding Status', metrics: ['cashprice', 'mortgageprice'] },
		{ id: 'volume', name: 'Sales Volume', metrics: ['salesvolume', 'cashsalesvolume', 'mortgagesalesvolume'] },
		{ id: 'property_status', name: 'Property Status', metrics: ['newprice', 'oldprice'] }
	];

	let selectedMetrics: (keyof HpiDataItem)[] = ['averageprice'];
	let timeRange: string = '1 year';
	let activeTab = categories[0].id;

	function filterDataByTimeRange(data: HpiDataItem[], range: string): HpiDataItem[] {
		const endDate = latestDataDate;
		let startDate: Date;

		switch (range) {
			case '1 year':
				startDate = new Date(endDate);
				startDate.setFullYear(startDate.getFullYear() - 1);
				break;
			case '3 years':
				startDate = new Date(endDate);
				startDate.setFullYear(startDate.getFullYear() - 3);
				break;
			case '5 years':
				startDate = new Date(endDate);
				startDate.setFullYear(startDate.getFullYear() - 5);
				break;
			case '10 years':
				startDate = new Date(endDate);
				startDate.setFullYear(startDate.getFullYear() - 10);
				break;
			default:
				startDate = new Date(0); // Show all data
		}

		return data.filter(d => new Date(d.date) >= startDate && new Date(d.date) <= endDate);
	}

	function getChartSeries(metrics: (keyof HpiDataItem)[]): {
		name: string,
		data: (number | null)[],
		color: string,
		showInLegend?: boolean
	}[] {
		const colors = ['#1A56DB', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#6366F1'];
		const series = metrics.map((metric, index) => ({
			name: getMetricDisplayName(metric),
			data: stats.map(d => d[metric] as number | null),
			color: colors[index % colors.length]
		}));

		if (series.length === 1) {
			series.push({
				name: 'Hidden',
				data: Array(stats.length).fill(null),
				color: 'transparent',
				showInLegend: false
			});
		}
		return series;
	}

	function getMetricDisplayName(metric: keyof HpiDataItem): string {
		const specialCases: { [key in keyof HpiDataItem]?: string } = {
			'ftbprice': 'First-time Buyers Price',
			'fooprice': 'Former Owner-occupiers Price'
		};

		if (metric in specialCases) {
			return specialCases[metric] || metric;
		}

		return metric.charAt(0).toUpperCase() + metric.slice(1).replace('price', ' Price').replace('volume', ' Volume');
	}

	$: options = {
		chart: {
			height: 400,
			type: 'line',
			fontFamily: 'Inter, sans-serif',
			toolbar: {
				show: true
			}
		},
		colors: ['#1A56DB', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#6366F1'],
		dataLabels: { enabled: false },
		stroke: {
			width: 6,
			curve: 'smooth'
		},
		grid: {
			show: true,
			strokeDashArray: 4,
			padding: {
				left: 2,
				right: 2,
				top: 0
			}
		},
		xaxis: {
			type: 'datetime',
			categories: stats.map(d => new Date(d.date).getTime()),
			labels: {
				formatter: function(value: string, timestamp: number) {
					return new Date(timestamp).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
				}
			},
			axisBorder: { show: true },
			axisTicks: { show: true }
		},
		yaxis: [
			{
				title: { text: 'Price (£)' },
				labels: {
					formatter: (value: number) => '£' + (value / 1000).toFixed(0) + 'k'
				}
			},
			{
				title: { text: 'Volume' },
				opposite: true,
				show: selectedMetrics.some(m => m.includes('volume')),
				labels: {
					formatter: (value: number) => value.toLocaleString()
				}
			}
		],
		tooltip: {
			shared: true,
			intersect: false,
			x: {
				formatter: function(val: number) {
					return new Date(val).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
				}
			},
			y: {
				formatter: (value: number | null, { seriesIndex, dataPointIndex, w }: {
					seriesIndex: number,
					dataPointIndex: number,
					w: any
				}) => {
					const metric = w.config.series[seriesIndex].name.toLowerCase().replace(' ', '');
					if (metric === 'hidden') return '';
					if (value === null) return 'N/A';
					return metric.includes('volume') ?
						value.toLocaleString() :
						`£${value.toLocaleString()}`;
				}
			}
		},
		legend: {
			show: true,
			position: 'bottom',
			onItemClick: {
				toggleDataSeries: true
			},
			formatter: function(seriesName: string, opts: any) {
				return seriesName !== 'Hidden' ? seriesName : '';
			}
		},
		noData: {
			text: 'No data to display',
			align: 'center',
			verticalAlign: 'middle',
			offsetX: 0,
			offsetY: 0,
			style: {
				color: '#6B7280',
				fontSize: '14px',
				fontFamily: 'Inter, sans-serif'
			}
		},
		series: getChartSeries(selectedMetrics)
	};

	$: latestData = stats[0] || null;

	function toggleMetric(metric: keyof HpiDataItem): void {
		if (selectedMetrics.includes(metric)) {
			selectedMetrics = selectedMetrics.filter(m => m !== metric);
		} else {
			selectedMetrics = [...selectedMetrics, metric];
		}
		if (selectedMetrics.length === 0) {
			selectedMetrics = ['averageprice'];
		}
		selectedMetrics = [...selectedMetrics]; // Trigger reactivity
	}

	function updateTimeRange(range: string): void {
		timeRange = range;
		stats = filterDataByTimeRange(allData, range);
	}

	$: calculatePriceChange = (): string => {
		if (!latestData || latestData.twelvemonthpercentchange == null) return 'N/A';
		return `${latestData.twelvemonthpercentchange.toFixed(1)}%`;
	};

	$: priceChange = calculatePriceChange();
	$: isPriceChangePositive = priceChange !== 'N/A' && !priceChange.startsWith('-');
	$: latestDataDateFormatted = latestData?.date ? new Date(latestData.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A';
</script>

<Card class="w-full max-w-4xl mx-auto">
	<div class="flex justify-between mb-4">
		<div class="relative">
			<h5 class="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
				{#if latestData?.averageprice != null}
					£{latestData.averageprice.toLocaleString()}
				{:else}
					N/A
				{/if}
			</h5>
			<p class="text-base font-normal text-gray-500 dark:text-gray-400">
				Average price in {country}
				<span class="inline-block align-middle">
					<InfoCircleSolid class="w-4 h-4 text-gray-400 hover:text-gray-500 cursor-pointer" />
				  <Tooltip placement="bottom-start">This value is for the latest data point ({latestDataDateFormatted}) in the selected time range.</Tooltip>
				</span>
			</p>
		</div>
		<div class="flex flex-col items-end">
			<div
				class="flex items-center px-2.5 py-0.5 text-2xl font-semibold text-{isPriceChangePositive ? 'green' : 'red'}-500 dark:text-{isPriceChangePositive ? 'green' : 'red'}-500 text-center">
				{#if isPriceChangePositive}
					<ArrowUpOutline class="w-6 h-6 mr-1" />
				{:else}
					<ArrowDownOutline class="w-6 h-6 mr-1" />
				{/if}
				<Span>{priceChange}</Span>
			</div>
			<p class="text-sm font-normal text-gray-500 dark:text-gray-400">
				Year on Year change
				<span class="inline-block align-middle">
					<InfoCircleSolid class="w-4 h-4 text-gray-400 hover:text-gray-500 cursor-pointer" />
					<Tooltip placement="bottom-start">This change is calculated for the latest data point ({latestDataDateFormatted}) in the selected time range.</Tooltip>
				</span>
			</p>
		</div>
	</div>

	<div class="mb-4">
		<Tabs style="underline" class="overflow-x-auto">
			{#each categories as category}
				<TabItem open={activeTab === category.id} on:click={() => activeTab = category.id}>
					<span slot="title">{category.name}</span>
					<div class="flex flex-wrap gap-2 mt-2">
						{#each category.metrics as metric}
							<Button
								color={selectedMetrics.includes(metric) ? 'blue' : 'light'}
								size="xs"
								class="transition-colors duration-200 ease-in-out hover:bg-blue-100"
								on:click={() => toggleMetric(metric)}
							>
								{getMetricDisplayName(metric)}
							</Button>
						{/each}
					</div>
				</TabItem>
			{/each}
		</Tabs>
	</div>

	<Chart {options} />

	<div class="flex justify-between items-center pt-5">
		<Button
			class="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent focus:ring-transparent dark:focus:ring-transparent py-0">
			{timeRange}
			<ChevronDownOutline class="w-2.5 m-2.5 ms-1.5" />
		</Button>
		<Dropdown class="w-40" offset="-6">
			<DropdownItem on:click={() => updateTimeRange('1 year')}>1 year</DropdownItem>
			<DropdownItem on:click={() => updateTimeRange('3 years')}>3 years</DropdownItem>
			<DropdownItem on:click={() => updateTimeRange('5 years')}>5 years</DropdownItem>
			<DropdownItem on:click={() => updateTimeRange('10 years')}>10 years</DropdownItem>
			<DropdownItem on:click={() => updateTimeRange('All time')}>All time</DropdownItem>
		</Dropdown>
	</div>
</Card>