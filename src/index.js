#!/usr/bin/env node

const program = require('commander');
const store = require('./commands/store')


program
    .command('make:store')
    .description("Create redux store")
    .action(store);


program.parse(process.argv);
