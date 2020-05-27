import React from "react";
import {Button, Card, CardContent, Container, Grid, IconButton, Typography} from "@material-ui/core";
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import {useStyles} from "./style";
import {PropsFromRedux} from "../../../containers/EditSurvey";
import SurveyForm from "../../forms/SurveyForm";
import EditSurveyToolBar from "../../navs/EditSurveyToolBar";
import QuestionForm from "../../forms/QuestionForm";
import OptionForm from "../../forms/OptionForm";
import {Question} from "../../../api/types";
import {Add} from "@material-ui/icons";
import {QuestionFieldName} from "../../../store/survey/create-edit/edit/types";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';


export default function (props: PropsFromRedux) {
  const classes = useStyles();
  const surveyId = props.match.params.surveyId;

  React.useEffect(() => {
    props.actions.retrieveSurvey(surveyId);
  }, []);

  return (
    <div>
      <EditSurveyToolBar changesStatus={props.changesStatus}
                         surveyId={props.surveyId}/>
      <Container maxWidth="sm"
                 className={classes.container}>
        <Card>
          <CardContent>
            <Grid container
                  alignItems="center"
                  justify="space-between">
              <Grid item>
                <Typography variant="h6">Edit survey</Typography>
              </Grid>
              <Grid item>
              <IconButton aria-controls="menu-appbar"
                          title="Create new question"
                          aria-haspopup="true"
                          color="secondary"
                          size="small"
                          onClick={props.actions.createNewQuestion}
              >
                  <Add/>
              </IconButton>
              </Grid>
            </Grid>
            <section className={classes.surveySection}>
              <SurveyForm {...props}
                          {...props.actions}
                          onSubmit={props.actions.saveChanges}/>
            </section>
          </CardContent>
        </Card>
        <section style={{marginTop: '10px'}}>
          <Questions
            questions={props.questions}
            setQuestionFieldValue={props.actions.setQuestionFieldValue}
            saveChanges={props.actions.saveChanges}
            createNewOption={props.actions.createNewOption}
          />
        </section>
      </Container>
    </div>
  )
};


interface QuestionsSection {
  questions: Array<Question>,
  setQuestionFieldValue: (index: number, fieldName: QuestionFieldName, value: string | boolean) => void,
  saveChanges: () => void,
  createNewOption: (questionId: number | string) => void
}

function Questions(props: QuestionsSection) {
  const classes = useStyles();

  return (
    <div>
      {props.questions.map((question, index) => (
        <Card key={index}
              className={classes.questionCard}>
          <CardContent>
            <QuestionForm
              index={index}
              question={question}
              setQuestionFieldValue={props.setQuestionFieldValue}
              saveChanges={props.saveChanges}
            />
            <div>
              {question.options.map((option) => (
                <Grid container
                      // @ts-ignore
                      key={option.id}
                      className={classes.optionsContainer}
                      alignItems="flex-end">
                  <Grid item xs={1}>
                    {question.allowMultipleAnswer ? (
                        <CheckBoxOutlineBlankIcon color="disabled"
                                                  className={classes.questionTypeIcon}/>
                      )
                      :
                      (
                      <RadioButtonUncheckedIcon color="disabled"
                                                className={classes.questionTypeIcon}/>
                      )
                    }
                  </Grid>
                  <Grid item xs={11}>
                    <OptionForm option={option}/>
                  </Grid>
                </Grid>
              ))}
              <Button color="primary"
                      size="small"
                      onClick={() => (typeof question.id === 'string' || typeof question.id === 'number') && props.createNewOption(question.id)}
                      className={classes.addOptionLinkButton}>+ Добавить ответ</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
