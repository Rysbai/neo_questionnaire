import React from "react";
import MainNavbar from "../../navs/MainNavbar/MainNavbar";
import {PropsFromRedux} from "../../../containers/SurveyResult";
import {surveyInfoUseStyles, useStyles} from "./style";
import {Container} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {Bar} from 'react-chartjs-2';
import {QuestionResultWithChartData} from "../../../store/survey/results/types";
import {Survey} from "../../../api/types";
import QRCode from "qrcode.react";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import {FileCopy} from "@material-ui/icons";
import Notifications from 'react-notification-system-redux';

export default function (props: PropsFromRedux) {
  const classes = useStyles();

  React.useEffect(() => {
    props.actions.setUpPage(props.match.params.surveyId)
  }, [props.actions, props.match.params.surveyId]);

  return (
    <div>
      <Notifications
        notifications={props.notifications}
      />
      <MainNavbar loggedUser={props.loggedUser}/>
      <Container className={classes.container} maxWidth="sm">
        <SurveyInfo survey={props.survey} copyCode={props.actions.copyCode}/>
        {props.results.map((question: QuestionResultWithChartData, index: number) => (<Card key={index} style={{marginTop: '10px'}}>
          <CardContent>
            <Typography variant="h6">{question.payload}</Typography>
            <Bar data={{labels: ['Answers'], datasets: question.chartData.items}}
                 options={{scales: {
                            yAxes: [{
                              ticks: {
                                beginAtZero: true,
                                min: 0
                              }
                            }]
                          }}}
             />
          </CardContent>
        </Card>))}
      </Container>
    </div>
  )
}

interface SurveyInfoProps {
  survey: Survey,
  copyCode: Function
}

function SurveyInfo(props: SurveyInfoProps) {
  const classes = surveyInfoUseStyles();

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{props.survey.title}</Typography>
        <Typography>{props.survey.description}</Typography>
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            <Typography className={classes.code}>Code: {props.survey.code}</Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.code}>
              <IconButton
                onClick={() => props.copyCode()}
              >
                <FileCopy color="primary"/>
              </IconButton>
            </Typography>
          </Grid>
        </Grid>

        <QRCode className={classes.barCode}
                value={props.survey.code}
                size={256}
        />
      </CardContent>
    </Card>
  )
}
