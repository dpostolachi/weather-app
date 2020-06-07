import { createElement, createEvent } from 'src/utils/dom'
import css from './style'

export default class CityPreview extends HTMLElement {

    locationId = null
    locationTitle = null

    shadow = this.attachShadow( { mode: 'open' } )
    style = createElement( 'style' )

    container = createElement( 'div', {
        class: 'container',
    } )
    selectButton = createElement( 'button', {
        class: 'btn btn-select',
    } )
    removeButton = createElement( 'button', {
        class: 'btn btn-remove',
    } )

    static get observedAttributes() {
        return [ 'location-title', 'location-id' ]
    }

    constructor() {
        super()
        this.mountElements()
    }

    set active( active ) {
        this.container.setAttribute( 'aria-active', active )
    }

    mountElements() {
        this.style.textContent = css
        this.shadow.appendChild( this.style )

        this.container.appendChild( this.selectButton )
        this.container.appendChild( this.removeButton )
        this.shadow.appendChild( this.container )

        this.selectButton.addEventListener( 'click', this.handleSelection )
        this.removeButton.addEventListener( 'click', this.handleRemoval )

    }

    handleSelection = ( e ) => {
        this.dispatchEvent(
            createEvent( 'select:location', {
                id: this.locationId,
                title: this.locationTitle,
            } )
        )
    }

    handleRemoval = ( e ) => {
        this.dispatchEvent(
            createEvent( 'remove:location', {
                id: this.locationId,
            } )
        )
    }

    attributeChangedCallback( name, _oldValue, newValue ) {
        switch( name ) {
            case 'location-title':
                this.locationTitle = newValue
                this.selectButton.textContent = newValue
            break
            case 'location-id':
                this.locationId = newValue
            break
        }
    }

}