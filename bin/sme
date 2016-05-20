#!/usr/bin/env node
// http://yargs.js.org/docs/
require('yargs')
  .usage('$0 <cmd> [args]')
  .option('sourceFullApi', {
    describe: 'input file with source Swagger file with Swagger extensions'
  })
  .option('sourceApi', {
    describe: 'input file with source Swagger file without extensions'
  })
  .option('sourceExtensions', {
    describe: 'input file with Swagger extensions only'
  })
  .command('hello', 'welcome ter yargs!', {}, function (argv) {
    console.log('hello', argv.name, 'welcome to yargs!');
  })
  .command('split <sourceFullApi>', 'split Swagger API file')
  .command('merge <sourceApi> <sourceExtensions>', 'merge Swagger API file and Swagger Extensions file')
  .help('help')
  .argv();
