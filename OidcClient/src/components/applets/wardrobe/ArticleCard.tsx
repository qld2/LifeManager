import React from 'react';
import 'antd/dist/antd.css';

import TShirtIcon from 'resources/TShirtIcon';

import './ArticleCard.css';

import Icon from '@ant-design/icons';
import { ClothingDTO } from 'fetch/wardrobe';
import { Button } from 'antd';

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

  generateTagList = ():JSX.Element => {
    const { article } = this.props;
    const output: JSX.Element[] = [];

    article.clothingTags?.forEach((tag: string) => {
      output.push(
        <Button>
          { tag }
        </Button>,
      );
    });

    return (<div>{ output }</div>);
  };

  render() {
    const { article } = this.props;
    return (
      <div className="ArticleCard">
        <div className="ArticleCard-Left">
          <h3>{article.articleName}</h3>
          {this.generateTagList()}
        </div>
        <div className="ArticleCard-Right">
          <Icon className="ArticleCard-Icon" style={{ fontSize: '100px', color: article.color }} component={TShirtIcon} />
          <div className="ArticleCard-BelowIcon">
            <Button>Shirt</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default ArticleCard;
