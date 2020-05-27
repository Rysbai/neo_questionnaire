import React from "react";
import {Box, Checkbox, FormControlLabel, TextField} from "@material-ui/core";
import {Question} from "../../../api/types";
import {QuestionFieldName} from "../../../store/survey/create-edit/edit/types";


interface QuestionFormProps {
  index: number,
  question: Question,
  setQuestionFieldValue: (index: number, fieldName: QuestionFieldName, value: string | boolean) => void,
  saveChanges: () => void
}


export default function (props: QuestionFormProps) {
  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    props.setQuestionFieldValue(props.index, event.currentTarget.name, event.currentTarget.value)
  };
  return (
    <div>
      <Box>
        <TextField
          multiline
          fullWidth
          name="payload"
          value={props.question.payload}
          onChange={handleFieldChange}
          onBlur={props.saveChanges}
        />
      </Box>
      <Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={props.question.allowMultipleAnswer}
              name="allowedMultipleAnswer"
              color="primary"
              // @ts-ignore
              onChange={
                ({target}) =>
                  props.setQuestionFieldValue(props.index, 'allowMultipleAnswer', target.checked)}
              onBlur={props.saveChanges}
            />
          }
          label="Множественный выбор"
        />
      </Box>
    </div>
  )
}