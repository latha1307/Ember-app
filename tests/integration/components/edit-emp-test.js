import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-task5/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | edit-emp', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<EditEmp />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <EditEmp>
        template block text
      </EditEmp>
    `);

    assert.dom().hasText('template block text');
  });
});
