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

import './TypeSelector.css';
import Function from 'util/Function';
import { ClothingDTO, addClothingArticle } from 'fetch/wardrobe';
import userManager from 'util/userManager';
import { AppState, AppDispatch } from 'src/Root';

type ClothingType = string;
const clothingTypes: ClothingType[] = ['Shirt', 'Pants', 'Shoes'];

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
  className?: string
  selected: string
  onChange: Function<string, void>
};

type State = {
  visible: boolean,
};

class TypeSelector extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      visible: false,
    };
  }

  componentDidMount() {

  }

  onClick = () => {
    this.setState({
      visible: true,
    });
  };

  onConfirm = () => {
    this.setState({
      visible: false,
    });
  };

  generateButtons = () : JSX.Element => {
    const {
      selected,
      onChange,
    } = this.props;

    const output: JSX.Element[] = [];

    for (let i:number = 0; i < clothingTypes.length; i += 1) {
      output.push(
        <Button
          className="TypeSelector-Button"
          type={selected === clothingTypes[i] ? 'primary' : 'default'}
          onClick={() => { onChange(clothingTypes[i]); }}
        >
          {clothingTypes[i]}
        </Button>,
      );
    }

    return (
      <div>
        {output}
      </div>
    );
  };

  render() {
    const {
      className,
      user,
    } = this.props;

    const {
      visible,
    } = this.state;

    return (
      <div className="TypeSelector">
        <Button
          className={className}
          size="large"
          type="ghost"
          onClick={this.onClick}
        >
          Select
        </Button>
        <Modal
          title="Type Selector"
          visible={visible}
          onOk={this.onConfirm}
        >
          {this.generateButtons()}
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps)(TypeSelector);
