import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');

    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
        scroll-behavior: smooth;
    }
    
    body {
        -webkit-font-smoothing: antialised;
        font-family: 'Raleway', sans-serif !important;
        font-size: 16px;
        min-width: 350;
    }

    button {
        cursor: pointer;
    }

`
