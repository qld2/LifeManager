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

class SimpleGrid<ObjectType> extends React.Component<Props<ObjectType>, State<ObjectType>> {
  constructor(props : Props<ObjectType>) {
    super(props);

    this.state = {
      searchText: '',
      currentPage: 1,
    };
  }

  createGrid = ():JSX.Element[] => {
    const {
      data, rowSize: modulus, rowsPerPage: rows, component,
    } = this.props;
    const { currentPage } = this.state;
    const output:JSX.Element[] = [];

    for (let i = 0; i < data.length; i += 1) {
      output.push(
        <div key={i} className="SimpleGrid-Element">
          {component(data[i])}
        </div>,
      );
    }

    return output;
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
      <div className="SimpleGrid" style={{ width, height }}>
        <PageHeader
          className="SimpleGrid-Header"
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
        <div className="SimpleGrid-Body">
          {this.createGrid()}
        </div>
        <div className="SimpleGrid-Footer">
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

export default SimpleGrid;
