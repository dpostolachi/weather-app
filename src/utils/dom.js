export const createElement = ( nodeType, attrs = {} ) => {
    const element = document.createElement( nodeType )
    Object.entries( attrs )
        .forEach( ( [ attrName, attrValue ] ) => element.setAttribute( attrName, attrValue ) )
    return element
}

export const createEvent = ( evtName, detail ) =>
    new CustomEvent( evtName, {
        bubbles: true,
        composed: true,
        detail
    } )