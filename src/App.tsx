import { Grid } from "@mui/material";

import Map from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

import DeckGL from "@deck.gl/react/typed";
import { CartoLayer, setDefaultCredentials, MAP_TYPES, API_VERSIONS } from "@deck.gl/carto/typed";

import { AppBar, Typography } from "@carto/react-ui";
import { useCartoLayerProps } from "@carto/react-api";
import { addLayer, addSource } from "@carto/react-redux";
import { BASEMAPS } from "@carto/react-basemaps";

// import { FormulaWidget, CategoryWidget } from "@carto/react-widgets";

import { ReactComponent as Logo } from "@/assets/carto.svg";
import { useDispatch, useSelector } from "react-redux";

const useCredentials = () => {
  // Use credentials configuration from Redux store (or add harcoded values)
  // const credentials = useSelector((state: RootState) => state.carto.credentials);

  // Hardcoded values
  const credentials = {
    // Prepare the appropiate accessToken & apiBaseUrl to access your datasets and account at Workspace
    apiVersion: API_VERSIONS.V3,
    accessToken:
      "eyJhbGciOiJIUzI1NiJ9.eyJhIjoiYWNfNDd1dW5tZWciLCJqdGkiOiJkMDExNTlmYyJ9.OHB-o6t2PhtWF5dnBBTZ4CsjeGJVnPw6HTMpqTNc4Rg", // frontend-team account
    apiBaseUrl: "https://gcp-us-east1.api.carto.com",
  };

  // NOTE: Prepare in your account a proper accessToken, for your required datasets & APIs
  setDefaultCredentials(credentials);
};

const useMap = () => {
  // Use map configuration from Redux store (or add harcoded values )
  // const viewState = useSelector((state: RootState) => state.carto.viewState);
  // const basemap = useSelector(
  //   // @ts-ignore
  //   (state: RootState) => BASEMAPS[state.carto.basemap]
  // );
  // gmaps currently not supported

  // Hardcoded values
  const viewState = { latitude: 0, longitude: 0, zoom: 1, bearing: 0, pitch: 0 };
  const basemap = BASEMAPS.voyager.options.mapStyle;

  return { viewState, basemap };
};

const useLayers = () => {
  const dispatch = useDispatch();

  // Retail stores
  const source1 = {
    id: "stores",
    type: MAP_TYPES.QUERY,
    connection: "carto_dw",
    data: "SELECT * FROM `carto-demo-data.demo_tables.airports`",
    // TODO VVG: empty credentials & queryParameters will be removed in next release
  };
  dispatch(addSource(source1));

  // Retail layer
  const cartoLayerProps1 = useCartoLayerProps({
    source: source1,
    uniqueIdProperty: "cartodb_id",
  });
  const layer1 = new CartoLayer({
    id: "cartoLayer",
    pointRadiusMinPixels: 2,
    getLineColor: [0, 0, 0, 200],
    getFillColor: [238, 77, 90],
    lineWidthMinPixels: 1,
    ...cartoLayerProps1,
  });

  dispatch(addLayer(layer1));

  const layers = [layer1];
  return { layers };
};

function App() {
  useCredentials();
  const { viewState, basemap } = useMap();
  const { layers } = useLayers();

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
        <Grid item component="aside" sx={{ flex: "0 0 350px", p: 2 }}>
          <Typography variant="subtitle1">Panel</Typography>
          {/* <FormulaWidget
            id="totalRevenueGlobal"
            title="Total revenue (Global)"
            dataSource={storesSource.id}
            column="revenue"
            operation={AggregationTypes.SUM}
            onError={console.error}
            global={true}
          /> */}
        </Grid>
        <Grid item component="section" sx={{ flex: "1", position: "relative", display: "flex" }}>
          <DeckGL initialViewState={viewState} layers={layers} controller={true}>
            <Map mapLib={maplibregl} mapStyle={basemap} />
          </DeckGL>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
