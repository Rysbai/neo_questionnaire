import {bindActionCreators} from "redux";
import {connect as reduxConnect, ConnectedProps} from "react-redux";
import Login from "../components/pages/Login";
import {RootState} from "../store";
import {auth, setNameValue} from "../store/auth/actions";


const mapStateToProps = (state: RootState) => ({
  ...state.auth
});


const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators({
    setNameValue,
    auth
  }, dispatch)
});


const connector = reduxConnect(mapStateToProps, mapDispatchToProps);

export type PropsFromRedux = ConnectedProps<typeof connector>

export const LoginContainer = connector(Login);