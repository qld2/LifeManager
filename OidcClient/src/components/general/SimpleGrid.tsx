import {
  Button,
  PageHeader,
  Input,
  Pagination,
  Divider,
} from 'antd';
import React from 'react';
import './SimpleGrid.css';

type Props<ObjectType> = {
  data: ObjectType[],
  component: (x: ObjectType) => JSX.Element,
  componentSize: { width: number, height: number }

  width?: number,
  height?: number,
};

type State = {
  modalOpen: boolean,
};

class SimpleGrid<ObjectType> extends React.Component<Props<ObjectType>, State> {
  constructor(props : Props<ObjectType>) {
    super(props);

    this.state = {
      modalOpen: false,
    };
  }

  render() {
    const {
      width, height, data, component,
    } = this.props;

    const output:JSX.Element[] = [];
    data.forEach((datum:ObjectType):void => { output.push(component(datum)); });

    return (
      <div style={{ width }} className="SimpleGrid">{output}</div>
    );
  }
}

export default SimpleGrid;
