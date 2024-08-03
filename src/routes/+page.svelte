<script lang="ts">
	import Hpi from '$lib/components/Hpi.svelte';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: ({ UkData } = data);
</script>

<Hpi hpi={$UkData.data} country="England"/>
