import {bindActionCreators} from "redux";
import {connect as reduxConnect, ConnectedProps} from "react-redux";
import {RootState} from "../store";
import Index from "../components/pages/Index";
import {createSurvey} from "../store/survey/create-edit/create/actions";
import getCreateEditSurveyBaseActions from "../store/survey/create-edit/base/actions";
import {CREATE_SURVEY_ACTION_TYPE_PREFIX} from "../store/survey/create-edit/create/types";
const mapStateToProps = (state: RootState) => ({
  ...state.auth,
  createSurvey: state.createSurvey

});


const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators({
    ...getCreateEditSurveyBaseActions(CREATE_SURVEY_ACTION_TYPE_PREFIX),
    createSurvey
  }, dispatch)
});


const connector = reduxConnect(mapStateToProps, mapDispatchToProps);

export type IndexPropsFromRedux = ConnectedProps<typeof connector>

export const IndexContainer = connector(Index);