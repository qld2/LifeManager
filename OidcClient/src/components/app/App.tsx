import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  PageHeader,
  Menu,
  Modal,
} from 'antd';
import {
  Switch,
} from 'react-router-dom';

import './App.css';

import { appletRoutes } from 'components/applets/appletRegistry';
import userManager from 'util/userManager';
import { HEADER_HEIGHT } from 'util/sizeConstants';
import { render } from 'react-dom';
import Sidebar, { SIDEBAR_WIDTH } from './Sidebar';
import Settings from './Settings';

type Props = {
  width: number,
  height: number,
};

type State = {
  settingModalOpen: boolean,
};

/* eslint-disable @typescript-eslint/no-shadow */
class App extends React.Component<Props, State> {
  constructor(props : Props) {
    super(props);

    this.state = {
      settingModalOpen: false,
    };
  }

  openSettingsModal = ():void => {
    this.setState({
      settingModalOpen: true,
    });
  };

  closeSettingsModal = ():void => {
    this.setState({
      settingModalOpen: false,
    });
  };

  render() {
    const { width, height } = this.props;
    const { settingModalOpen } = this.state;

    const viewWidth = width - SIDEBAR_WIDTH;
    const viewHeight = height - HEADER_HEIGHT;

    return (
      <div className="App" style={{ width, height }}>
        <PageHeader
          className="App-PageHeader"
          title="LifeManager"
          extra={[
            <Button key="2" onClick={this.openSettingsModal}>Settings</Button>,
            <Button key="1" type="primary" onClick={() => { userManager.removeUser(); }}>
              Log Out
            </Button>,
          ]}
        />
        <Modal
          visible={settingModalOpen}
          onOk={this.closeSettingsModal}
          onCancel={this.closeSettingsModal}
        >
          <Settings size={{ width: 100, height: 100 }} />
        </Modal>

        <div className="App-Window">
          <div className="App-Menu" style={{ width: SIDEBAR_WIDTH, height: viewHeight }}>
            <Sidebar />
          </div>
          <div className="App-Viewport" style={{ width: viewWidth, height: viewHeight }}>
            <Switch>
              {appletRoutes()}
            </Switch>
          </div>
        </div>

      </div>
    );
  }
}

export default connect(null, null)(App);
