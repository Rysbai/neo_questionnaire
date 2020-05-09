import React from "react";
import {IndexPropsFromRedux} from "../../../containers/Index";
import MainNavbar from "../../navs/MainNavbar/MainNavbar";
import {Button, Card, CardContent, Container, Grid, Typography} from "@material-ui/core";
import SurveyForm from "../../forms/SurveyForm/SurveyForm";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  miniSection: {
    marginTop: theme.spacing(1)
  }
}));

export default function (props: IndexPropsFromRedux) {
  const classes = useStyles();
  return (
    <div>
      <MainNavbar loggedUser={props.loggedUser}/>
      <Container>
        <Grid container spacing={2} justify="space-between">
          <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h5">О сайте</Typography>
                <Typography>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
            <Card>
              <CardContent>
              <Typography variant="h6">Создать новый</Typography>
                <Card variant="outlined" className={classes.miniSection}>
                  <CardContent>
                  <SurveyForm
                    {...props.createSurvey}
                    setSurveyFieldValue={props.actions.setSurveyFieldValue}
                    onSubmit={props.actions.createSurvey}
                    onCancel={() => console.log('cancel')}
                    />
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
            <Card>
              <CardContent>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item>
                    <Typography variant="h6">Пройти опросник</Typography>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" size="small" color="secondary">Пройти опросник</Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  )

}