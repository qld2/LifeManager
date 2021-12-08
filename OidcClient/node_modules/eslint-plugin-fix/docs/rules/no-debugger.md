# fix no-debugger (no-debugger)

This rule supports auto fix for the rule [no-debugger](https://eslint.org/docs/rules/no-debugger) in eslint.

## Possible to fix

Examples of **possible to fix** code for this rule:

* before
  ```js
  debugger

  function foo() {
    debugger
  }
  ```

* after fix (`eslint --fix`)

  ```js


  function foo() {
  
  }
  ```

## Further Reading

See [no-debugger](https://eslint.org/docs/rules/no-debugger)
