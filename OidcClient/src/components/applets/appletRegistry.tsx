import React from 'react';
import {
  Route,
} from 'react-router-dom';
import wardrobeApplet from './wardrobe/wardrobeApplet';
import dashboardApplet from './dashboard/dashboardApplet';
import { IApplet } from './IApplet';

const applets:IApplet[] = [
  dashboardApplet, // Must be first
  wardrobeApplet,
];

export const appletRoutes = ():JSX.Element[] => {
  const result:JSX.Element[] = [];

  let key = 0;
  applets.forEach((applet) => {
    result.push(<Route key={key} path={`/${applet.handle}`}>{applet.component}</Route>);
    key += 1;
  });

  return result;
};

export default applets;
