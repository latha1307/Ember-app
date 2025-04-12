'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');


module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    symlinkNodeModules: false,
    autoImport: {
      webpack: {
      }
    },
  });

app.import('node_modules/ember-basic-dropdown/dist/ember-basic-dropdown.css');
app.import('node_modules/moment/min/moment.min.js');
app.import('node_modules/bootstrap-daterangepicker/daterangepicker.js');
app.import('node_modules/bootstrap-daterangepicker/daterangepicker.css');
app.import('node_modules/ember-power-calendar/vendor/ember-power-calendar.css');





  return app.toTree();
};
