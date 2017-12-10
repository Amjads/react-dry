const npm = require('../utils/npm');
const filesystem = require('../utils/filesystem');
const paths = require('../paths');

const {
  readAndCopy,
  mkdir,
} = require('../utils/helpers');

const initializeStore = () => mkdir(paths.cwd('store')).then(() => (
  Promise.all([
    readAndCopy(paths.stubs('store/index.stub'), paths.cwd('store/index.js')),
    readAndCopy(paths.stubs('store/configureStore.dev.stub'), paths.cwd('store/configureStore.dev.js')),
    readAndCopy(paths.stubs('store/configureStore.prod.stub'), paths.cwd('store/configureStore.prod.js')),
  ])
));

const initializeReducers = () => mkdir(paths.cwd('reducers'))
  .then(() => (
    readAndCopy(paths.stubs('reducers/index.stub'), paths.cwd('reducers/index.js'))));


const init = () => {
  const packages = ['redux', 'react-redux', 'redux-thunk', 'redux-logger'];
  npm.install(...packages).then(() => (
    initializeStore()
      .then(initializeReducers)
      .then(() => mkdir(paths.cwd('actions')))
      .then(() => mkdir(paths.cwd('middleware')))
  ));
};

module.exports = (...args) => {
  filesystem.notExists(paths.cwd('store/index.js')).then(() => init(...args)).catch(() => {
    console.log('Redux already initialized on your app');
  });
};
