import {bindActionCreators} from "redux";
import {connect as reduxConnect, ConnectedProps} from "react-redux";
import {RootState} from "../store";
import SurveyResult from "../components/pages/SurveyResult/SurveyResult";
import {copyCode, setUpPage} from "../store/survey/results/actions";


const mapStateToProps = (state: RootState) => ({
  loggedUser: state.auth,
  notifications: state.notifications,
  ...state.surveyResults
});


const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators({
    setUpPage,
    copyCode
  }, dispatch)
});


const connector = reduxConnect(mapStateToProps, mapDispatchToProps);


export type PropsFromRedux = ConnectedProps<typeof connector>;

export const SurveyResultContainer = connector(SurveyResult);