/* eslint no-param-reassign: 0 */ // --> OFF

import { createSlice } from '@reduxjs/toolkit';
import IAction from '../IAction';
import { Identity } from './model/identity';

export const identitySlice = createSlice({
  name: 'identity',
  initialState: {
    user: null,
  } as Identity,
  reducers: {
    login: (state: Identity, action: IAction) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      // state.user += 1;

      const next = state;
      next.user = action.payload;
      next;
    },
    logout: (state: Identity) => {
      const next = state;
      next.user = null;
      next;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = identitySlice.actions;

export default identitySlice.reducer;
