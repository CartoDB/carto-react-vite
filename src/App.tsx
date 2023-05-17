import { Grid, Box, Paper } from "@mui/material";
import { AppBar, Typography } from "@carto/react-ui";

import Map from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

import DeckGL from "@deck.gl/react";
import { CartoLayer, setDefaultCredentials, MAP_TYPES, BASEMAP } from "@deck.gl/carto";

import { ReactComponent as Logo } from "./assets/carto.svg";

function App() {
  const viewState = { latitude: 0, longitude: 0, zoom: 1, bearing: 0, pitch: 0 };

  // TODO Prepare in your account a proper accessToken, for your required datasets & APIs
  setDefaultCredentials({
    accessToken:
      "eyJhbGciOiJIUzI1NiJ9.eyJhIjoiYWNfNDd1dW5tZWciLCJqdGkiOiJkMDExNTlmYyJ9.OHB-o6t2PhtWF5dnBBTZ4CsjeGJVnPw6HTMpqTNc4Rg", // frontend-team account
    apiBaseUrl: "https://gcp-us-east1.api.carto.com",
  });

  const layer = new CartoLayer({
    type: MAP_TYPES.QUERY,
    connection: "carto_dw",
    data: "SELECT * FROM `carto-demo-data.demo_tables.retail_stores`",
    pointRadiusMinPixels: 2,
    getLineColor: [0, 0, 0, 200],
    getFillColor: [238, 77, 90],
    lineWidthMinPixels: 1,
  });

  return (
    <Grid container sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <AppBar brandLogo={<Logo />} brandText="CARTO App">
        {/* Extra content for Header */}
      </AppBar>
      <Grid
        component="main"
        sx={{
          marginTop: "48px",
          flexGrow: 1,
          display: "flex",
        }}
        container
      >
        <Grid item component="aside" sx={{ flex: "0 0 240px", p: 2 }}>
          <Typography variant="subtitle1">Panel</Typography>
          <Box>Your content here</Box>
        </Grid>
        <Grid item component="section" sx={{ flex: "1", position: "relative", display: "flex" }}>
          <DeckGL initialViewState={viewState} layers={[layer]} controller={true}>
            <Map mapLib={maplibregl} mapStyle={BASEMAP.POSITRON} />
          </DeckGL>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
