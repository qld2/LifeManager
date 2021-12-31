import React, { ReactNode } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import { User, UserManager } from 'oidc-client';
import { UserState } from 'redux-oidc';

import { AppState, AppDispatch } from 'src/Root'; // fix import resolution
import { login, logout } from '../reducer/identity/identitySlice';

function mapStateToProps(state : AppState) {
  return {
    user: state.oidc.user,
  };
}

function mapDispatchToProps(dispatch : AppDispatch) {
  return {
    dispatch,
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  userManager: UserManager
};

type State = {};

class Callback extends React.Component<Props, State> {
  public static defaultProps = {};

  render() {
    const {
      user,
    } = this.props;

    return (user == null
      ? <h1>ID NULL</h1>
      : <Redirect to="/" />);
  }
}

export default connector(Callback);

//------------------------

// function mapStateToProps(state : AppState) {
//   return {
//     user: state.oidc.user,
//     identity: state.identity,
//   };
// }

// function mapDispatchToProps(dispatch : AppDispatch) {
//   return {
//     loginUser: (user: User | null) => dispatch(login(user)),

//     dispatch,
//   };
// }

// const connector = connect(mapStateToProps, mapDispatchToProps);
// type PropsFromRedux = ConnectedProps<typeof connector>;

// type Props = PropsFromRedux & {
//   userManager: UserManager
//   children: ReactNode
// };

// async function Callback({ identity, loginUser, userManager, children } : Props) {
//     const UMUser = await userManager.getUser();
//     console.log('User:', UMUser);
//     console.log('Before:', identity);
//     props.dispatch(loginUser(UMUser));
//     console.log('After:', identity);

//   return <h1>OK</h1>;
// }

// export default connector(Callback);
