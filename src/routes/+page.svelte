<script lang="ts">
	import Hpi from '$lib/components/Hpi.svelte';
	import type { PageData } from '$houdini';

	export let data: PageData;
	$: ({ UkData } = data);

	$: console.log(UkData);
</script>

<Hpi hpi={$UkData} />