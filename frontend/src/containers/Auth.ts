import {bindActionCreators} from "redux";
import {connect as reduxConnect, ConnectedProps} from "react-redux";
import {RootState} from "../store";
import {auth, getLoggedUser, setNameValue} from "../store/auth/actions";
import LoginModal from "../components/dialogs/AuthDialog";


const mapStateToProps = (state: RootState) => ({
  ...state.auth
});


const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators({
    getLoggedUser,
    setNameValue,
    auth
  }, dispatch)
});


const connector = reduxConnect(mapStateToProps, mapDispatchToProps);

export type PropsFromRedux = ConnectedProps<typeof connector>

export const AuthContainer = connector(LoginModal);
