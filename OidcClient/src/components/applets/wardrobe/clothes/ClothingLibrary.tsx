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
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import { push } from 'connected-react-router';

import 'antd/dist/antd.css';
import './ClothingLibrary.css';

import { getClothingLibrary, ClothingDTO, addClothingArticle } from 'fetch/wardrobe';
import Grid from 'components/general/Grid';
import SimpleGrid from 'components/general/SimpleGrid';
import { AppState, AppDispatch } from 'src/Root';
import { getSecret } from 'fetch/test';
import { compose } from 'redux';
import ClothingAddModal from './ClothingAddModal';
import ArticleCard from './ArticleCard';
import ClothingShowModal from './ClothingShowModal';

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

type Props = PropsFromRedux & {
};

type State = {
  loading: boolean,
  onAdd: null,
  data: ClothingDTO[],
  clothingAddModalOpen: boolean,
  clothingShowModalOpen: boolean,
  activeArticle?: ClothingDTO,
};

class ClothingLibrary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      loading: true,
      onAdd: null,
      data: [],
      clothingAddModalOpen: false,
      clothingShowModalOpen: false,
      activeArticle: undefined,
    };
  }

  fillData = (list: ClothingDTO[]): void => {
    console.log(list);
    this.setState({
      data: list,
    });
  };

  componentDidMount = () => {
    const { user } = this.props;
    if (user) getClothingLibrary(user.access_token, this.fillData, (msg) => { console.log('N_FAIL:', msg); });

    this.setState({
      loading: false,
    });
  };

  openClothingAddModal = () => {
    this.setState({
      clothingAddModalOpen: true,
    });
  };

  closeClothingAddModal = () => {
    this.setState({
      clothingAddModalOpen: false,
    });

    const { user } = this.props;
    if (user) getClothingLibrary(user.access_token, this.fillData, (msg) => { console.log('N_FAIL:', msg); });
  };

  openClothingShowModal = (article: ClothingDTO) => {
    this.setState({
      clothingShowModalOpen: true,
      activeArticle: article,
    });
  };

  closeClothingShowModal = () => {
    this.setState({
      clothingShowModalOpen: false,
    });
  };

  openArticleInfo = (article: ClothingDTO) => {
    // const { dispatch } = this.props;
    // dispatch(push(`${article.id}`));

    this.openClothingShowModal(article);
  };

  render() {
    const {
      loading, data, onAdd,
      activeArticle,
      clothingAddModalOpen: addModalOpen,
      clothingShowModalOpen: showModalOpen,
    } = this.state;

    return (
      <div className="ClothingLibrary">
        <PageHeader
          className="ClothingLibrary-PageHeader"
          backIcon={false}
          title="Clothing Library"
          extra={[
            <Button key="2">Edit</Button>,
            <Button key="1" onClick={this.openClothingAddModal}>Add</Button>,
          ]}
        />

        <ClothingAddModal title="Add Clothing Article" visible={addModalOpen} onOk={this.closeClothingAddModal} onCancel={this.closeClothingAddModal} />
        <ClothingShowModal
          title="View Article"
          visible={showModalOpen}
          onOk={this.closeClothingShowModal}
          onCancel={this.closeClothingShowModal}
          article={activeArticle}
        />

        <div className="ClothingLibrary-App">
          <Grid<ClothingDTO>
            width="100%"
            height="100%"
            rowSize={4}
            rowsPerPage={3}
            data={data}
            component={(article: ClothingDTO) => <Button onClick={() => this.openArticleInfo(article)}>Open Article Info</Button>}
            // component={(article: ClothingDTO) => <ArticleCard article={article} />}
          />
        </div>
      </div>
    );
  }
}

export default connector(ClothingLibrary);
