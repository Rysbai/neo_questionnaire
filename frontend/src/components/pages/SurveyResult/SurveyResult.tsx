import React from "react";
import MainNavbar from "../../navs/MainNavbar/MainNavbar";
import {PropsFromRedux} from "../../../containers/SurveyResult";
import {useStyles} from "./style";
import {Container} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {Bar} from 'react-chartjs-2';
import {QuestionResultWithChartData} from "../../../store/survey/results/types";


export default function (props: PropsFromRedux) {
  const classes = useStyles();
  console.log(props);

  React.useEffect(() => {
    props.actions.setUpPage(props.match.params.surveyId)
  }, [props.actions, props.match.params.surveyId]);
  return (
    <div>
      <MainNavbar loggedUser={props.loggedUser}/>
      <Container className={classes.container} maxWidth="sm">
        {props.results.map((question: QuestionResultWithChartData, index: number) => (<Card key={index} style={{marginTop: '10px'}}>
          <CardContent>
            <Typography variant="h6">{question.payload}</Typography>
            <Bar data={{labels: ['Answers'], datasets: question.chartData.items}}
             />
          </CardContent>
        </Card>))}
      </Container>
    </div>
  )
}