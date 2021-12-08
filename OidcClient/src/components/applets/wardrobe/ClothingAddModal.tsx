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

import './ClothingAddModal.css';
import Function from 'util/Function';
import { ClothingDTO, addClothingArticle } from 'fetch/wardrobe';
import userManager from 'util/userManager';
import { AppState, AppDispatch } from 'src/store';

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
};

type State = {
  optionsOpen: boolean,

  name: string,
  type: string,
  color: string,

  size?: string,
  brand?: string
};

class ClothingAddModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      optionsOpen: false,
      name: '',
      type: '',
      color: '#000000',
    };
  }

  optionsToggle = () => {
    const { optionsOpen } = this.state;
    this.setState({ optionsOpen: !optionsOpen });
  };

  onOk = () => {
    const { user, onOk } = this.props;
    if (onOk) onOk();

    const article:ClothingDTO = this.state;
    console.log(article);
    addClothingArticle(user?.access_token, article, null, null);
  };

  render() {
    const {
      title, visible, onCancel,
    } = this.props;

    const { color, optionsOpen } = this.state;
    const article:ClothingDTO = this.state;
    return (

      <Modal
        title={title}
        visible={visible}
        onCancel={onCancel}
        onOk={this.onOk}
        // style={{ width: 'fit-content' }}
        width="fit-content"// {optionsOpen ? '90%' : undefined}
        footer={[
          <div className="ClothingAdd-Footer">
            <Button className="ClothingAdd-Button" type="ghost" onClick={this.optionsToggle}>
              More Options
            </Button>
            <Button type="primary" onClick={this.onOk}>
              Submit
            </Button>
          </div>,
        ]}
      >
        <div className="ClothingAdd-Full">
          <div className="ClothingAdd-Default">
            <div className="ClothingAdd-Left">
              <h3 className="ClothingAdd-Title">Name:</h3>
              <Input
                size="large"
                className="ClothingAdd-Input"
                placeholder="Name"
                onChange={(e) => { this.setState({ name: e.target.value }); }}
              />
              <h3 className="ClothingAdd-Title">Type:</h3>
              <Input
                size="large"
                className="ClothingAdd-Input"
                placeholder="Type"
                onChange={(e) => { this.setState({ type: e.target.value }); }}
              />
            </div>
            <div className="ClothingAdd-Right">
              <h3 className="ClothingAdd-Title">Color:</h3>
              <ChromePicker color={color} onChange={(e) => { this.setState({ color: e.hex }); }} />
            </div>
          </div>

          {optionsOpen
            ? (
              <div className="ClothingAdd-Expansion">
                <div className="ClothingAdd-Separator" />
                <div className="ClothingAdd-Tags" />
              </div>
            )
            : <div style={{ width: 0, height: 0 }} />}
        </div>
      </Modal>
    );
  }
}

export default connect(mapStateToProps)(ClothingAddModal);
