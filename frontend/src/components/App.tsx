import React from 'react'
import { createStore } from "redux";
import { Provider } from "react-redux"

import AppRouter from "../routes/AppRouter";
import reducer from "../reducers/index";

const store = createStore(reducer);

function App() {
  return (
    <Provider store={store}>
      <AppRouter/>
      Hello World!
    </Provider>
  );
}

export default App;
