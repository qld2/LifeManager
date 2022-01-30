import React from 'react';
import Function from 'util/Function';

export type IFilterProps<ObjectType> = {
  width: number,
  height: number,
  onChange: Function<Function<ObjectType, boolean>, void>,
};

// export type State<ObjectType> = {
//     };

export default abstract class IFilter<ObjectType> extends React.Component<IFilterProps<ObjectType>, any> {
  constructor(props: IFilterProps<ObjectType>) {
    super(props);
    const { onChange } = props;

    onChange(() => true);
  }
}
