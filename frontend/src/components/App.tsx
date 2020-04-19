import React from 'react'
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {Provider} from "react-redux"

import AppRouter from "../routes/AppRouter";
import {rootReducer} from "../store";

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);


function App() {
  return (
    <Provider store={store}>
      <AppRouter/>
    </Provider>
  );
}

export default App;
