import { RuleTester } from 'eslint';
import rule from '../../../lib/rules/no-debugger';

const error = { message: 'I can fix it', type: 'DebuggerStatement' };
const ruleTester = new RuleTester();
ruleTester.run('no-debugger', rule, {
  valid: [],

  invalid: [
    {
      code: 'debugger',
      output: '',
      errors: [error],
    },
    {
      code: 'function foo() { debugger }',
      output: 'function foo() {  }',
      errors: [error],
    },
  ],
});
