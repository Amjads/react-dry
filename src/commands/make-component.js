const paths = require('../paths');
const filesystem = require('../utils/filesystem');
const { readAndCopy, compose } = require('../utils/helpers');
const kebabCase = require('lodash.kebabcase');
const camelCase = require('lodash.camelcase');
const upperfirst = require('lodash.upperfirst');


const componentsPath = paths.cwd('components');

const make = (name, options) => {
  const componentPath = `${paths.cwd('components')}/${kebabCase(name)}`;
  filesystem.notExists(componentsPath)
    .then(() => filesystem.mkdir(componentsPath))
    .catch(() => {
    })
    .then(() => filesystem.mkdir(componentPath))
    .then(() => {
      let componentType;
      if (options.hoc && options.stateless) {
        componentType = 'hoc-stateless';
      } else if (options.hoc) {
        componentType = 'hoc';
      } else if (options.stateless) {
        componentType = 'stateless';
      } else {
        componentType = 'component';
      }
      return readAndCopy(
        paths.stubs(`component/${componentType}.stub`),
        `${componentPath}/index.js`, {
          componentName:
            compose(upperfirst, camelCase, kebabCase)(name),
        },
      );
    })
    .then(() => {
      if (!options.hoc) {
        return readAndCopy(
          paths.stubs('component/style.css'),
          `${componentPath}/style.css`,
        );
      }
      return null;
    });
};

module.exports = (...args) => (
  filesystem
    .notExists(paths.cwd(`components/${args[0]}`))
    .then(() => make(...args)).catch(() => {
      console.log(`Component "${args[0]} already exists`);
    })
);
