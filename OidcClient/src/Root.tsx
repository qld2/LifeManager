import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import { Button } from 'antd';
import { createUserManager, OidcProvider } from 'redux-oidc';

import Main from 'components/Main';
import { createBrowserHistory } from 'history';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store';
import userManager from './util/userManager';

function Root() {
  const history = createBrowserHistory();

  return (
    <Provider store={store}>
      <OidcProvider userManager={userManager} store={store}>
        {
        /* <ConnectedRouter history={history}>
          <Main />
        </ConnectedRouter> */
        }
        <BrowserRouter>
          <Main />
        </BrowserRouter>

      </OidcProvider>
    </Provider>
  );
}

export default Root;
