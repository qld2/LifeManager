import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import createHistory from 'history/createBrowserHistory';
import createOidcMiddleware, { loadUser } from 'redux-oidc';
import { routerMiddleware } from 'react-router-redux';
import { State } from 'history';
import reducer from './reducer';
import userManager from './util/userManager';
/*
// create the middleware with the userManager
// const oidcMiddleware = createOidcMiddleware(userManager);

export const history = createHistory<State>();

const loggerMiddleware = (store) => (next) => (action) => {
  console.log('Action type:', action.type);
  console.log('Action payload:', action.payload);
  console.log('State before:', store.getState());
  next(action);
  console.log('State after:', store.getState());
};

const initialState = {};

const createStoreWithMiddleware = compose(
  applyMiddleware(routerMiddleware(history)); //loggerMiddleware, routerMiddleware(browserHistory))
)(createStore);
export const store = createStoreWithMiddleware(reducer, initialState);
*/

const oidcMiddleware = createOidcMiddleware(userManager);// , () => true, false, '/callback');

/* eslint-disable no-underscore-dangle */
export const store = createStore(
  reducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

loadUser(store, userManager);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
