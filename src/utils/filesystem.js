const fs = require('fs');

const exists = (path) => new Promise((resolve, reject) => {
    fs.stat(path, (err, stat) => {
        if (err) {
            reject(err)
        } else {
            resolve(stat)
        }
    })
});

const read = (path) => new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
        if (err) {
            reject(err)
        } else {
            resolve(data)
        }
    })
});

const notExists = (path) => new Promise((resolve, reject) => {
    fs.stat(path, (err, stat) => {
        if (err) {
            resolve(stat)
        } else {
            reject(err)
        }
    })
});

const mkdir = (path, mode) => new Promise((resolve, reject) => {
    fs.mkdir(path, mode, (err) => {
        if (err) {
            reject(err)
        } else {
            resolve()
        }
    })
});

const write = (file, data, options) => new Promise((resolve, reject) => {
    fs.writeFile(file, data, options, (err) => {
        if (err) {
            reject(err)
        } else {
            resolve()
        }
    })
});


module.exports = {
    exists,
    notExists,
    read,
    write,
    mkdir
}