import type { UkDataVariables } from '$houdini/types/src/routes/$houdini';

export function _houdini_afterLoad({event}) {
	return event.data;
}

export function _houdini_onError(error: any) {
	console.error('GraphQL Error:', error);
	console.error('Error details:', JSON.stringify(error, null, 2));
}

export const _UkDataVariables: UkDataVariables = () => {
	return {
		countries: ["England", "Wales", "Scotland"]
	}
}
