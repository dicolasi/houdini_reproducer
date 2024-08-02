<script lang="ts">
	import Hpi from '$lib/components/Hpi.svelte';
	import type { PageData } from '$houdini';
	import { onMount } from 'svelte';

	export let data: PageData;
	$: ({ UkData } = data);

	$: console.log('PageData updated:', data);

	onMount(() => {
		console.log('Page component mounted');
	});
</script>

<Hpi hpi={$UkData} />