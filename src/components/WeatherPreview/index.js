import { createElement, createEvent } from 'src/utils/dom'
import { getWeather } from 'src/utils/weather'
import css from './style'

export default class WeatherPreview extends HTMLElement {

    shadow = this.attachShadow( { mode: 'open' } )
    container = createElement( 'div', {
        class: 'container'
    } )
    locationTitle = createElement( 'h1', {
        class: 'location-title'
    } )
    dateContainer = createElement( 'div', {
        class: 'date-container',
    } )
    date = createElement( 'span', {
        class: 'date'
    } )
    datePicker = createElement( 'ui5-datepicker' )
    openDatePickerBtn = createElement( 'button', {
        class: 'date-button'
    } )
    temperature = createElement( 'weather-preview-box', {
        fieldname: '°C'
    } )
    weatherCondition = createElement( 'weather-preview-box', {
        fieldname: ''
    } )
    windDirection = createElement( 'weather-preview-box', {
        fieldname: ''
    } )

    style = createElement( 'style' )

    static get observedAttributes() {
        return [ 'location-title', 'location-id', 'date' ]
    }

    constructor() {
        super()
        this.mountElements()
    }

    mountElements() {
        this.style.textContent = css
        this.shadow.appendChild( this.style )

        const boxes = createElement( 'div', {
            class: 'weather-boxes'
        } )
        boxes.appendChild( this.temperature )
        boxes.appendChild( this.weatherCondition )
        boxes.appendChild( this.windDirection )

        this.container.appendChild( this.locationTitle )
        this.dateContainer.appendChild( this.date )
        this.dateContainer.appendChild( this.datePicker )
        this.dateContainer.appendChild( this.openDatePickerBtn )
        this.openDatePickerBtn.addEventListener( 'click', this.handleDateBtnClick )
        this.container.appendChild( this.dateContainer )
        this.container.appendChild( boxes )

        this.shadow.appendChild( this.container )

        this.datePicker.addEventListener( 'change', this.handleDateChange )
    }

    loading() {
        this.container.setAttribute( 'aria-busy', true )
        this.temperature.removeAttribute( 'fieldvalue', '' )
        this.weatherCondition.setAttribute( 'fieldname', '' )
        this.weatherCondition.removeAttribute( 'icon', '' )
        this.windDirection.setAttribute( 'fieldname', '' )
        this.windDirection.removeAttribute( 'direction' )
    }

    loaded() {
        this.container.setAttribute( 'aria-busy', false )
    }

    updateCityWeather() {
        const id = this.getAttribute( 'location-id' )
        const date = this.getAttribute( 'date' )

        if ( id && date ) {
            this.loading()
            getWeather( id, new Date( date ) )
                .then( ( {
                    temp,
                    condition,
                    icon,
                    windDirection,
                } ) => {
                    this.temperature.setAttribute( 'fieldvalue', temp )
                    this.weatherCondition.setAttribute( 'fieldname', condition )
                    this.weatherCondition.setAttribute( 'icon', icon )
                    this.windDirection.setAttribute( 'fieldname', windDirection )
                    this.windDirection.setAttribute( 'direction', windDirection )
                    this.loaded()
                } )
                .catch( error => {
                    this.loaded()
                    this.dispatchEvent(
                        createEvent( 'display:error', {
                            error
                        } )
                    )
                } )
        }
    }

    handleDateChange = ( { detail: { value } } ) => {
        this.dispatchEvent(
            createEvent( 'change:date', {
                date: new Date( value )
            } )
        )
    }

    handleDateBtnClick = () => {
        this.datePicker.openPicker( {
            focusInput: false,
        } )
    }

    updateDate( newDate ) {
        this.date.textContent = new Date( newDate )
            .toLocaleDateString( 'default', {
                day: 'numeric',
                month: 'short',
            } )
    }

    attributeChangedCallback( name, _oldValue, newValue ) {
        switch( name ) {
            case 'location-id':
                this.updateCityWeather()
            break
            case 'location-title':
                this.locationTitle.textContent = newValue
            break
            case 'date':
                this.updateDate( newValue )
                this.updateCityWeather()
            break
        }
    }

}