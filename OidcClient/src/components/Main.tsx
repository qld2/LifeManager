import React from 'react';
import { Dispatch } from 'redux';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { push } from 'react-router-redux';
import { RouteComponentProps } from 'react-router';
import { loadUser, CallbackComponent, userFound } from 'redux-oidc';
import { connect, ConnectedProps } from 'react-redux';
import { User } from 'oidc-client';

import { Button } from 'antd';
import 'antd/dist/antd.css';
import './Main.css';

//--

import userManager from 'util/userManager';
import useWindowDimensions, { Dimensions } from 'util/windowDimensions';
import { setDimensions } from 'reducer/applet/appletSlice';
import { AppState, AppDispatch } from 'src/Root'; // fix import resolution
import { HEADER_HEIGHT } from 'util/sizeConstants';

import AuthRoute from './general/AuthRoute';
import Callback from './Callback';
import App from './app/App';
import Homepage from './homepage/Homepage';
import { SIDEBAR_WIDTH } from './app/Sidebar';

// ____

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

type Props = PropsFromRedux & {};

function Main(props : Props) {
  const successCallback = (user : User) => {
    console.log('Logged In As:', user);
  };

  const errorCallback = (error: Error) => {
    console.error(error);
  };

  const setAppletDimensions = (windowDimensions: Dimensions) => {
    const { dispatch } = props;
    dispatch(setDimensions({
      width: windowDimensions.width - SIDEBAR_WIDTH,
      height: windowDimensions.height - HEADER_HEIGHT,
    }));
  };

  const { width, height } = useWindowDimensions(setAppletDimensions);
  return (
    <div style={{ width, height }}>
      <Switch>
        <Route path="/Callback">
          <CallbackComponent userManager={userManager} successCallback={successCallback} errorCallback={errorCallback}>
            <Callback userManager={userManager} />
          </CallbackComponent>
        </Route>
        <Route path="/Homepage">
          <Homepage />
        </Route>
        <AuthRoute path="/">
          <App width={width} height={height} />
        </AuthRoute>
      </Switch>
    </div>
  );
}

export default connector(Main);
