export default `
    :host {
        box-sizing: border-box;
        display: flex;
        flex-grow: 1;
        margin: 0 -12px -12px -12px;
    }

    .container {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        justify-content: space-between;
    }

    .add-city {
        display: block;
        background: #f6f5f4;
        padding: 12px;
        border-radius: 0;
        border: none;
        text-align: center;
        font-size: 1.6rem;
    }

    .add-city:hover{
        background: #7abcff;
        color: #fff;
    }
`