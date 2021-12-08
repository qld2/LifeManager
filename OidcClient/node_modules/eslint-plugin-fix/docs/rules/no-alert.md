# fix no-alert (no-alert)

This rule supports auto fix for the rule [no-alert](https://eslint.org/docs/rules/no-alert) in eslint.

## Possible to fix

Examples of **possible to fix** code for this rule:

* before
  ```js
  alert('foo')

  function foo() {
    alert('foo')
  }
  ```

* after fix (`eslint --fix`)

  ```js


  function foo() {
  
  }
  ```

## Impossible to fix

Examples of **impossible to fix** code for this rule:

```js
foo + alert('foo');

foo(alert('foo'));
```

## Further Reading

See [no-alert](https://eslint.org/docs/rules/no-alert)
