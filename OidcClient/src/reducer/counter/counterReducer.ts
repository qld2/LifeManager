import { Reducer } from 'redux';
import { CounterAction, INC } from './model/actions';
import { Counter } from './model/counter';

const defaultState: Counter = { value: 0 };

const counterReducer: Reducer<Counter, CounterAction> = (state: Counter = defaultState, action: CounterAction): Counter => {
  const next: Counter = state;

  switch (action.type) {
    case INC:
      // const next = action ? action : null;
      next.value = action.amount + state.value;
      return next; // next;

    default:
      console.log('DEFAULT COUNTER');
      return next;
  }
};

export default counterReducer;
