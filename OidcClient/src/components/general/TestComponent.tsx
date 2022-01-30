import React from 'react';
import {
  Switch,
} from 'antd';

type Props = {
};

type State = {
  on: boolean,
};

class Grid<ObjectType> extends React.Component<Props, State> {
  constructor(props : Props) {
    super(props);

    this.state = {
      on: false,
    };
  }

  private flipSwitch = () => {
    const { on } = this.state;

    this.setState({
      on: !on,
    });
  };

  render() {
    const { on } = this.state;
    return (
      <Switch checked={on} onClick={this.flipSwitch} />
    );
  }
}

export default Grid;
