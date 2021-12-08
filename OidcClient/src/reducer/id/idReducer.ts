import { Reducer } from 'redux';
import { IDAction, LOGIN, LOGOUT } from './model/actions';
import { ID } from './model/id';

const defaultState: ID = { user: null };

const idReducer: Reducer<ID, IDAction> = (state: ID = defaultState, action: IDAction): ID => {
  const next: ID = state;

  switch (action.type) {
    case LOGIN:
      console.log('From Reducer:', action.user);
      next.user = action.user;
      return next;// ? action.user : null; // next;
    case LOGOUT:
      console.log('LOG OUT');
      return next;

    default:
      console.log('DEFAULT');
      return next;
  }
};

export default idReducer;
