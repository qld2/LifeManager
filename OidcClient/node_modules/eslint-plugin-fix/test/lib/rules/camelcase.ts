import { RuleTester } from 'eslint';
import rule from '../../../lib/rules/camelcase';

const ruleTester = new RuleTester();
const error = { message: 'I can fix it', type: 'Identifier' };
ruleTester.run('camelcase', rule, {
  valid: [
  ],
  invalid: [
    {
      code: "var my_favorite_color = 5;",
      output: "var myFavoriteColor = 5;",
      errors: [error]
    },
    {
      code: "my_favorite_color = 5;",
      output: "myFavoriteColor = 5;",
      errors: [error]
    },
    {
      code: "var obj = { my_pref: 1 };",
      output: "var obj = { myPref: 1 };",
      errors: [error]
    }
  ],
});
