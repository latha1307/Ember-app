import { module, test } from 'qunit';
import { setupTest } from 'ember-task5/tests/helpers';

module('Unit | Route | editEmp', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:edit-emp');
    assert.ok(route);
  });
});
