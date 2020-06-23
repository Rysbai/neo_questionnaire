import React from "react";
import {PropsFromRedux} from "../../containers/Auth";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  caption: {
    marginTop: theme.spacing(1)
  }
}));


export default function (props: PropsFromRedux) {
  const classes = useStyles();

  React.useEffect(() => {
    props.actions.getLoggedUser();
  }, [props.actions]);

  return (
      <Dialog open={!props.loggedUser.id}>
        <DialogTitle id="simple-dialog-title">Введите свое имя чтобы продолжить</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            onChange={({target}) => props.actions.setNameValue(target.value)}
            value={props.nameValue}
            label="Ваше имя"
          />
          <Typography
            className={classes.caption}
            variant="caption"
            color="primary">*Ваше имя не будет указываться в анонимных вопросах</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={props.actions.auth}
            variant="contained"
            color="primary"
            size="small"
            >Продолжить</Button>
        </DialogActions>
      </Dialog>
  )
}