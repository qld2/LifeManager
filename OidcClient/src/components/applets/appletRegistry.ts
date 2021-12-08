import React from 'react';
import wardrobeApplet from './wardrobe/wardrobeApplet';
import dashboardApplet from './dashboard/dashboardApplet';
import { IApplet } from './IApplet';

const applets:IApplet[] = [
  dashboardApplet, // Must be first
  wardrobeApplet,
];

export default applets;
