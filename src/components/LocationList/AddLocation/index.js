import { createElement, createEvent } from 'src/utils/dom'
import { searchLocation } from 'src/utils/weather'
import css from './style'

export default class AddLocation extends HTMLElement {

    shadow = this.attachShadow( { mode: 'open' } )
    style = createElement( 'style' )

    container = createElement( 'div', {
        class: 'container'
    } )
    searchContainer = createElement( 'div', {
        class: 'list'
    } )
    resultsContainer = createElement( 'div', {
        class: 'results'
    } )
    addCityButton = createElement( 'button', {
        class: 'cancel'
    } )
    input = createElement( 'input', {
        type: 'text',
        class: 'input',
        placeholder: 'Search for a location...'
    } )

    static get observedAttributes() {
        return [ 'aria-hidden' ]
    }

    constructor() {
        super()
        this.mountElements()
    }

    mountElements() {
        this.input.addEventListener( 'input', this.handleInputChange )
        this.style.textContent = css
        this.addCityButton.textContent = 'Cancel'
        this.addCityButton.addEventListener( 'click', this.hide )
        this.shadow.appendChild( this.style )
        this.searchContainer.appendChild( this.input )
        this.searchContainer.appendChild( this.resultsContainer )
        this.container.appendChild( this.searchContainer )
        this.container.appendChild( this.addCityButton )
        this.shadow.appendChild( this.container )
    }

    hide = () => {
        this.setAttribute( 'aria-hidden', true )
        this.input.value = ''
        this.displayResults( [] )
    }

    debounceTimeout = null
    handleInputChange = ( e ) => {
        const { value } = e.currentTarget
        clearTimeout( this.debounceTimeout )
        this.debounceTimeout = setTimeout( () => {
            if ( value.length > 1  ) {
                searchLocation( value )
                    .then( this.displayResults )
            } else {
                this.displayResults( [] )
            }
        }, [ 400 ] )
    }

    handleResultClick = ( e ) => {
        const elem = e.currentTarget
        const id = elem.getAttribute( 'id' )
        const title = elem.getAttribute( 'title' )
        this.dispatchEvent(
            createEvent( 'append:location', {
                id,
                title,
            } )
        )
        this.hide()
    }

    displayResults = ( results ) => {
        this.resultsContainer.innerHTML = ''
        const fragment = document.createDocumentFragment()
        results.forEach( ( { title, id } ) => {
            const result = createElement( 'button', {
                class: 'result',
                id,
                title,
            } )
            result.addEventListener( 'click', this.handleResultClick )
            result.textContent = title
            fragment.appendChild( result )
        } )
        this.resultsContainer.appendChild( fragment )
    }

    attributeChangedCallback( name, _oldValue, newValue ) {
        switch( name ) {
            case 'aria-hidden':
                if ( newValue === 'false' )
                    this.input.focus()
            break
        }
    }

}   