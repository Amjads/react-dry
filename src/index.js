#!/usr/bin/env node

const program = require('commander');
const init = require('./commands/init');
const make = require('./commands/make');


program
  .command('init')
  .description('Initialize Redux store')
  .action(init);

program
  .command('make')
  .arguments('<name>')
  .option('--api', 'Create async API call Actions')
  .description('Make REDUCER + ACTION')
  .action(make);


program.parse(process.argv);
