import React from 'react';
import {
  Button,
  PageHeader,
  Menu,
  Row,
  Col,
  Empty,
  Spin,
  Modal,
} from 'antd';
import { connect, ConnectedProps } from 'react-redux';

import 'antd/dist/antd.css';
import './ClothingFilterSelector.css';

import { getClothingLibrary, ClothingDTO, addClothingArticle } from 'fetch/wardrobe';
import Grid from 'components/general/Grid';
import SimpleGrid from 'components/general/SimpleGrid';
import { AppState, AppDispatch } from 'src/store';
import { getSecret } from 'fetch/test';
import { SelectOutlined } from '@ant-design/icons';
import TagSelector from './TagSelector';
import TypeSelector from './TypeSelector';

const mapStateToProps = (state: AppState) => ({
  user: state.oidc.user,
});

function mapDispatchToProps(dispatch : AppDispatch) {
  return {
    dispatch,
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {};

type State = {
  selected: string[],
};

class ClothingFilterSelector extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selected: [],
    };
  }

  render() {
    // const {
    // } = this.state;
    return (
      <div className="ClothingFilterSelector">
        <h3>Tags:</h3>
        <TagSelector
          selected={['Pants']}
          onChange={() => {}}
        />
        <h3>Types:</h3>
        <TypeSelector
          selected="Pants"
          onChange={() => {}}
        />
      </div>
    );
  }
}

export default connector(ClothingFilterSelector);
