import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, Grid, ThemeProvider, StyledEngineProvider } from "@mui/material";
import { theme } from "@carto/react-ui";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
