import React from "react";
import {Box, Button, Checkbox, FormControlLabel, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Survey} from "../../../api/types";


interface SurveyFormProps extends Survey {
  titleError: string,
  descriptionError: string,

  setSurveyFieldValue: any,
  isEdit: boolean,
  onSubmit: any,
  onCancel: any
}


const useStyles = makeStyles((theme) => ({
  miniSection: {
    marginTop: theme.spacing(1)
  }
}));


export default function (props: SurveyFormProps) {
  const classes = useStyles();
  const onFieldValueChange = ((event: React.ChangeEvent<HTMLInputElement>) => {
    props.setSurveyFieldValue(
      event.currentTarget.name,
      event.currentTarget.value
    )
  });

  return (
    <div>
      <Box>
        <TextField
          fullWidth
          name="title"
          label="Название"
          value={props.title}
          error={!!props.titleError}
          helperText={props.titleError}
          onChange={onFieldValueChange}
          onBlur={props.isEdit && props.onSubmit}
        />
      </Box>
      <Box className={classes.miniSection}>
        <TextField
          className={classes.miniSection}
          multiline
          fullWidth
          name="description"
          label="Краткое описние"
          error={!!props.descriptionError}
          helperText={props.descriptionError}
          value={props.description}
          onBlur={props.isEdit &&  props.onSubmit}
          onChange={onFieldValueChange}
        />
      </Box>
      <Box className={classes.miniSection}>
        <FormControlLabel
          control={
            <Checkbox
              checked={props.isAnonymous}
              onChange={({target}) => props.setSurveyFieldValue('isAnonymous', target.checked)}
              name="isAnonymous"
              onBlur={props.isEdit && props.onSubmit}
              color="primary"
            />
          }
          label="Анонимный опросник"
        />
      </Box>
        {!props.isEdit && (
            <Box className={classes.miniSection}>
              <Button
              className={classes.miniSection}
              variant="contained"
              color="secondary"
              onClick={props.onSubmit}
            >Далее</Button>
          </Box>
        )}
    </div>
  )
}
