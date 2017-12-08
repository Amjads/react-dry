#!/usr/bin/env node

const program = require('commander');
const store = require('./commands/store')
const make = require('./commands/make')


program
    .command('init')
    .description("Initialize Redux store")
    .action(store);


program
    .command('make')
    .arguments('<name>')
    .description("Make REDUCER + ACTION")
    .action(make);


program.parse(process.argv);
