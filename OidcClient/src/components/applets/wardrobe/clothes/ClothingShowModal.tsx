import React from 'react';

import {
  Modal,
  Input,
  Button,
} from 'antd';

import {
  ChromePicker,
} from 'react-color';

import { connect, ConnectedProps } from 'react-redux';

import './ClothingShowModal.css';
import Function from 'util/Function';
import { ClothingDTO, addClothingArticle } from 'fetch/wardrobe';
import userManager from 'util/userManager';
import { AppState, AppDispatch } from 'src/Root';
import TagSelector from 'components/applets/wardrobe/general/TagSelector';
import TypeSelector from 'components/applets/wardrobe/general/TypeSelector';

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
  title?: string,
  visible?: boolean,
  onOk: (()=> void) | undefined,
  onCancel: (()=>void) | undefined,
  article?: ClothingDTO,
};

type State = {
  temp: number,
};

class ClothingShowModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      temp: -1,
    };
  }

  onOk = () => {
    const { onOk } = this.props;
    if (onOk) onOk();
  };

  render() {
    const {
      title, visible, onCancel,
      article,
    } = this.props;

    const json: string = `${JSON.stringify(article, null, '\t')}`;

    return (
      <Modal
        title={title}
        visible={visible}
        onCancel={onCancel}
        onOk={this.onOk}
        // style={{ width: 'fit-content' }}
        // width="fit-content"// {optionsOpen ? '90%' : undefined}
        footer={[
          <div className="ClothingShow-Footer">
            <Button type="primary" onClick={this.onOk}>
              Submit
            </Button>
          </div>,
        ]}
      >
        <div className="ClothingShowModal">
          <p>{json}</p>
        </div>
      </Modal>
    );
  }
}

export default connect(mapStateToProps)(ClothingShowModal);
