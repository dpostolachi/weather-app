export default `
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    :host {
        box-sizing: border-box;
        display: block;
        margin: -12px -12px 0 -12px;
        width: calc( 100% + 24px );
    }

    .container {
        background: linear-gradient(to bottom, #4096ee 0%, #7abcff 100%);
        padding: 12px;
        color: #fff;
    }
    .container[aria-busy="true"]:after {
        content: '';
        display: block;
        width: 12px;
        height: 12px;
        position: absolute;
        top: 12px;
        right: 12px;
        border: 2px solid #fff;
        border-top-color: transparent;
        border-radius: 50%;
        animation: spin 2s infinite linear;
    }

    .location-title {
        margin: 0 0 6px;
        font-weight: normal;
        font-size: 2.6rem;
    }
    
    .location-title:empty:before {
        content: '---';
    }
    
    .date {
        font-size: 1.8rem;
        opacity: .82;
        position: relative;
        z-index: 1;
    }

    .date-button{
        background: url('/assets/images/calendar.svg') no-repeat center center;
        height: 24px;
        width: 24px;
        border: none;
        border-radius: 0;
        background-size: 100% auto;
        filter: brightness(0) invert(1);
        cursor: pointer;
    }

    .date-container {
        display: flex;
        align-items: center;
        margin: 0 0 6px;
    }

    .date:empty:before {
        content: '---';
    }

    .weather-boxes {
        border-top: 1px solid rgba(255, 255, 255, 0.12);
        display: flex;
        margin: 24px 0 0;
        justify-content: stretch;
    }

    ui5-datepicker {
        margin: 0 0 0 -50px;
        font-size: 1.6rem;
        --_ui5_input_width: 0px;
        --sapField_Background: transparent;
        --sapField_BorderColor: transparent;
        --sapField_Hover_BorderColor: transparent;
        --sapField_Hover_Background: transparent;
        --sapFontSize: 0px;
        --sapField_TextColor: transparent;
        --sapContent_IconColor: transparent;
        --sapButton_Selected_Background: transparent;
        --sapButton_Active_TextColor: transparent;
        --sapButton_Active_Background: transparent;
        --sapButton_Lite_Hover_Background: transparent;
    }
`