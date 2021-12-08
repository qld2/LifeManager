# fix camelcase (camelcase)

This rule supports auto fix for the rule [camelcase](https://eslint.org/docs/rules/camelcase) in eslint.

## Possible to fix

Examples of **possible to fix** code for this rule:

* before
  ```js
  var my_favorite_color = 5;
  
  my_favorite_color = 5;
  
  var obj = { my_pref: 1 };
  ```

* after fix (`eslint --fix`)

  ```js
  var myFavoriteColor = 5;
  
  myFavoriteColor = 5;
  
  var obj = { myPref: 1 };
  ```

### Options

It extends the ESlint base rule `camelcase`.
See [camelcase option](https://eslint.org/docs/rules/camelcase#options)

## Further Reading

See [camelcase](https://eslint.org/docs/rules/camelcase)
