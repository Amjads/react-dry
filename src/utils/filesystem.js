const fs = require('fs');

/**
 * Check if file exists
 *
 * @param path
 * @return Promise
 */
const exists = path => new Promise((resolve, reject) => {
  fs.stat(path, (err, stat) => {
    if (err) {
      reject(err);
    } else {
      resolve(stat);
    }
  });
});

/**
 * Read file contents
 *
 * @param path
 * @return Promise
 */
const read = path => new Promise((resolve, reject) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

/**
 * Check if file not exists
 *
 * @param path
 * @return Promise
 */
const notExists = path => new Promise((resolve, reject) => {
  fs.stat(path, (err, stat) => {
    if (err) {
      resolve(stat);
    } else {
      reject(err);
    }
  });
});

/**
 * Create a directory
 *
 * @param path
 * @param mode
 * @return Promise
 */
const mkdir = (path, mode) => new Promise((resolve, reject) => {
  fs.mkdir(path, mode, (err) => {
    if (err) {
      reject(err);
    } else {
      resolve();
    }
  });
});

/**
 * Write data to file
 *
 * @param file
 * @param data
 * @param options
 * @return Promise
 */
const write = (file, data, options) => new Promise((resolve, reject) => {
  fs.writeFile(file, data, options, (err) => {
    if (err) {
      reject(err);
    } else {
      resolve();
    }
  });
});


module.exports = {
  exists,
  notExists,
  read,
  write,
  mkdir,
};
