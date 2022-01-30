import React from 'react';
import {
  PageHeader,
  Input,
  Pagination,
  Divider,
} from 'antd';
import Modal from 'antd/lib/modal/Modal';
// import './Button.css';

import Function from 'util/Function';
import TestComponent from './TestComponent';

type Props = {
  width: number,
  height: number,
  color: string,
};

type State = {
  temp: boolean,
};

class Button extends React.Component<Props, State> {
  constructor(props : Props) {
    super(props);

    this.state = {
      temp: false,
    };
  }

  render() {
    const {
      width, height, color,
    } = this.props;

    const {
      temp,
    } = this.state;

    return (
      <div style={{ width: 'fit-content', backgroundColor: color }}>
        OK
      </div>
    );
  }
}

export default Button;
