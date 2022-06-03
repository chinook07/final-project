import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    /* @font-face {
        font-family: "JurassicPark";
        src: url("./barebones/JurassicPark.ttf") format("truetype");
        font-weight: 300;
        font-style: normal;
        font-display: auto;
    } */
    :root {
        --colour-blue: #3F5F8E;
        --colour-gray: #292826;
        --colour-red: #e23123;
        --colour-dark: #180806;
        --colour-yellow: #f0b83e;
        --colour-light: #DCD9D2;
        /* --font-jurassic:  */
    }
    * {
        margin: 0;
        padding: 0;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    a {
        text-decoration: none;
        /* font-family: "JurassicPark"; */
    }
    
`