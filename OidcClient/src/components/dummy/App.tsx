import React from 'react';
import { Dispatch } from 'redux';
import {
  Button,
  PageHeader,
  Menu,
} from 'antd';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';

import { AppState, AppDispatch } from 'src/Root'; 
import './App.css';
import { getSecret } from '../../fetch/test';

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

/* eslint-disable @typescript-eslint/no-shadow */
function App({ user } : Props) {
  const printUser = () => { console.log(user); };
  const printSecret = () => { if (user) getSecret(user.access_token, null, null); };

  return (
    <div className="App">

      <Button
        onClick={printUser}
      >
        Get User
      </Button>
      <Button
        onClick={printSecret}
      >
        Get Secret
      </Button>
    </div>
  );
}

export default connector(App);
