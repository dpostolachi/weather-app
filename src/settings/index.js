export const {
    NODE_SERVER_ENABLED = false,
} = process.env

const SEARCH = '/api/location/search/'
const NODE_SEARCH = '/api/search'

const LOCATION = ( id, date ) =>
    `/api/location/${ id }/${ date.getFullYear() }/${ date.getMonth() + 1 }/${ date.getDate() }/`
// node BE location, sending as  ISO 8601 will preserve Timezone
const NODE_LOCATION = ( id, date ) =>
    `/api/location/${ id }?date=${ date.toISOString() }`

export const URLS = {
    Search: NODE_SERVER_ENABLED ? NODE_SEARCH
        : SEARCH,
    Location: NODE_SERVER_ENABLED ? NODE_LOCATION
        : LOCATION
}