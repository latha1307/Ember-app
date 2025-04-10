import { module, test } from 'qunit';
import { setupTest } from 'ember-task5/tests/helpers';

module('Unit | Route | addEmp', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:add-emp');
    assert.ok(route);
  });
});
