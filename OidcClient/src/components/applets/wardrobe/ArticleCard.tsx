import React from 'react';
import 'antd/dist/antd.css';

import TShirtIcon from 'resources/TShirtIcon';

import './ArticleCard.css';

import Icon from '@ant-design/icons';
import { ClothingDTO } from 'fetch/wardrobe';

type Props = {
  article: ClothingDTO
};

type State = {
  rand: number
};

class ArticleCard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      rand: 1,
    };
  }

  render() {
    const { article } = this.props;
    return (
      <div className="ArticleCard">
        <Icon className="ArticleCard-Icon" style={{ fontSize: '100px', color: article.color }} component={TShirtIcon} />
        <h3 className="ArticleCard-Title">{article.name}</h3>
      </div>
    );
  }
}

export default ArticleCard;
