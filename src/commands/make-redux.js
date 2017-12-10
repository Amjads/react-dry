const paths = require('../paths');
const filesystem = require('../utils/filesystem');
const { readAndCopy } = require('../utils/helpers');
const snakeCase = require('lodash.snakecase');
const toUpper = require('lodash.toupper');
const constants = require('../constants');


const replaceCase = (action, reducerContent) => (
  filesystem
    .read(paths.stubs(`reducers/stubs/${action.file}/case.stub`))
    .then(caseContent => reducerContent.replace(`    ${constants.REDUCER_CASE}`, `${caseContent.toString()}\n    ${constants.REDUCER_CASE}`))
    .catch(() => {})
);

const appendToReducer = (name, action) => {
  const reducerFile = paths.cwd(`reducers/${name}.js`);
  console.log(action.name);
  return filesystem
    .read(reducerFile)
    .then(reducerContent => replaceCase(action, reducerContent.toString()))
    .then((reducerContent) => {
      if (!reducerContent) {
        return null;
      }
      return filesystem.write(reducerFile, reducerContent);
    })
    .catch(() => { });
};

const make = (name, options) => {
  const api = options.api || false;

  const reducerFilePromise = readAndCopy(
    paths.stubs('reducers/reducer.stub'),
    paths.cwd(`reducers/${name}.js`),
    {
      name,
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
    let lastStubPromise;
    reducerFilePromise.then(() => {
      apiActions.forEach((action) => {
        readAndCopy(
          paths.stubs(`actions/${action.file}.stub`),
          paths.cwd(`actions/${name}/${action.file}.js`),
          {
            action,
          },
        );
        if (lastStubPromise) {
          lastStubPromise = lastStubPromise.then(() => appendToReducer(name, action));
        } else {
          lastStubPromise = appendToReducer(name, action);
        }
      });
    });
  }
};

module.exports = (...args) => {
  console.log(paths.cwd('store'));
  return filesystem.exists(paths.cwd('store/index.js')).then(() => make(...args)).catch((e) => {
    console.log(e);
    console.log('You have to Run "rx init" first');
  });
};
