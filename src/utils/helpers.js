const filesystem = require('./filesystem')

const mkdir = (path) => (
    filesystem
        .notExists(path)
        .then(() => {
            filesystem.mkdir(path).then(() => console.log(`Created ${path}`))
        })
        .catch((err) => console.log(`Directory ${path} already exists`))
);


const copyTo = (path, data) => {
    console.log("Copy to", path)
    filesystem.write(path, data)
};


const readAndCopy = (readFrom, dest) => (
    filesystem
        .read(readFrom)
        .then(data => copyTo(dest, data))
        .catch(err => console.log(err))
);


module.exports = {
    mkdir,
    copyTo,
    readAndCopy
}