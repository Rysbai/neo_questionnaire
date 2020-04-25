import React from "react";
import {Box, Button, Checkbox, FormControlLabel, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Survey} from "../../../api/types";
import {DateTimePicker} from "@material-ui/pickers";


interface SurveyFormProps extends Survey {
  titleError: string,
  descriptionError: string,

  setSurveyFieldValue: any,
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
          onChange={onFieldValueChange}
        />
      </Box>
      <Box className={classes.miniSection}>
        <DateTimePicker
          autoOk
          ampm={false}
          disableFuture
          value={props.startAt}
          name="startAt"
          onChange={(value) => props.setSurveyFieldValue('startAt', value)}
          label="Начало опроса"
        />
      </Box>
      <Box className={classes.miniSection}>
        <DateTimePicker
          autoOk
          ampm={false}
          disablePast
          value={props.endAt}
          name="endAt"
          onChange={(value) => props.setSurveyFieldValue('endAt', value)}
          label="Конец опроса"
        />
      </Box>
      <Box className={classes.miniSection}>
        <FormControlLabel
          control={
            <Checkbox
              checked={props.isAnonymous}
              onChange={({target}) => props.setSurveyFieldValue('isAnonymous', target.checked)}
              name="isAnonymous"
              color="primary"
            />
          }
          label="Анонимный опросник"
        />
      </Box>
      <Box className={classes.miniSection}>
        <Button
          className={classes.miniSection}
          variant="contained"
          color="secondary"
          onClick={props.onSubmit}
        >Создать новый</Button>
      </Box>
    </div>
  )
}
