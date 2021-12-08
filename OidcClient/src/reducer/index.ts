import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as oidcReducer } from 'redux-oidc';
import idReducer from './id/idReducer';
import counterReducer from './counter/counterReducer';
import sliceCounterReducer from './sliceCounter/counterSlice';
import identityReducer from './identity/identitySlice';

const reducer = combineReducers(
  {
    routing: routerReducer,
    oidc: oidcReducer,
    // id: idReducer,
    // count: counterReducer,
    sliceCount: sliceCounterReducer,
    identity: identityReducer,
  },
);

export default reducer;
