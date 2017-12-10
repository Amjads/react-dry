#!/usr/bin/env node

const program = require('commander');
const initRedux = require('./commands/init-redux');
const makeRedux = require('./commands/make-redux');
const makeComponent = require('./commands/make-component');


program
  .command('init:redux')
  .description('Initialize Redux store')
  .action(initRedux);

program
  .command('make:redux')
  .arguments('<name>')
  .option('--api', 'Create async API call Actions')
  .description('Make Redux REDUCER + ACTION')
  .action(makeRedux);

program
  .command('make:component')
  .arguments('<name>')
  .option('-s, --stateless', 'Create Stateless Component')
  .option('-h, --hoc', 'Create Higher order component - HOC')
  .description('Create a component')
  .action(makeComponent);

program.parse(process.argv);
