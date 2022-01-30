import React from 'react';

import {
  Typography,
  Button as AntdButton,
} from 'antd';
import 'antd/dist/antd.css';
import './ArticleCard.css';

// import TShirtIcon from 'resources/TShirtIcon';
// import PantsIcon from 'resources/PantIcon';

import Icon from '@ant-design/icons';
import { ClothingDTO } from 'fetch/wardrobe';
import Button from 'components/general/Button';
import List from 'components/general/List';
import TShirtSvg from 'resources/tshirt.svg';// 'resources/tshirt.svg';
import PantsSvg from 'resources/pants.svg';
import ShoeSvg from 'resources/shoes.svg';

type Props = {
  article: ClothingDTO
};

type State = {
  rand: number
};

const ARTICLECARD_WIDTH = 300;
const ARTICLECARD_HEIGHT = 180;
const ARTICLECARD_PADDING = 10;

class ArticleCard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      rand: 1,
    };
  }

  private getIcon() {
    const { article } = this.props;

    if (article.clothingType === 'Shirt') return <Icon className="ArticleCard-Icon" style={{ fontSize: '100px', color: article.color }} component={TShirtSvg} />;
    if (article.clothingType === 'Pants') return <Icon className="ArticleCard-Icon" style={{ fontSize: '100px', color: article.color }} component={PantsSvg} />;
    if (article.clothingType === 'Shoes') return <Icon className="ArticleCard-Icon" style={{ fontSize: '100px', color: article.color }} component={ShoeSvg} />;
    return <Icon className="ArticleCard-Icon" style={{ fontSize: '100px', color: article.color }} component={TShirtSvg} />;
  }

  render() {
    const { article } = this.props;
    return (
      <div
        style={{
          width: ARTICLECARD_WIDTH,
          height: ARTICLECARD_HEIGHT,
          padding: ARTICLECARD_PADDING,
        }}
        className="ArticleCard"
      >

        <div className="ArticleCard-Left">
          <Typography.Text keyboard>{article.articleName}</Typography.Text>
          { article.clothingTags !== undefined
            ? (
              <List<string>
                width={(ARTICLECARD_WIDTH - 2 * ARTICLECARD_PADDING) / 2}
                height={60}
                data={article.clothingTags}
                // component={(input:string) => <Button width={20} height={5} color="#4675bb">{input}</Button>}
                component={(input:string) => <Typography.Text keyboard>{input}</Typography.Text>}
                labelFunc={(str: string) => str}
              />
            )
            : <div />}
          {/* {this.generateTagList()} */}
        </div>
        <div className="ArticleCard-Right">
          {this.getIcon()}
          <div className="ArticleCard-BelowIcon">
            <Typography.Text keyboard>{article.clothingType}</Typography.Text>
            {/* <AntdButton
              className="ArticleCard-Button"
              type="default"
            >
              {article.clothingType}
            </AntdButton> */}
          </div>
        </div>
      </div>
    );
  }
}

export default ArticleCard;
