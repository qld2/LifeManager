import React from 'react';
import { Switch } from 'react-router-dom';
import screenRoutes from 'util/screenRoutes';
import Dashboard from './Dashboard';
import { IApplet } from '../IApplet';
import dashboardScreens from './dashboardScreenRegistry';

const dashboardAppletHandle:string = 'dashboard';

function DashboardApplet():JSX.Element {
  return (
    <Dashboard />
  );
}

const dashboardApplet: IApplet = {
  handle: dashboardAppletHandle,
  title: 'Dashboard',
  icon: null,
  component: DashboardApplet(),
  screens: dashboardScreens,
};

export default dashboardApplet;
