import { createGlobalStyle } from "styled-components";

// The folllwing style would be used to initialise the page
// And to make sure there is no side effect from any other CSS
export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: white;
    font-family: Open-Sans, Helvetica, Sans-Serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }
`;
