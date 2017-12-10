const filesystem = require('./filesystem');
const template = require('lodash.template');


/**
 * Create a directory if it not exists
 *
 * @param path
 * @return Promise
 */
const mkdir = path => (
  filesystem
    .notExists(path)
    .then(() => filesystem.mkdir(path).then(() => console.log(`Created ${path}`)))
    .catch(err => console.log(`Directory ${path} already exists`, err))
);

/**
 * Read file contents , replace variables and save it to new destination
 * @param readFrom
 * @param dest
 * @param vars
 * @return Promise
 */
const readAndCopy = (readFrom, dest, vars = {}) => (
  filesystem
    .read(readFrom)
    .then(data => filesystem.write(dest, template(data)(vars)))
    .catch(err => console.log(err))
);

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @url https://github.com/reactjs/redux/blob/master/src/compose.js
 *
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
*/

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
  readAndCopy,
  compose,
};
