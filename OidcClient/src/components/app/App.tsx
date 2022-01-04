import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  PageHeader,
  Menu,
} from 'antd';
import {
  Switch,
} from 'react-router-dom';

import './App.css';

import { appletRoutes } from 'components/applets/appletRegistry';
import userManager from 'util/userManager';
import Sidebar from './Sidebar';

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
