import React from 'react';
import { IScreen } from 'components/applets/IApplet';
import ClothingLibrary from './clothes/ClothingLibrary';
import ArticlePage from './general/ArticlePage';

const wardrobeScreens:IScreen[] = [
  {
    handle: 'clothes',
    title: 'Clothing Library',
    component: <ClothingLibrary />,
  },

  {
    handle: 'outfits',
    title: 'Outfit Library',
    component: <div />, // <ClothingLibrary />,
  },

  // {
  //   handle: ':id',
  //   title: 'Article: ?',
  //   component: <ArticlePage />, // <ClothingLibrary />,
  // },
];

export default wardrobeScreens;
