const paths = require('../paths')
const filesystem = require('../utils/filesystem')
const template = require('lodash.template')

const readAndCopy = (from, to, vars = {}) => {
    return filesystem
        .read(from)
        .then(data => {
            const compiledTemplate = template(data)(vars);
            return filesystem.write(to, compiledTemplate)
        })
}

const make = (name) => {


    readAndCopy(
        paths.stubs('reducers/reducer.stub'),
        paths.cwd(`reducers/${name}.js`),
        {
            actionName: name
        })


    readAndCopy(
        paths.stubs(`actions/action/index.js`),
        paths.cwd(`actions/${name}/index.js`),
        {
            actionName: name
        })


}


module.exports = make;