import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-task5/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | leave-requests-emp', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<LeaveRequestsEmp />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <LeaveRequestsEmp>
        template block text
      </LeaveRequestsEmp>
    `);

    assert.dom().hasText('template block text');
  });
});
