/// <references types="houdini-svelte">

/** @type {import('houdini').ConfigFile} */
const config = {
    "watchSchema": {
        "url": "http://localhost:5173/api/graphql"
    },
    "plugins": {
        "houdini-svelte": {}
    },
    "scalars": {
        "Int": {
            "type": "number"
        },
        "Float": {
            "type": "number"
        },
        "String": {
            "type": "string"
        }
    }
}

export default config
