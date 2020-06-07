import Weather from './Wheater'
import WeatherPreview from './WeatherPreview'
import WeatherBox from './WeatherPreview/Box'
import LocationList from './LocationList'
import LocationListItem from './LocationList/ListItem'
import AddLocation from './LocationList/AddLocation'

customElements.define( 'weather-app', Weather )
customElements.define( 'weather-preview', WeatherPreview )
customElements.define( 'weather-preview-box', WeatherBox )
customElements.define( 'location-list', LocationList )
customElements.define( 'location-list-item', LocationListItem )
customElements.define( 'add-location', AddLocation )