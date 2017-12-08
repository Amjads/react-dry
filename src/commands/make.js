const paths = require('../paths');
const filesystem = require('../utils/filesystem');
const template = require('lodash.template');
const snakeCase = require('lodash.snakecase');
const toUpper = require('lodash.toupper');

const readAndCopy = (from, to, vars = {}) => filesystem
  .read(from)
  .then((data) => {
    const compiledTemplate = template(data)(vars);
    return filesystem.write(to, compiledTemplate);
  });

const make = (name, options) => {
  const api = options.api || false;
  readAndCopy(
    paths.stubs('reducers/reducer.stub'),
    paths.cwd(`reducers/${name}.js`),
    {
      actionName: name,
    },
  );

  const makeAction = (importName, file) => ({
    name: importName,
    file: file || importName,
    typeName: toUpper(snakeCase(importName)),
    typeValue: toUpper(snakeCase(`${name} ${importName}`)),
  });

  const apiActions = [];

  if (api) {
    apiActions.push(makeAction('fetch'));
    apiActions.push(makeAction('fetching'));
    apiActions.push(makeAction('fetchFailed', 'fetch-failed'));
    apiActions.push(makeAction('fetched'));
  }

  filesystem.notExists(paths.cwd(`actions/${name}`))
    .then(() => filesystem.mkdir(paths.cwd(`actions/${name}`)))
    .catch(() => console.log('Directory', paths.cwd(`actions/${name}`), 'already exists'));

  readAndCopy(
    paths.stubs('actions/index.stub'),
    paths.cwd(`actions/${name}/index.js`),
    {
      actions: apiActions,
    },
  );

  readAndCopy(
    paths.stubs('actions/types.stub'),
    paths.cwd(`actions/${name}/types.js`),
    {
      actions: apiActions,
    },
  );


  if (api) {
    apiActions.forEach((action) => {
      readAndCopy(
        paths.stubs(`actions/${action.file}.stub`),
        paths.cwd(`actions/${name}/${action.file}.js`),
        {
          action,
        },
      );
    });
  }
};
module.exports = make;
