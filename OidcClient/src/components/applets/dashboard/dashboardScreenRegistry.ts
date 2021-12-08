import React from 'react';
import { IScreen } from '../IApplet';
import Dashboard from './Dashboard';

const dashboardScreens:IScreen[] = [
  {
    handle: '',
    title: 'Dashboard',
    component: Dashboard(),
  },
];

export default dashboardScreens;
