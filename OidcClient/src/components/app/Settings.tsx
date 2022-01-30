import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  PageHeader,
  Menu,
  Modal,
} from 'antd';

type Props = {
  size: { width: number, height: number }
};

type State = {
  settingModalOpen: boolean,
};

/* eslint-disable @typescript-eslint/no-shadow */
class Settings extends React.Component<Props, State> {
  constructor(props : Props) {
    super(props);

    this.state = {
      settingModalOpen: false,
    };
  }

  render() {
    const { size } = this.props;

    return (
      <div className="Settings" style={size} />
    );
  }
}

export default Settings;
