import makeStyles from "@material-ui/core/styles/makeStyles";
import {Theme} from "@material-ui/core";

export default makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1
  },

  logo: {
    flexGrow: 1
  },

  verticalDivider: {
    height: '30px',
    width: '2px',
    backgroundColor: theme.palette.grey.A200,
    borderRadius: '3px',
    flexGrow: 1
  },
  toolsCard: {
    marginRight: theme.spacing(2)
  },
  toolIcons: {
    color: theme.palette.grey.A700
  },
  successStatusIcon: {
    color: theme.palette.success.main
  },

  savingProgress: {
    marginRight: '10px',
    marginLeft: '10px',
    marginTop: '3px'
  }

}))
