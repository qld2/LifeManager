import React from 'react';
import {
  Button,
  PageHeader,
  Input,
  Pagination,
  Divider,
} from 'antd';
import Modal from 'antd/lib/modal/Modal';
import './List.css';

import Function from 'util/Function';
import TestComponent from './TestComponent';

type Props<ObjectType> = {
  width: number,
  height: number,
  data: ObjectType[],
  component: Function<ObjectType, JSX.Element>,
  labelFunc: (obj: ObjectType) => string,
};

type State<ObjectType> = {
  rows: ObjectType[][],
};

class List<ObjectType> extends React.Component<Props<ObjectType>, State<ObjectType>> {
  constructor(props : Props<ObjectType>) {
    super(props);

    this.state = {
      rows: this.calculateRows(),
    };
  }

  renderRow = (row: ObjectType[]):JSX.Element => {
    const { component } = this.props;
    const list:JSX.Element[] = [];
    let key:number = 0;

    row.forEach((datum: ObjectType) => {
      list.push(<div key={key}>{component(datum)}</div>);
      key += 1;
    });

    return (<div className="List-Row">{list}</div>);
  };

  generateList = ():JSX.Element => {
    const { rows } = this.state;

    console.log(rows);

    const output:JSX.Element[] = [];
    let key:number = 0;

    rows.forEach((row: ObjectType[]) => {
      output.push(<div key={key}>{this.renderRow(row)}</div>);
      key += 1;
    });

    return (<div>{output}</div>);
  };

  private calculateTagSize(tag: string):number {
    const { width, data, labelFunc } = this.props;

    return 10;
  }

  private calculateRows():ObjectType[][] {
    const { width, data, labelFunc } = this.props;

    const output:ObjectType[][] = [];
    let row:ObjectType[] = [];
    let running:number = 0;
    for (let i = 0; i < data.length; i += 1) {
      const tagSize:number = this.calculateTagSize(labelFunc(data[i]));
      if (running + tagSize < width) {
        row.push(data[i]);
        running += tagSize;
      } else {
        output.push(row);
        row = [];
        running = 0;
      }
    }
    output.push(row);

    return output;
  }

  render() {
    const {
      width, height, data,
    } = this.props;

    return (
      <div className="List" style={{ width, height }}>
        {this.generateList()}
      </div>
    );
  }
}

export default List;
