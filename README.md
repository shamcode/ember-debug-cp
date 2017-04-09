# ember-debug-cp
[![Build Status](https://travis-ci.org/shamcode/ember-debug-cp.svg?branch=master)](https://travis-ci.org/shamcode/ember-debug-cp)
[![npm version](https://badge.fury.io/js/ember-debug-cp.png)](http://badge.fury.io/js/ember-debug-cp)
[![Dependency Status](https://david-dm.org/shamcode/ember-debug-cp.svg)](https://david-dm.org/shamcode/ember-debug-cp)
[![devDependency Status](https://david-dm.org/shamcode/ember-debug-cp.svg)](https://david-dm.org/shamcode/ember-debug-cp#info=devDependencies)
[![Ember Observer Score](https://emberobserver.com/badges/ember-debug-cp.svg)](https://emberobserver.com/addons/ember-debug-cp)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

Macro for debugging computed property

## Usage

Before:
```js
import Ember from 'ember';
const { computed } = Ember;

const obj = Ember.Object
  .extend({
    foo: 42,
    bar: computed('foo', function() {
      return 2 * this.get('foo')
    })
  })
  .create();

obj.get('bar');
```
After:
```js
import Ember from 'ember';
import DebugProperty from 'ember-debug-cp';

const obj = Ember.Object
  .extend({
    foo: 42,
    // Replace computed by DebugProperty macro
    bar: DebugProperty.get('foo', function() {
      return 2 * this.get('foo')
    })
  })
  .create();

obj.get('bar');
```
And you get console input:

![Getter console output](https://github.com/shamcode/ember-debug-cp/blob/master/screens/getter-console.png?raw=true)

And DevTools debugger:
![Getter DevTools](https://github.com/shamcode/ember-debug-cp/blob/master/screens/getter-debugger.png?raw=true)

## Installation
```bash
ember install ember-abstract-macro
```

## API

### `DebugProperty.get`
Hook for  get computed

#### Code

```js
import Ember from 'ember';
import DebugProperty from 'ember-debug-cp';

const obj = Ember.Object
  .extend({
    foo: 42,
    bar: DebugProperty.get('foo', function() {
      return 2 * this.get('foo')
    })
  })
  .create();

obj.get('bar');
```
#### Console:
![Getter console output](https://github.com/shamcode/ember-debug-cp/blob/master/screens/getter-console.png?raw=true)

#### DevTools:
![Getter DevTools](https://github.com/shamcode/ember-debug-cp/blob/master/screens/getter-debugger.png?raw=true)

### `DebugProperty.set`
Hook for set computed

#### Code
```js
import Ember from 'ember';
import DebugProperty from 'ember-debug-cp';

const obj = Ember.Object
  .extend({
    foo: 42,
    bar: DebugProperty.get('foo', function() {
      return 2 * this.get('foo')
    })
  })
  .create();

obj.set('bar', 64);
```
#### Console:
![Setter console output](https://github.com/shamcode/ember-debug-cp/blob/master/screens/setter-console.png?raw=true)

#### DevTools:
![Setter DevTools](https://github.com/shamcode/ember-debug-cp/blob/master/screens/setter-debugger.png?raw=true)

### `DebugProperty.modify`
Alias to `DebugProperty.set`

### `DebugProperty.both`
Hook for get & set computed

#### Code
```js
import Ember from 'ember';
import DebugProperty from 'ember-debug-cp';

const obj = Ember.Object
  .extend({
    foo: 42,
    bar: DebugProperty.both('foo', function() {
      return 2 * this.get('foo')
    })
  })
  .create();

obj.get('bar');
obj.set('bar', 64);
```
#### Console:
![Both console output](https://github.com/shamcode/ember-debug-cp/blob/master/screens/both-console.png?raw=true)

#### DevTools:
As getter & setter


## Addon Maintenance

## Installation

* `git clone https://github.com/shamcode/ember-debug-cp.git`
* `cd ember-debug-cp`
* `npm install`
* `bower install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
