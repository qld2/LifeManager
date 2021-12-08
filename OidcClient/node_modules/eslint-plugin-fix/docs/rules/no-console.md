# fix no-console (no-console)

This rule supports auto fix for the rule [no-console](https://eslint.org/docs/rules/no-console) in eslint.

## Possible to fix

Examples of **possible to fix** code for this rule:

* before
  ```js
  console.log('foo')

  function foo() {
    console.log('bar');
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
foo + console.log('foo')

foo(console.log('bar'));
```


### Options

It extends the ESlint base rule `no-console`.
See [no-console option](https://eslint.org/docs/rules/no-console#options)

## Further Reading

See [no-console](https://eslint.org/docs/rules/no-console)
