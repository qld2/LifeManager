import React from 'react';
import { connect } from 'react-redux';
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

import './App.css';

import applets from 'components/applets/appletRegistry';
import Dashboard from 'components/applets/dashboard/Dashboard';
import userManager from 'util/userManager';
import { IApplet } from 'components/applets/IApplet';
import AuthRoute from '../general/AuthRoute';
import Sidebar from './Sidebar';
import { getSecret } from '../../fetch/test';
import ClothingLibrary from '../applets/wardrobe/ClothingLibrary';

const appletRoutes = ():JSX.Element[] => {
  const result:JSX.Element[] = [];

  let key = 0;
  applets.forEach((applet) => {
    result.push(<Route key={key} path={`/${applet.handle}`}>{applet.component}</Route>);
    key += 1;
  });

  return result;
};

/* eslint-disable @typescript-eslint/no-shadow */
function App(props : {}) {
  return (
    <div className="App">
      <PageHeader
        className="App-PageHeader"
        title="LifeManager"
        extra={[
          <Button key="2" onClick={() => {}}>Settings</Button>,
          <Button key="1" type="primary" onClick={() => { userManager.removeUser(); }}>
            Log Out
          </Button>,
        ]}
      />

      <div className="App-Window">
        <div className="App-Menu">
          <Sidebar />
        </div>
        <div className="App-Viewport">
          <Switch>
            {appletRoutes()}
          </Switch>
        </div>
      </div>

    </div>
  );
}

export default connect(null, null)(App);
