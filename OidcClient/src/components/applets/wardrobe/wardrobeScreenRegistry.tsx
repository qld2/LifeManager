import React from 'react';
import { IScreen } from 'components/applets/IApplet';
import ClothingLibrary from './ClothingLibrary';

const wardrobeScreens:IScreen[] = [
  {
    handle: 'clothes',
    title: 'Clothing Library',
    component: <ClothingLibrary />,
  },
  {
    handle: 'outfits',
    title: 'Outfit Library',
    component: <ClothingLibrary />,
  },
];

export default wardrobeScreens;
