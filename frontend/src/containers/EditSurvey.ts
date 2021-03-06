import {bindActionCreators} from "redux";
import {connect as reduxConnect, ConnectedProps} from "react-redux";
import {RootState} from "../store";
import {
  createNewOption,
  createNewQuestion,
  editOptionPayload,
  publishSurvey,
  retrieveSurvey,
  saveChanges,
  setQuestionFieldValue
} from "../store/survey/create-edit/edit/actions";
import getCreateEditSurveyBaseActions from "../store/survey/create-edit/base/actions";
import {EDIT_SURVEY_TYPE_PREFIX} from "../store/survey/create-edit/edit/types";

import EditSurvey from "../components/pages/EditSurvey";

const mapStateToProps = (state: RootState) => ({
  ...state.auth,
  ...state.editSurvey
});


const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators({
    ...getCreateEditSurveyBaseActions(EDIT_SURVEY_TYPE_PREFIX),
    saveChanges,
    publishSurvey,
    retrieveSurvey,
    createNewQuestion,
    createNewOption,
    setQuestionFieldValue,
    editOptionPayload
  }, dispatch)
});


const connector = reduxConnect(mapStateToProps, mapDispatchToProps);

export type PropsFromRedux = ConnectedProps<typeof connector>;

export const EditSurveyContainer = connector(EditSurvey);
