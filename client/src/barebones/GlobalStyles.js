import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    :root {
        --c-blue: #3F5F8E;
        --c-gray: #292826;
        --c-red: #e23123;
        --c-dark: #180806;
        --c-yellow: #f0b83e;
        --c-light: #DCD9D2;
    }
    * {
        margin: 0;
        padding: 0;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    main > * {
        padding: 15px;
    }
    aside {
        font-size: 30px;
        padding: 15px;
        text-align: center;
    }
    a {
        text-decoration: none;
    }
    h1 {
        text-align: center;
    }
`