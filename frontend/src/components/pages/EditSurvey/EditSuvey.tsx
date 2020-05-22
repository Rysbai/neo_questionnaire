import React from "react";
import {Button, Card, CardContent, Container, Grid, Typography} from "@material-ui/core";
import {useStyles} from "./style";
import {PropsFromRedux} from "../../../containers/EditSurvey";
import SurveyForm from "../../forms/SurveyForm/SurveyForm";
import EditSurveyToolBar from "../../navs/EditSurveyToolBar/EditSurveyToolBar";


export default function (props: PropsFromRedux) {
  const classes = useStyles();
  const surveyId = props.match.params.surveyId;

  React.useEffect(() => {
    props.actions.retrieveSurvey(surveyId);
  }, []);

  return (
    <div>
      <EditSurveyToolBar changesStatus={props.changesStatus} surveyId={props.surveyId}/>
      <Container maxWidth="md">
        <Card>
          <CardContent>
            <Grid container alignItems="center" justify="space-between">
              <Grid item>
                <Typography variant="h5">Edit survey</Typography>
              </Grid>
            </Grid>
            <section className={classes.surveySection}>
              <SurveyForm {...props} {...props.actions} onSubmit={props.actions.saveChanges}/>
            </section>
          </CardContent>
        </Card>
      </Container>
    </div>
  )
};
