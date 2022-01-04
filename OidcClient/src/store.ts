import { applyMiddleware, compose, createStore } from 'redux';
import { loadUser } from 'redux-oidc';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from '@reduxjs/toolkit/dist/devtoolsExtension';
import createRootReducer from './reducer';
import userManager from './util/userManager';

export const history = createBrowserHistory();

/* eslint-disable no-underscore-dangle */
export default function configureStore(preloadedState: any) {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    // preloadedState,
    compose(
      // (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        // ... other middlewares ...
      ),
    ),
  );

  return store;
}
/* eslint-enable */

// /* eslint-disable no-underscore-dangle */
// export const store = createStore(
//   createRootReducer(history),
//   (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
// );
// /* eslint-enable */

// loadUser(store, userManager);
