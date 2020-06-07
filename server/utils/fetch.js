const fetch = require( 'node-fetch' )

const stringifyParams = ( params ) => {
    // in case of undefined, will just return 'undefined'
    return Object.entries( params )
        .filter( ( [ _, value ] ) => typeof value !== 'undefined' )
        .map( ( [ key, value ] ) => `${ key }=${ value }` )
        .join( '&' )

}

const makeRequest = ( method, url , queryParams ) => {
    // queryParams can be undefined
    url = queryParams ?  `${ url }?` +  stringifyParams( queryParams )
        : url
    return new Promise( ( resolve, reject ) => {
        // will resolve/reject based on this flag
        let ok = true

        return fetch( url, {
            method,
        } )
        .then( resp => {
            // in case of non 2XX status will reject 
            ok = resp.ok
            const isJson = ( resp.headers.get( 'Content-Type' ) || '' )
                .includes( 'application/json' )
            const resolver = isJson ? resp.json()
                : resp.text()
            return resolver
        } )
        .then( respData =>
            ok ? resolve( respData )
                : reject( respData )
        )
        // in case of an unexpected error
        .catch( e => reject( e ) )
    } )
}

const get = ( url, queryParams ) =>
    makeRequest( 'GET', url, queryParams )

module.exports = {
    get,
}