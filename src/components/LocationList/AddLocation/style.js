export default `
    :host {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        position: absolute;
        left: 0;
        top: 0;
        background: #edeef0;
        width: 100%;
        height: 100%;
        z-index: 2;
    }
    :host([aria-hidden="true"]) {
        display: none;
    }

    .container {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        justify-content: space-between;
    }
    
    .cancel {
        display: block;
        width: 100%;
        background: #f6f5f4;
        padding: 12px;
        border-radius: 0;
        border: none;
        text-align: center;
        font-size: 1.6rem;
    }

    .cancel:hover{
        background: #7abcff;
        padding: 12px;
        color: #fff;
    }

    .result {
        cursor: pointer;
        display: block;
        font-size: 1.8rem;
        text-align: center;
        width: 100%;
        border-radius: 0;
        border: none;
        background: #daeafb;
        color: rgba(0, 0, 0, .72);
        border-bottom: 1px solid rgba(255, 255, 255, .12);
        padding: 12px;
    }
    
    .result:hover {
        background: #7abcff;
    }

    .results:empty:before {
        font-size: 1.8rem;
        opacity: .52;
        display: block;
        content: 'No results';
        text-align: center;
        margin: 32px;
    }

    .input {
        width: 100%;
        border-radius: 0;
        border: none;
        font-size: 1.6rem;
        line-height: 5.2rem;
        padding: 0px 12px;
        box-sizing: border-box;
    }
`