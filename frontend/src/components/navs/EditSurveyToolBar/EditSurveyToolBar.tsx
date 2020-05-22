import React from "react";

import styles from "./styles";
import {AppBar, CircularProgress, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Check, PlayArrow, Save, Visibility} from "@material-ui/icons";
import {CHANGES_STATUS} from "../../../store/survey/create-edit/base/types";


interface AppBarProps {
  surveyId: number | string,
  changesStatus: string
}

export default function (props: AppBarProps) {
  const classes = styles();

  return (
    <div className={classes.root}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography variant="h6" className={classes.logo}>NeobisSurvey</Typography>
          <Status {...props}/>
        </Toolbar>
      </AppBar>
    </div>
  )
}


function Status(props: AppBarProps) {
  const classes = styles();

  return (
    <Paper>
      <Grid container alignItems="center" justify="space-evenly">
        <Grid item>
          <ChangesStatusIcon surveyId={props.surveyId}
                             changesStatus={props.changesStatus}/>
        </Grid>
        <Grid item>
          <div className={classes.verticalDivider}/>
        </Grid>
        <Grid item>
          <IconButton aria-controls="menu-appbar"
                      title="Preview"
                      aria-haspopup="true"
                      className={classes.toolIcons}
          >
            <Visibility/>
          </IconButton>
        </Grid>
        <Grid item>
          <div className={classes.verticalDivider}/>
        </Grid>
        <Grid item>
          <IconButton aria-controls="menu-appbar"
                      title="Start survey"
                      aria-haspopup="true"
                      className={classes.toolIcons}
          >
            <PlayArrow/>
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  )
}


function ChangesStatusIcon(props: AppBarProps) {
  const classes = styles();

  if (props.changesStatus === CHANGES_STATUS.__saved)
    return (
      <IconButton aria-controls="menu-appbar"
                  title="File status"
                  aria-haspopup="true"
                  className={classes.successStatusIcon}
      >
        <Check/>
      </IconButton>
    );

  if (props.changesStatus === CHANGES_STATUS.__saving)
    return (
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.savingProgress}
        size={18}
        thickness={4}
      />
    );

  return (
      <IconButton aria-controls="menu-appbar"
                  title="File status"
                  aria-haspopup="true"
                  color="primary"
      >
        <Save/>
      </IconButton>
  )
}