# eslint-plugin-fix

Support auto fix for eslint core rule.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-fix`:

```
$ npm install eslint-plugin-fix --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-fix` globally.

## Usage

Add `fix` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "fix"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "fix/rule-name": 2
    }
}
```

## Supported Rules

* [fix/no-console](./docs/rules/no-console.md)
* [fix/no-debugger](./docs/rules/no-debugger.md)
* [fix/no-alert](./docs/rules/no-alert.md)
* [fix/camelcase](./docs/rules/camelcase.md)
