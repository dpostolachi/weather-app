import css from './style'
import { createElement } from 'src/utils/dom'

export default class WeatherBox extends HTMLElement {

    shadow = this.attachShadow( { mode: 'open' } )
    container = createElement( 'div', {
        class: 'container'
    } )
    style = createElement( 'style' )
    
    fieldName = createElement( 'span', {
        class: 'fieldname'
    } )
    fieldValue = createElement( 'span', {
        class: 'fieldvalue'
    } )
    icon = createElement( 'img', {
        class: 'icon'
    } )
    windDirection = createElement( 'span', {
        class: 'wind-direction'
    } )

    static get observedAttributes() {
        return [ 'fieldname', 'fieldvalue', 'icon', 'direction' ]
    }

    constructor() {
        super()
        this.mountElements()
    }

    mountElements() {
        this.style.textContent = css
        this.container.appendChild( this.fieldName )
        this.container.appendChild( this.fieldValue )
        this.container.appendChild( this.icon )
        this.container.appendChild( this.windDirection )
        this.shadow.appendChild( this.style )
        this.shadow.appendChild( this.container )
    }

    updateIcon( newIcon ) {
        if ( newIcon ) {
            this.icon.src = `https://www.metaweather.com/static/img/weather/${ newIcon }.svg`
        } else {
            this.icon.removeAttribute( 'src' )
        }
    }

    updateWindDirection( newDirection ) {
        if ( newDirection ) {
            this.windDirection.setAttribute( 'direction', newDirection )
        } else {
            this.windDirection.removeAttribute( 'direction' )
        }
    }

    updateTemperature( newValue ) {
        const parsedValue = Number( newValue )
        const displayValue = !newValue || Number.isNaN( newValue ) ? ''
            : parsedValue.toFixed( 2 )
        this.fieldValue.textContent = displayValue
    }

    attributeChangedCallback( name, _oldValue, newValue ) {
        switch( name ) {
            case 'fieldname':
                this.fieldName.textContent = newValue
            break
            case 'fieldvalue':
                this.updateTemperature( newValue )
            break
            case 'icon':
                this.updateIcon( newValue )
            break
            case 'direction':
                this.updateWindDirection( newValue )
            break
        }
    }
}