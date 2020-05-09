import {makeStyles} from "@material-ui/core/styles";


export const useStyles = makeStyles((theme) => ({
  surveySection: {
    marginTop: theme.spacing(1)
  },

  changesIndicator: {
    "&$buttonDisabled": {
        color: '#3FB765'
    }
  }
}));