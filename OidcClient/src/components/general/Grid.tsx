import React from 'react';
import {
  Button,
  PageHeader,
  Input,
  Pagination,
  Divider,
} from 'antd';
import Modal from 'antd/lib/modal/Modal';
import './Grid.css';

import Function from 'util/Function';
import { HEADER_HEIGHT } from 'util/sizeConstants';
import ClothingFilterSelector from 'components/applets/wardrobe/general/ClothingFilterSelector';
import Filter from './Filter';
import IFilter from './IFilter';
import TestComponent from './TestComponent';
import SimpleGrid from './SimpleGrid';

export type ComponentSize = {
  width: number,
  height: number,
};

type Props<ObjectType> = {
  width: number,
  height: number,
  data: ObjectType[],
  component: Function<ObjectType, JSX.Element>,
  componentSize: ComponentSize,
  filterFactory: Function<Function<Function<ObjectType, boolean>, void>, JSX.Element>,
  searchFunc: (datum: ObjectType, searchText: string) => boolean,
};

type State<ObjectType> = {
  rowSize: number,
  rowsPerPage: number,
  filterModalOpen: boolean,
  searchText: string,
  currentPage: number,
  gridData: ObjectType[],

  currentFilter?: JSX.Element
  filterFunc: Function<ObjectType, boolean>,
};

class Grid<ObjectType> extends React.Component<Props<ObjectType>, State<ObjectType>> {
  constructor(props : Props<ObjectType>) {
    super(props);

    const { data } = props;
    const copiedData = data.filter((value: ObjectType) => true);

    this.state = {
      rowSize: this.calculateRowSize(),
      rowsPerPage: this.calculateRowsPerPage(),
      filterModalOpen: false,
      searchText: '',
      currentPage: 1,
      gridData: copiedData,
      filterFunc: (datum: ObjectType) => true,
    };
  }

  componentDidMount() {
    const { filterFactory } = this.props;

    this.setState({
      currentFilter: filterFactory(this.setFilterFunc),
    });
  }

  componentDidUpdate(prevProps: Props<ObjectType>) {
    const { data, height, width } = this.props;

    if (prevProps.data !== data) {
      this.setState({
        gridData: data,
      });
    }

    if (prevProps.height !== height || prevProps.width !== width) {
      this.setState({
        rowSize: this.calculateRowSize(),
        rowsPerPage: this.calculateRowsPerPage(),
      });
    }
  }

  calculateRowSize = ():number => {
    const { width, componentSize } = this.props;
    return Math.floor(width / componentSize.width);
  };

  calculateRowsPerPage = ():number => {
    const { height, componentSize } = this.props;
    return Math.floor((height - 2 * HEADER_HEIGHT) / componentSize.height);
  };

  createRow = (i: number):JSX.Element => {
    const { component, componentSize, width: gridWidth } = this.props;
    const { rowSize: modulus, gridData, rowsPerPage } = this.state;
    const { width: componentWidth, height: componentHeight } = componentSize;

    const rowSeperator = (key: number):JSX.Element => (
      <div
        key={key}
        style={{
          width: (gridWidth - modulus * componentWidth) / (modulus + 1),
          height: componentHeight,
        }}
      />
    );

    const output:JSX.Element[] = [rowSeperator(0)];
    let key = 1;
    for (let j = 0; j < modulus; j += 1) {
      if (i * modulus + j < gridData.length) {
        output.push(
          <div key={key}>
            {component(gridData[i * modulus + j])}
          </div>,
        );
        output.push(rowSeperator(key + 1));
        key += 2;
      } else {
        output.push(<div style={{ width: componentWidth, height: componentHeight }} key={key} />);
        output.push(rowSeperator(key + 1));
        key += 2;
      }
    }

    return <div style={{ width: gridWidth, height: componentHeight }} key={i} className="Grid-Row">{output}</div>;
  };

  createGrid = ():JSX.Element => {
    const {
      component, width,
    } = this.props;

    const {
      rowSize: modulus,
      rowsPerPage: rows,
      currentPage,
    } = this.state;

    const output:JSX.Element[] = [];

    const start:number = (currentPage - 1) * rows;
    for (let i = start; i < start + rows; i += 1) {
      output.push(this.createRow(i));
    }

    return <div style={{ width }} className="Grid-Full">{output}</div>;
  };

  onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { data, searchFunc } = this.props;
    const { filterFunc } = this.state;

    const searchText = e.target.value;
    const workingData = data.filter(filterFunc)
      .filter((datum: ObjectType) => searchFunc(datum, searchText));

    this.setState({
      gridData: workingData,
      searchText,
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

  setFilterFunc = (f: (datum: ObjectType) => boolean) => {
    this.setState({
      filterFunc: f,
    });
  };

  applyFilters = () => {
    const { data, searchFunc } = this.props;
    const { filterFunc, searchText } = this.state;

    const workingData = data.filter(filterFunc)
      .filter((datum: ObjectType) => searchFunc(datum, searchText));

    this.setState({
      filterModalOpen: false,
      gridData: workingData,
    });
  };

  render() {
    const {
      width, height, data,
    } = this.props;

    const {
      filterModalOpen, rowSize: modulus, rowsPerPage: rows, currentFilter,
      searchText,
    } = this.state;

    return (
      <div className="Grid" style={{ width, height }}>
        <PageHeader
          className="Grid-Header"
          backIcon={false}
          title={(
            <Input
              allowClear
              placeholder="Search"
              value={searchText}
              onChange={this.onSearchChange}
            />
          )}
          extra={[
            <Button key="1" onClick={this.openModal}>Filters</Button>,
          ]}
        />
        {this.createGrid()}
        {/* <SimpleGrid <ObjectType> /> */}
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
        >
          {currentFilter}
        </Modal>
      </div>
    );
  }
}

export default Grid;
