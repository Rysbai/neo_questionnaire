import * as React from "react";
import {Router, Switch, Route} from "react-router-dom";
import {appHistory} from "../index";

import {LoginContainer} from "../containers/Login";


export default function AppRouter() {

  return (
    <Router history={appHistory}>
      <main>
        <Switch>
          <Route exact path="/" component={LoginContainer}/>
        </Switch>
      </main>
    </Router>
  )
}