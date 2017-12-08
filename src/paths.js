const cwd = (path = '') => `${process.cwd()}/src/${path}`;

const base = (path = '') => `${__dirname}/${path}`;

const stubs = (path = '') => base(`../stubs/${path}`)

module.exports = {

    base,
    base,
    cwd,
    stubs

}