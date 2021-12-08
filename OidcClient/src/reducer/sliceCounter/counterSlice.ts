/* eslint no-param-reassign: 0 */ // --> OFF

import { createSlice } from '@reduxjs/toolkit';
import IAction from '../IAction';
import { Counter } from './model/counter';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state: Counter) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state: Counter) => {
      state.value -= 1;
    },
    incrementByAmount: (state: Counter, action: IAction) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
