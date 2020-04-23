import React from "react";
import {User} from "../../../api/types";
import {AppBar, Toolbar, Typography} from "@material-ui/core";


interface Interface {
  loggedUser: User
}

export default function (props: Interface) {

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        <Typography variant="h6">NeobisSurvey</Typography>
      </Toolbar>
    </AppBar>
  )

}