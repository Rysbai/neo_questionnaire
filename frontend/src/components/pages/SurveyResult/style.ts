import {makeStyles} from "@material-ui/core/styles";


export const useStyles = makeStyles((theme) => ({
  container: {
    paddingBottom: theme.spacing(3)
  }
}));


export const surveyInfoUseStyles = makeStyles((theme) => ({
  code: {
    marginTop: theme.spacing(2)
  },
  barCode: {
    marginTop: theme.spacing(1)
  }
}));