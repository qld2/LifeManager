import React from 'react';
import 'antd/dist/antd.css';

import TShirtIcon from 'resources/TShirtIcon';
import { Button } from 'antd';
import { connect, ConnectedProps } from 'react-redux';

import './ArticlePage.css';

import Icon from '@ant-design/icons';
import { ClothingDTO } from 'fetch/wardrobe';
import { AppState, AppDispatch } from 'src/Root';

const mapStateToProps = (state: AppState) => ({
  pathname: state.router.location.pathname,
});

function mapDispatchToProps(dispatch : AppDispatch) {
  return {
    dispatch,
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
// article?: ClothingDTO
};

type State = {
};

class ArticlePage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const { pathname } = this.props;
    return (
      <div className="ArticlePage">
        <h1>{pathname}</h1>
      </div>
    );
  }
}

export default connector(ArticlePage);
