import {createMuiTheme} from "@material-ui/core/styles";

export const muiTheme = createMuiTheme({
  palette: {
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
  },
  typography: {
    fontFamily: "Nunito"
  }
});

