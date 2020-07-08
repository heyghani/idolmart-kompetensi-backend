# sbo

Support the [Bind Operator](https://github.com/tc39/proposal-bind-operator). Future-proof your function.

Converts `value::yourFunction(arg)` to `yourFunction(value, arg)` — but lets you use either.

## Installation

Requires [Node.js](https://nodejs.org/) 6.0.0 or above.

```bash
npm i sbo
```

## API

The module exports a single function.

### Parameters

1. Optional: Object argument:
    * Optional: `arg` (integer): The argument index at which `this` should be inserted. Defaults to `0`.
    * Optional: `path` (string): The dot-separated key path of an options object argument located at index `arg` into which `this` should be inserted.
    * Optional: `ignoreThis` (object, array, or function): `this` is ignored if `ignoreThis` strictly equals `this`, or if `ignoreThis` is an array containing `this`, or if `ignoreThis` is a function which returns `true` when given `this`.
2. `fn` (Function): The function which should receive bind operator support.

### Return Value

A wrapper function with bind operator support that calls `fn`.

## Tutorial

Let’s say, for the sake of example, that you have a function called `addSuffix`:

```javascript
const addSuffix = (str, suffix) => str + suffix
```

You use the `sbo` module to add support for the bind operator:

```javascript
const supportBindOperator = require('sbo')
const addSuffix = supportBindOperator((str, suffix) => str + suffix)
```

Now your function can be called either the normal way or with the bind operator:

```javascript
addSuffix('Hello, world', '!') // 'Hello, world!'
'Hello, world'::addSuffix('!') // 'Hello, world!'
```

### Specifying a Parameter Index

Now let’s swap the order of the parameters:

```javascript
const addSuffix = (suffix, str) => str + suffix
```

A bound `this` would now need to become the argument with an index of 1. To do this, pass an extra argument to `sbo`:

```javascript
const supportBindOperator = require('sbo')
const addSuffix = supportBindOperator({arg: 1}, (suffix, str) => str + suffix)

addSuffix('!', 'Hello, world') // 'Hello, world!'
'Hello, world'::addSuffix('!') // 'Hello, world!'
```

### Specifying an Object Argument Key

Let’s try using a deconstructed object parameter:

```javascript
const addSuffix = ({str, suffix}) => str + suffix
```

Do the following to direct a bound `this` to the `str` key of the object argument at index zero (i.e. the first, and in this case the only, argument):

```javascript
const supportBindOperator = require('sbo')
const addSuffix = supportBindOperator({path: 'str'}, ({str, suffix}) => str + suffix)

addSuffix({str: 'Hello, world', suffix: '!'}) // 'Hello, world!'
'Hello, world'::addSuffix({suffix: '!'}) // 'Hello, world!'
```

If you have a nested object parameter, you can use a dot-separated key path.

## Related

For more projects like this, check out the [xfn](https://github.com/lamansky/xfn) family of modules.
