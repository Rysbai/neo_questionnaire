import React from "react";
import {Box, TextField} from "@material-ui/core";

interface QuestionFormProps {

}

export default function (props: QuestionFormProps) {

  return (
    <div>
      <Box>
        <TextField
          fullWidth
          name="title"
          label="Заголовок"
          // value={props.title}
          // error={!!props.titleError}
          // helperText={props.titleError}
          // onChange={onFieldValueChange}
          // onBlur={props.isEdit && props.onSubmit}
        />
      </Box>
    </div>
  )
}