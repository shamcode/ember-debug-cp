import Ember from 'ember';
import DebugProperty from 'ember-debug-cp';
import { module, test } from 'qunit';

module('Unit | debug cp');

test('DebugProperty.get', function(assert) {
  const obj = Ember.Object.extend({
    foo: 42,
    bar: DebugProperty.get('foo', function() {
      return 2 * this.get('foo')
    })
  }).create();

  assert.equal(obj.get('bar'), 84);
});


test('DebugProperty.set', function(assert) {
  const obj = Ember.Object.extend({
    foo: 42,
    bar: DebugProperty.set( 'foo', function() {
      return 2 * this.get('foo')
    })
  }).create();
  obj.set('bar', 64);
  assert.equal(obj.get('bar'), 64);
});

test('DebugProperty.modify', function(assert) {
  const obj = Ember.Object.extend({
    foo: 42,
    bar: DebugProperty.modify( 'foo', function() {
      return 2 * this.get('foo')
    })
  }).create();
  obj.set('bar', 64);
  assert.equal(obj.get('bar'), 64);
});

test('DebugProperty.both', function(assert) {
  const obj = Ember.Object.extend({
    foo: 42,
    bar: DebugProperty.both( 'foo', function() {
      return 2 * this.get('foo')
    })
  }).create();
  assert.equal(obj.get('bar'), 84);
  obj.set('bar', 64);
  assert.equal(obj.get('bar'), 64);
});
