import {bindActionCreators} from "redux";
import {connect as reduxConnect, ConnectedProps} from "react-redux";
import {RootState} from "../store";
import SurveyResult from "../components/pages/SurveyResult/SurveyResult";
import {setUpPage} from "../store/survey/results/actions";


const mapStateToProps = (state: RootState) => ({
  loggedUser: state.auth,
  ...state.surveyResults
});


const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators({
    setUpPage
  }, dispatch)
});


const connector = reduxConnect(mapStateToProps, mapDispatchToProps);


export type PropsFromRedux = ConnectedProps<typeof connector>;

export const SurveyResultContainer = connector(SurveyResult);