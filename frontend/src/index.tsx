import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import App from './components/App';
import * as serviceWorker from './serviceWorker';


export const appHistory = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
