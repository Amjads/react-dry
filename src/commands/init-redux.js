const npm = require('../utils/npm');
const { cwd, stubs } = require('../paths');
const { notExists } = require('../utils/filesystem');
const { readAndCopy, mkdir } = require('../utils/helpers');

const initializeStore = () => mkdir(cwd('store')).then(() => (
  Promise.all([
    readAndCopy(stubs('store/index.stub'), cwd('store/index.js')),
    readAndCopy(stubs('store/configureStore.dev.stub'), cwd('store/configureStore.dev.js')),
    readAndCopy(stubs('store/configureStore.prod.stub'), cwd('store/configureStore.prod.js')),
  ])
));

const initializeReducers = () => (
  mkdir(cwd('reducers'))
    .then(() => readAndCopy(stubs('reducers/index.stub'), cwd('reducers/index.js')))
);

const initializeActions = () => mkdir(cwd('actions')) ;

const init = () => {
  const packages = ['redux', 'react-redux', 'redux-thunk', 'redux-logger'];
  npm.install(...packages)
    .then(initializeStore)
    .then(initializeReducers)
    .then(initializeActions);
};

module.exports = (...args) => {
  notExists(cwd('store/index.js'))
    .then(() => init(...args))
    .catch(() => {
      console.log('Redux already initialized on your app');
    });
};
