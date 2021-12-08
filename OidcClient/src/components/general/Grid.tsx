import {
  Button,
  PageHeader,
  Input,
  Pagination,
  Divider,
} from 'antd';
import React from 'react';
import './Grid.css';

type Props<ObjectType> = {
  rowSize: number,
  rowsPerPage: number,
  data: ObjectType[],
  component: (x: ObjectType) => JSX.Element,

  width?: number | string | undefined,
  height?: number | string | undefined,
};

type State<ObjectType> = {
  searchText: string,
  currentPage: number,
};

class Grid<ObjectType> extends React.Component<Props<ObjectType>, State<ObjectType>> {
  constructor(props : Props<ObjectType>) {
    super(props);

    this.state = {
      searchText: '',
      currentPage: 1,
    };
  }

  createRow = (i: number):JSX.Element => {
    const { data, rowSize: modulus, component } = this.props;
    const output:JSX.Element[] = [];

    let key = 0;
    for (let j = 0; j < modulus; j += 1) {
      if (i * modulus + j < data.length) {
        output.push(
          <div key={key} className="Grid-Element">
            {component(data[i * modulus + j])}
          </div>,
        );
        key += 1;
      } else {
        output.push(<div key={key} className="Grid-Element" />);
        key += 1;
      }
    }

    return <div key={i} className="Grid-Row">{output}</div>;
  };

  createGrid = ():JSX.Element => {
    const { data, rowSize: modulus, rowsPerPage: rows } = this.props;
    const { currentPage } = this.state;
    const output:JSX.Element[] = [];

    const start:number = (currentPage - 1) * rows;
    for (let i = start; i < start + rows; i += 1) {
      output.push(this.createRow(i));
    }

    return <div className="Grid-Full">{output}</div>;
  };

  onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);

    this.setState({
      searchText: e.target.value,
    });
  };

  onPageChange = (pageNumber: number) => {
    this.setState({
      currentPage: pageNumber,
    });
  };

  render() {
    const {
      width, height, data, rowSize: modulus, rowsPerPage: rows,
    } = this.props;

    return (
      <div className="Grid" style={{ width, height }}>
        <PageHeader
          className="Grid-Header"
          backIcon={false}
          title={(
            <Input
              allowClear
              onChange={this.onSearchChange}
            />
          )}
          extra={[
            <Button key="1">Filters</Button>,
          ]}
        />
        {this.createGrid()}
        <div className="Grid-Footer">
          <Pagination
            defaultCurrent={1}
            total={data.length}
            pageSize={modulus * rows}
            onChange={this.onPageChange}
          />
        </div>
      </div>
    );
  }
}

export default Grid;
