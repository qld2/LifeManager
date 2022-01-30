import React from 'react';
import {
  Button,
  PageHeader,
  Input,
  Pagination,
  Divider,
  Switch,
} from 'antd';
import Function from 'util/Function';
import IFilter, { IFilterProps } from './IFilter';

// type Props<ObjectType> = {
//   onChange: Function<(datum?: ObjectType) => boolean, void>,
// };

// type State<ObjectType> = {
//   on: boolean,
// };

export default class Filter<ObjectType> extends IFilter<ObjectType> {
  constructor(props : IFilterProps<ObjectType>) {
    super(props);

    this.state = {
      on: false,
    };
  }

  private flipSwitch = () => {
    const { onChange } = this.props;
    const { on } = this.state;

    const f = (datum: ObjectType):boolean => !on;
    onChange(f);

    this.setState({
      on: !on,
    });
  };

  render() {
    const { on } = this.state;
    return (
      <Switch checked={on} onClick={this.flipSwitch} />
    );
  }
}
