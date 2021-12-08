/**
 * @file fix no-console
 * @author YeonJuAn
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import rule from '../../../lib/rules/no-console';

const ruleTester = new RuleTester();
const error = { message: 'I can fix it', type: 'MemberExpression' };

export const limitation = [
  { code: "foo = console.log('bar');"},
  { code: "foo(console.log('bar'));" },
  { code: "console.log('foo') + bar;" },
  { code: "foo = console.warn('bar');" },
  { code: "foo(console.warn(bar));" },
  { code: "console.warn('foo') + bar;" },
];

export const fixables = [
  {
    code: "console.log('a')",
    output: '',
    errors: [error],
  },
  {
    code: `
function foo() {
  console.log('bar')
}`,
    output: `
function foo() {
  
}`,
    errors: [error],
  },
]

ruleTester.run('no-console', rule, {
  valid: limitation,
  invalid: fixables,
});
