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

import './TagSelector.css';
import Function from 'util/Function';
import { ClothingDTO, addClothingArticle } from 'fetch/wardrobe';
import userManager from 'util/userManager';
import { AppState, AppDispatch } from 'src/Root';

type TagType = string;
const tagTypes: TagType[] = ['Shirt', 'Pants', 'Shoes', 'Shorts', 'Socks', 'Sweater'];

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
  className?: string,
  selected: string[]
  onChange: Function<string[], void>
};

type State = {
  visible: boolean,
};

class TagSelector extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    // const selected = tagTypes.map<TagType>((t: TagType) => {
    //     return t;
    // })

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

    for (let i = 0; i < tagTypes.length; i += 1) {
      output.push(
        <Button
          className="TagSelector-Button"
          type={selected.includes(tagTypes[i]) ? 'primary' : 'default'}
          onClick={() => {
            if (selected.includes(tagTypes[i])) {
              const index = selected.indexOf(tagTypes[i]);
              if (index > -1) {
                selected.splice(index, 1);
              }
            } else {
              selected.push(tagTypes[i]);
            }

            onChange(selected);
          }}
        >
          {tagTypes[i]}
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
      selected,
    } = this.props;

    const {
      visible,
    } = this.state;

    return (
      <div className="TagSelector">
        <Button
          className={className}
          size="large"
          type="ghost"
          onClick={this.onClick}
        >
          Select
        </Button>
        <Modal
          title="Tag Selector"
          visible={visible}
          onOk={this.onConfirm}
        >
          {this.generateButtons()}
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps)(TagSelector);
