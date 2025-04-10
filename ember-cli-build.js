'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');


module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    symlinkNodeModules: false,
    autoImport: {
      webpack: {
        // optional if you need custom webpack config
      }
    }
  });

app.import('node_modules/ember-basic-dropdown/dist/ember-basic-dropdown.css');


  return app.toTree();
};
