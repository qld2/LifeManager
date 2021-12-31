import { combineReducers } from 'redux';
import { reducer as oidcReducer } from 'redux-oidc';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import idReducer from './id/idReducer';
import counterReducer from './counter/counterReducer';
import sliceCounterReducer from './sliceCounter/counterSlice';
import identityReducer from './identity/identitySlice';

const createRootReducer = (history: History) => combineReducers(
  {
    oidc: oidcReducer,
    router: connectRouter(history),

    // id: idReducer,
    // count: counterReducer,
    // sliceCount: sliceCounterReducer,
    // identity: identityReducer,
  },
);

export default createRootReducer;
