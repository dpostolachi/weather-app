const GeoLocationSupported = 'geolocation' in navigator

export const getGeoLocation = () =>
    new Promise( ( resolve, reject ) => {
        if ( GeoLocationSupported ) {
            navigator.geolocation.getCurrentPosition(
                ( { coords: { latitude: lat, longitude: lng } } ) =>
                    resolve( {
                        lat,
                        lng,
                    } ),
                ( error ) =>
                    reject(
                        error.code === error.PERMISSION_DENIED ? 'Please allow geolocation'
                            : 'Failed to retreive your current position'
                    )
            )
        } else {
            reject( 'Geolocation not supported.' )
        }
    } )