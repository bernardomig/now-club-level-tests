import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const theme = createMuiTheme({
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-frq63dwv.eu.auth0.com"
      clientId="xUfrr6z5dDL4dPsKXquYvg8YZaf0OBrQ"
      redirectUri={window.location.origin}
      cacheLocation="localstorage"
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
