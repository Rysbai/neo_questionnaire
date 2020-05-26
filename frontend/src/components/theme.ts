import {createMuiTheme} from "@material-ui/core/styles";

export const muiTheme = createMuiTheme({
  palette: {
    common: {
      black: '#3d3d3d'
    },
    primary: {
      light: "#5eb8ff",
      main: "#0188d1",
      dark: "#005b9f",
    },
    secondary: {
      light: "#ffff56",
      main: "#ffea00",
      dark: "#c7b800"
    },
    success: {
      light: "#76ea94",
      main: "#3fb765",
      dark: "#008639"
    },
    text: {
      primary: "#353b48"
    }
  },
  typography: {
    fontFamily: "Nunito"
  }
});

