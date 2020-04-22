import * as React from "react";
import {Router, Switch, Route} from "react-router-dom";
import {appHistory} from "../index";
import {IndexContainer} from "../containers/Index";



export default function AppRouter() {

  return (
    <Router history={appHistory}>
      <main>
        <Switch>
          <Route exact path="/" component={IndexContainer}/>
        </Switch>
      </main>
    </Router>
  )
}