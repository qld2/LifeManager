import {
  Button,
  PageHeader,
  Input,
  Pagination,
  Divider,
} from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';
import Function from '../../util/Function';
import ClothingFilterSelector from '../applets/wardrobe/general/ClothingFilterSelector';
import './Grid.css';

type Props<ObjectType> = {
  rowSize: number,
  rowsPerPage: number,
  data: ObjectType[],
  component: (x: ObjectType) => JSX.Element,

  width?: number | string | undefined,
  height?: number | string | undefined,

  filterOptions?: Function<ObjectType, boolean>,
};

type State<ObjectType> = {
  filterModalOpen: boolean,
  searchText: string,
  currentPage: number,
  gridData: ObjectType[],
};

class Grid<ObjectType> extends React.Component<Props<ObjectType>, State<ObjectType>> {
  constructor(props : Props<ObjectType>) {
    super(props);

    this.state = {
      filterModalOpen: false,
      searchText: '',
      currentPage: 1,
      gridData: [],
    };
  }

  createRow = (i: number):JSX.Element => {
    const { rowSize: modulus, component } = this.props;
    const { gridData } = this.state;
    const output:JSX.Element[] = [];

    let key = 0;
    for (let j = 0; j < modulus; j += 1) {
      if (i * modulus + j < gridData.length) {
        output.push(
          <div key={key} className="Grid-Element">
            {component(gridData[i * modulus + j])}
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
    const {
      rowSize: modulus, rowsPerPage: rows, component,
    } = this.props;
    const { currentPage } = this.state;
    const output:JSX.Element[] = [];

    const start:number = (currentPage - 1) * rows;
    for (let i = start; i < start + rows; i += 1) {
      output.push(this.createRow(i));
    }

    // for (let i = 0; i < data.length; i += 1) {
    //   output.push(component(data[i]));
    // }

    return <div className="Grid-Full">{output}</div>;
    // return <div className="Grid-Body">{output}</div>;
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

  openModal = () => {
    this.setState({
      filterModalOpen: true,
    });
  };

  closeModal = () => {
    this.setState({
      filterModalOpen: false,
    });
  };

  applyFilters = () => {
    const { data } = this.props;

    const workingData = data.filter((value: ObjectType) => true);

    this.setState({
      filterModalOpen: false,
      gridData: workingData,
    });
  };

  render() {
    const {
      width, height, data, rowSize: modulus, rowsPerPage: rows,
    } = this.props;

    const { filterModalOpen } = this.state;

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
            <Button key="1" onClick={this.openModal}>Filters</Button>,
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

        <Modal
          title="Filters"
          visible={filterModalOpen}
          onCancel={this.closeModal}
          onOk={this.applyFilters}
          // footer={[
          //   <div className="ClothingAdd-Footer">
          //     <Button className="ClothingAdd-Button" type="ghost" onClick={this.optionsToggle}>
          //       More Options
          //     </Button>
          //     <Button type="primary" onClick={this.onOk}>
          //       Submit
          //     </Button>
          //   </div>,
          // ]}
        >
          <ClothingFilterSelector />
        </Modal>
      </div>
    );
  }
}

export default Grid;
