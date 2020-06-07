export default `
    :host {
        box-sizing: border-box;
        display: block;
    }

    .container {
        display: flex;
    }

    .btn {
        display: block;
        cursor: pointer;
        width: 100%;
        color: rgba(0, 0, 0, .72);
        background: #fcfcfc;
        border: none;
        border-radius: 0;
        padding: 12px;
        font-size: 1.8rem;
        text-align: left;
        transition: all .2s ease-out;
    }

    .btn:hover:not([aria-active="true"]) {
        background: #7abcff;
    }
    .container[aria-active="true"] .btn:not(.btn-remove) {
        background: #60abf7;
        color: #fff;
        pointer-events: none;
        cursor: initial;
    }

    .btn-remove {
        flex-basis: 0;
        max-width: 0px;
        padding: 0;
        background: #ef5350;
        text-align: center;
        font-weight: bold;
        color: #fff;
        font-size: 2rem;
        overflow: hidden;
    }

    .btn-remove:hover {
        background: #f44336;
    }

    .btn-remove:before {
        content: '⨯';
    }

    .container:hover .btn-remove {
        flex-basis: 64px;
        max-width: 64px;
        transition: all .2s ease-in;
    }
`