import * as React from "react";
import {Redirect, Route, Router, Switch} from "react-router-dom";
import {connect} from "react-redux";

import {appHistory} from "../index";

function AppRouter() {

    return (
        <Router history={appHistory}>
            <main>
                <Switch>
                </Switch>
            </main>
        </Router>
    )
}


const mapStateToProps = (state: any) => ({
    ...state
});


export default connect(
    mapStateToProps,
    {}
)(AppRouter);
