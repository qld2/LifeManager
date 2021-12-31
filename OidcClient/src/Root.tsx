import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import { createUserManager, OidcProvider } from 'redux-oidc';

import Main from 'components/Main';
import configureStore, { history } from './store';

import userManager from './util/userManager';

export const store = configureStore(null);
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

function Root() {
  return (
    <Provider store={store}>
      <OidcProvider userManager={userManager} store={store}>
        <ConnectedRouter history={history}>
          <Main />
        </ConnectedRouter>
      </OidcProvider>
    </Provider>
  );
}

export default Root;
