import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { HPIStore } from '$houdini';

export const GET: RequestHandler = async (event) => {
	try {
		// Instantiate the store
		const store = new HPIStore();

		// Fetch the data
		const result = await store.fetch({ event });

		console.log('Fetch result:', JSON.stringify(result, null, 2));
		console.log('Store state after fetch:', JSON.stringify(store, null, 2));

		// Check if the data is available in the result
		if (result.data) {
			return json(result.data);
		} else if (result.errors) {
			console.error('GraphQL errors:', result.errors);
			return json({ error: 'GraphQL query execution failed' }, { status: 500 });
		} else {
			return json({ error: 'No data available' }, { status: 404 });
		}
	} catch (error) {
		console.error('Error fetching HPI data:', error);
		return json({ error: 'Failed to fetch HPI data' }, { status: 500 });
	}
};