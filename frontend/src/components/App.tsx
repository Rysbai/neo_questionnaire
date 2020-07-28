import React from 'react'
import {createStore, applyMiddleware} from "redux";

import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import { ThemeProvider } from '@material-ui/core/styles';
import {Provider} from "react-redux"

import AppRouter from "../routes/AppRouter";
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import {rootReducer} from "../store";
import {muiTheme} from "./theme";
import {AuthContainer} from "../containers/Auth";
import "../styles/App.css"

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);


function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={muiTheme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <AuthContainer/>
          <AppRouter/>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
