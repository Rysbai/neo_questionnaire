import {makeStyles} from "@material-ui/core/styles";


export const useStyles = makeStyles((theme) => ({
  surveySection: {
    marginTop: theme.spacing(1)
  },

  successIndicator: {
    borderRadius: '3px',
    border: `1px solid ${theme.palette.success.main}`,
    padding: theme.spacing(1),
    color: theme.palette.success.dark
  }
}));