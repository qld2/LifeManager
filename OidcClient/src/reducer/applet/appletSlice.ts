/* eslint no-param-reassign: 0 */ // --> OFF

import { createSlice } from '@reduxjs/toolkit';
import IAction from '../IAction';
import { MetaApplet } from './model/applet';

export const appletSlice = createSlice({
  name: 'applet',
  initialState: {
    height: 0,
    width: 0,
  } as MetaApplet,
  reducers: {
    setDimensions: (state: MetaApplet, action: IAction) => {
      const next = state;
      next.height = action.payload.height;
      next.width = action.payload.width;
      next;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDimensions } = appletSlice.actions;

export default appletSlice.reducer;
