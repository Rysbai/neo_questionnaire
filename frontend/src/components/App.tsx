import React from 'react'
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { ThemeProvider } from '@material-ui/core/styles';
import {Provider} from "react-redux"

import AppRouter from "../routes/AppRouter";
import {rootReducer} from "../store";
import {muiTheme} from "./theme";
import {AuthContainer} from "../containers/Auth";
import "../styles/App.css"

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);


function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={muiTheme}>
        <AuthContainer/>
        <AppRouter/>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
