export default `
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    * {
        box-sizing: border-box;
    }

    .container {
        display: flex;
        flex-direction: column;
        max-width: 100%;
        width: 800px;
        padding: 12px;
        min-height: 400px;
        margin: 80px auto;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 0 0 #d7d8db,0 0 0 1px #e3e4e8;
    }
    .container[aria-busy="true"]:before {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(255, 255, 255, .72);
    }
    .container[aria-busy="true"]:after {
        content: '';
        display: block;
        width: 32px;
        height: 32px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -16px 0 0 -16px;
        border: 3px solid rgb(81, 129, 184);
        border-top-color: transparent;
        border-radius: 50%;
        animation: spin 2s infinite linear;
    }

    .error-block {
        visibility: visible;
        opacity: 1;
        display: block;
        position: absolute;
        min-width: 120px;
        min-height: 46px;
        top: 20%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 12px;
        border-radius: 4px;
        background: rgba(0, 0, 0, .72);
        text-align: center;
        font-size: 1.8rem;
        color: #fff;
        transition: all .2s ease-in-out;
    }

    .error-block:empty{
        visibility: hidden;
        top: 0%;
        transition: all .2s ease-in-out;
        opacity: 0;
    }
`