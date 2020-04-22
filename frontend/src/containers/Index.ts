import {bindActionCreators} from "redux";
import {connect as reduxConnect, ConnectedProps} from "react-redux";
import {RootState} from "../store";
import Index from "../components/pages/Index";

const mapStateToProps = (state: RootState) => ({
  ...state.auth
});


const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators({

  }, dispatch)
});


const connector = reduxConnect(mapStateToProps, mapDispatchToProps);

export type IndexPropsFromRedux = ConnectedProps<typeof connector>

export const IndexContainer = connector(Index);