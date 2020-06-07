import css from './Wheater.style'
import { createElement } from 'src/utils/dom'
import { getCurrentCity } from 'src/utils/weather'

export default class Wheater extends HTMLElement {

    // current selected date
    date = new Date()
    // current selected city
    selectedCity = null    

    shadow = this.attachShadow( { mode: 'open' } )
    container = createElement( 'div', {
        class: 'container'
    } )
    style = createElement( 'style' )
    cityPreview = createElement( 'weather-preview', {
        date: this.date,
    } )
    cityList = createElement( 'location-list')
    errorBlock = createElement( 'div', {
        class: 'error-block'
    } )

    constructor() {
        super()
        this.mountElements()
        this.loading()
    }

    mountElements() {
        this.style.textContent = css

        this.container.appendChild( this.cityPreview )
        this.container.appendChild( this.cityList )
        this.container.appendChild( this.errorBlock )

        this.shadow.appendChild( this.container )
        this.shadow.appendChild( this.style )

        this.addEventListener( 'select:location', this.handleLocationChange )
        this.addEventListener( 'change:date', this.handleDateChange )
        this.addEventListener( 'display:error', this.handleDisplayError )
    }

    loading() {
        this.container.setAttribute( 'aria-busy', true )
    }

    loaded() {
        this.container.setAttribute( 'aria-busy', false )
    }

    handleLocationChange = ( { detail: { id, title } } ) => {
        this.updateCity( { id, title } )
    }

    handleDateChange = ( { detail: { date } } ) => {
        this.cityPreview.setAttribute( 'date', date )
    }

    handleDisplayError = ( { detail: { error } } ) => {
        this.displayError( error )
    }

    errorTimeout = null
    displayError = ( error ) => {
        this.loaded()
        clearTimeout( this.errorTimeout )
        this.errorBlock.textContent = error
        setTimeout( () => {
            this.errorBlock.textContent = ''
        }, 3000 )

    }

    updateCity( { id, title } ) {
        this.cityPreview.setAttribute( 'location-id', id )
        this.cityPreview.setAttribute( 'location-title', title )
        this.cityList.setAttribute( 'selected-location', id )
    }

    appendCityToList( { id, title } ) {
        this.cityList.appendCity( { id, title } )
    }

    connectedCallback() {
        getCurrentCity()
            .then( city => {
                this.loaded()
                this.appendCityToList( city )
                this.updateCity( city )
            } )
            .catch( this.displayError )
    }
}