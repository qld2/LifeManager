import React from 'react';
import {
  Route,
} from 'react-router-dom';
import { IScreen } from 'components/applets/IApplet';
import AuthRoute from '../components/general/AuthRoute';

const screenRoutes = (appletHandle:string, screens: IScreen[]):JSX.Element[] => {
  const result:(JSX.Element)[] = [];

  let key = 0;
  screens.forEach((screen) => {
    result.push(<Route key={key} path={`/${appletHandle}/${screen.handle}`}>{screen.component}</Route>);
    key += 1;
  });

  return result;
};

export default screenRoutes;
