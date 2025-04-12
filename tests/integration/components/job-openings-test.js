import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-task5/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | job-openings', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<JobOpenings />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <JobOpenings>
        template block text
      </JobOpenings>
    `);

    assert.dom().hasText('template block text');
  });
});
