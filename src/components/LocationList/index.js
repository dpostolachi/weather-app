import { createElement, createEvent } from 'src/utils/dom'
import css from './style'

export default class LocationList extends HTMLElement {

    // Map<id, domNode>, to avoid iterations
    locationMap = {}

    shadow = this.attachShadow( { mode: 'open' } )
    style = createElement( 'style' )
    container = createElement( 'div', {
        class: 'container'
    } )
    listContainer = createElement( 'div', {
        class: 'list'
    } )
    addCityButton = createElement( 'button', {
        class: 'add-city'
    } )

    addCityForm = createElement( 'add-location', {
        'aria-hidden': true
    } )

    static get observedAttributes() {
        return [ 'selected-location' ]
    }

    constructor() {
        super()
        this.mountElements()
    }

    set active( active ) {
        this.button.setAttribute( 'aria-active', active )
    }

    appendCity( { id, title } ) {
        const listItem = createElement( 'location-list-item', {
            'location-id': id,
            'location-title': title,
        } )
        this.listContainer.prepend( listItem )
        this.locationMap[ id ] = listItem
    }

    mountElements() {
        this.style.textContent = css
        
        this.addCityButton.textContent = 'Add new city'
        this.addCityButton.addEventListener( 'click', this.handleAddCityClick )

        this.shadow.appendChild( this.style )
        this.container.appendChild( this.listContainer )
        this.container.appendChild( this.addCityButton )
        this.container.appendChild( this.addCityForm )
        this.shadow.appendChild( this.container )

        this.addEventListener( 'append:location', this.handleAppendLocation )
        this.addEventListener( 'remove:location', this.handleLocationRemove )
    }

    handleAddCityClick = () => {
        this.addCityForm.setAttribute( 'aria-hidden', false )
    }

    handleAppendLocation = ( { detail: { id, title } } ) => {
        // add city to the current list
        if ( !this.locationMap[ id ] ) {
            this.appendCity( { id, title } )
        }
        this.dispatchEvent(
            createEvent( 'select:location', {
                id,
                title,
            } )
        )
    }

    handleLocationRemove = ( { detail: { id } } ) => {
        const elem = this.locationMap[ id ]
        this.locationMap[ id ] = undefined
        elem.remove()
    }

    // will highlight the active city in the list
    updateActiveListItem( newId, oldId ) {
        // ids can be undefined (e.g first render)
        const newItem = this.locationMap[ newId ]
        if( newItem ) {
            newItem.active = true
        }

        const oldItem = this.locationMap[ oldId ]
        if ( oldItem ) {
            oldItem.active = false
        }
    }

    attributeChangedCallback( name, oldValue, newValue ) {
        switch( name ) {
            case 'selected-location':
                this.updateActiveListItem( newValue, oldValue )
            break
        }
    }

}   