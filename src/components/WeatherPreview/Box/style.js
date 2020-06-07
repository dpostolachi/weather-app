export default `
    :host {
        box-sizing: border-box;
        display: block;
        flex-basis: 33%;
        min-height: 95px;
        text-align: center;
        padding: 12px;
    }

    .container {
    }

    .fieldname {
        font-size: 1.8rem;
        display: block;
        margin: 0 0 12px;
    }

    .fieldname:empty:before {
        content: '---';
    }

    .fieldvalue {
        font-size: 2.2rem;
    }

    .icon {
        max-width: 32px;
        max-height: 32px;
        filter: brightness(0) invert(1);
    }

    .wind-direction {
        display: inline-block;
        font-size: 3.2rem;
    }

    .wind-direction[direction]:before {
        content: '↑';
    }
    .wind-direction[direction="N"] {
        transform: rotate(0deg);
    }
    .wind-direction[direction="NNE"] {
        transform: rotate(22.5deg);
    }
    .wind-direction[direction="NE"] {
        transform: rotate(45deg);
    }
    .wind-direction[direction="ENE"] {
        transform: rotate(67.5deg);
    }
    .wind-direction[direction="E"] {
        transform: rotate(90deg);
    }
    .wind-direction[direction="ESE"] {
        transform: rotate(112.5deg);
    }
    .wind-direction[direction="SE"] {
        transform: rotate(135deg);
    }    
    .wind-direction[direction="SSE"] {
        transform: rotate(157.5deg);
    }
    .wind-direction[direction="S"] {
        transform: rotate(180deg);
    }
    .wind-direction[direction="SSW"] {
        transform: rotate(202.5deg);
    }
    .wind-direction[direction="SW"] {
        transform: rotate(225deg);
    }
    .wind-direction[direction="WSW"] {
        transform: rotate(247.5deg);
    }
    .wind-direction[direction="W"] {
        transform: rotate(270deg);
    }
    .wind-direction[direction="WNW"] {
        transform: rotate(292.5deg);
    }
    .wind-direction[direction="NW"] {
        transform: rotate(315deg);
    }
    .wind-direction[direction="NNW"] {
        transform: rotate(337.5deg);
    }

`