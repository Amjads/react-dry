const filesystem = require('./filesystem');
const template = require('lodash.template');

const mkdir = path => (
  filesystem
    .notExists(path)
    .then(() => {
      filesystem.mkdir(path).then(() => console.log(`Created ${path}`));
    })
    .catch(err => console.log(`Directory ${path} already exists`, err))
);


const copyTo = (path, data) => {
  console.log('Copy to', path);
  filesystem.write(path, data);
};


const readAndCopy = (readFrom, dest, vars = {}) => (
  filesystem
    .read(readFrom)
    .then(data => copyTo(dest, template(data)(vars)))
    .catch(err => console.log(err))
);

const compose = (...funcs) => {
  if (funcs.length === 0) {
    return arg => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)));
};


module.exports = {
  mkdir,
  copyTo,
  readAndCopy,
  compose
};
