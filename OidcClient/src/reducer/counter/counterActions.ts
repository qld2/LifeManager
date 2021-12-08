import { INC, CounterAction } from './model/actions';

export const inc = (amount: number):CounterAction => ({
  type: INC,
  amount,
});

export const lint = 5;
