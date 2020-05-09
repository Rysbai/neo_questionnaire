import React from "react";
import MainNavbar from "../../navs/MainNavbar/MainNavbar";
import {Button, Card, CardContent, Container, Grid, Typography} from "@material-ui/core";
import {useStyles} from "./style";
import {PropsFromRedux} from "../../../containers/EditSurvey";
import SurveyForm from "../../forms/SurveyForm/SurveyForm";


export default function (props: PropsFromRedux) {
  const classes = useStyles();
  const surveyId = props.match.params.surveyId;


  React.useEffect(() => {
    props.actions.retrieveSurvey(surveyId);
  }, []);

  return (
    <div>
      <MainNavbar loggedUser={props.loggedUser}/>
      <Container maxWidth="md">
        <Card>
          <CardContent>
            <Grid container alignItems="center" justify="space-between">
              <Grid item>
                <Typography variant="h6" style={{fontWeight: 'bold'}}>Edit survey</Typography>
              </Grid>
              <Grid item>
                <Button color="primary"
                        disabled={props.changesSaved}
                        variant="contained"
                        onClick={props.actions.saveChanges}
                        className={classes.changesIndicator}
                >{props.changesSaved ? 'Saved': 'Save'}</Button>
              </Grid>
            </Grid>
            <section className={classes.surveySection}>
              <Card variant="outlined">
                <CardContent>
                  <SurveyForm {...props} {...props.actions} onSubmit={props.actions.saveChanges}/>
                </CardContent>
              </Card>
            </section>
          </CardContent>
        </Card>
      </Container>
    </div>
  )
};
