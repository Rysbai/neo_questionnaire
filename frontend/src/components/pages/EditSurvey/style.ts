import {makeStyles} from "@material-ui/core/styles";


export const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(12)
  },

  surveySection: {
    marginTop: theme.spacing(1)
  },

  questionsSection: {
    marginTop: theme.spacing(2),
  },

  successIndicator: {
    borderRadius: '3px',
    border: `1px solid ${theme.palette.success.main}`,
    padding: theme.spacing(1),
    color: theme.palette.success.dark
  },

  addQuestionButton: {
    backgroundColor: theme.palette.secondary.dark,
    borderRadius: 25,
  },
  addQuestionIcon: {
    color: 'white',
    backgroundColor: 'transparent',
    "&:hover": {
      color: 'white',
      backgroundColor: 'transparent'
    }
  },

  addOptionLinkButton: {
    marginTop: theme.spacing(1)
  },

  questionTypeIcon: {
    verticalAlign: 'bottom'
  },

  questionCard: {
    marginTop: theme.spacing(2)
  },
  optionsContainer: {
    marginBottom: theme.spacing(1)
  }
}));