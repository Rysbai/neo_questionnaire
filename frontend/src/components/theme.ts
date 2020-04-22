import {createMuiTheme} from "@material-ui/core/styles";
import {lightBlue, yellow} from "@material-ui/core/colors";

export const muiTheme = createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: yellow
  },
  typography: {
    fontFamily: "Nunito"
  }
});

