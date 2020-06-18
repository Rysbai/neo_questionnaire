import React from "react";
import {TextField} from "@material-ui/core";
import {Option} from "../../../api/types";


interface OptionForm {
  option: Option,
  editOptionPayload: (questionIndex: number, optionIndex: number, payload: string) => void,
  questionIndex: number,
  optionIndex: number,
  saveChanges: () => void
}

export default function (props: OptionForm) {

  return (
      <TextField
        multiline
        fullWidth
        onChange={({target}) =>
          props.editOptionPayload(props.questionIndex, props.optionIndex, target.value)}
        name="payload"
        value={props.option.payload}
        onBlur={props.saveChanges}
      />
  )
}