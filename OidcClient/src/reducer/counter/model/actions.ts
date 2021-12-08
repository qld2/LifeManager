export const INC = 'INC';
export const DEC = 'DEC';

type IncAction = {
  type: typeof INC,
  amount: number
};

// type DecAction = {
// type: typeof DEC,
// };

export type CounterAction = IncAction; // | DecAction;
