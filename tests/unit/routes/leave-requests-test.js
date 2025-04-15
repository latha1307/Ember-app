import { module, test } from 'qunit';
import { setupTest } from 'ember-task5/tests/helpers';

module('Unit | Route | leaveRequests', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:leave-requests');
    assert.ok(route);
  });
});
