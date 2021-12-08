import React from 'react';
import { Switch } from 'react-router-dom';
import { SkinOutlined, CoffeeOutlined, FireOutlined } from '@ant-design/icons';
import screenRoutes from 'util/screenRoutes';
import { IApplet, IScreen } from '../IApplet';
import wardrobeScreens from './wardrobeScreenRegistry';

const wardrobeAppletHandle:string = 'wardrobe';

function WardrobeApplet():JSX.Element {
  return (
    <Switch>
      {screenRoutes(wardrobeAppletHandle, wardrobeScreens)}
    </Switch>
  );
}

const wardrobeApplet: IApplet = {
  handle: wardrobeAppletHandle,
  title: 'WardrobeManager',
  icon: <SkinOutlined />,
  component: <WardrobeApplet />,
  screens: wardrobeScreens,
};
export default wardrobeApplet;
