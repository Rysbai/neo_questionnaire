import React from "react";
import {Box, TextField} from "@material-ui/core";
import {Option} from "../../../api/types";


interface OptionForm {
  option: Option
}

export default function (props: OptionForm) {

  return (
      <TextField
        multiline
        fullWidth
        name="payload"
        value={props.option.payload}
      />
  )
}