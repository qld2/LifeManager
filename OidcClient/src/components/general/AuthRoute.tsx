import React, { ReactNode } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import { User } from 'oidc-client';
import { UserState } from 'redux-oidc';

import { AppState, AppDispatch } from '../../store'; // fix import resolution

function mapStateToProps(state : AppState) {
  return {
    user: state.oidc.user,
    identity: state.identity,
  };
}

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  path:string
  children: ReactNode
};

function AuthRoute({
  user, identity, path, children = <div />,
} : Props) {
  if (user == null || user.expired) return (<Redirect to="/Homepage" />);
  return <div>{children}</div>;
}

export default connector(AuthRoute);

/*
type RootState = {
  oidc: UserState
};

function mapStateToProps(state : RootState) {
  return {
    user: state.oidc.user,
  };
}

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  path:string
  children: ReactNode
};

type State = {
  x: string
};

class AuthRoute extends React.Component<Props, State> {
  public static defaultProps = {
    user: undefined,
    path: '/',
  };

  constructor(props: Props) {
    super(props);
  }

  render() {
    const { user, path, children } = this.props;

    if (!user || user.expired) return (<Redirect to="/" />);
    // return (<Route path={path}>{children}</Route>);
    return <h1>Logged In</h1>;
  }
}

export default connector(AuthRoute);
*/
