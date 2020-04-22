import React from "react";
import {PropsFromRedux} from "../../containers/Auth";
import {Button, Dialog, DialogTitle, TextField} from "@material-ui/core";


export default function (props: PropsFromRedux) {
  React.useEffect(() => {
    props.actions.getLoggedUser();
  }, []);

  return (
      <Dialog open={props.loggedUser.id.length <= 0}>
        <DialogTitle id="simple-dialog-title">Введите свое имя чтобы продолжить</DialogTitle>
        <TextField
          onChange={({target}) => props.actions.setNameValue(target.value)}
          value={props.nameValue}
          label="Ваше имя"
        />
        <Button
          onClick={props.actions.auth}
          variant="contained"
          color="primary"
          >Продолжить</Button>
      </Dialog>
  )
}