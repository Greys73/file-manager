import path from 'node:path';
import { homedir } from 'node:os';
import * as readline from 'node:readline/promises';
import process, { stdin as input, stdout as output } from 'node:process';

import getFileList from './modules/getFileList.mjs';
import { getUserNameFromArgs, log, parseCommand } from './utils.mjs';
import changeDir from './modules/changeDir.mjs';

const userName = getUserNameFromArgs(process.argv.slice(2)) || 'My friend';
let currentDir = homedir();

const printWay = () => log.info(`You are currently in ${ currentDir }`);

const rl = readline.createInterface({ input, output, prompt: '>' });
rl.on('line', (data) => { execCommand(data) });

const execCommand = async (text) => {
  const { command, args } = parseCommand(text);
  // console.log(command, args);
  switch (command) {
    case 'up':
    case 'cd..':
      if(args.length) log.warn('Invalid input');
      else currentDir = path.normalize(`${currentDir}/..`);
      break;
    case 'cd':
      if(args.length !== 1) log.warn('Invalid input');
      else {
        const { data, error } = await changeDir(currentDir, args[0]);
        if(error) log.warn(error);
        if(data) currentDir = data;
      };
      break;
    case 'ls':
      if(args.length) log.warn('Invalid input');
      else {
        const { data, error } = await getFileList(currentDir);
        if(error) log.warn(error);
        if(data) console.table(data);
      }
      break;
    case '.exit':
      process.exit();
    default:
      log.warn('Invalid input');
      break;
  }
  printWay();
};


log.message(`Welcome to the File Manager, ${ userName }!`);
printWay();
process.on('exit', () => {
  log.message(`Thank you for using File Manager, ${userName}, goodbye!`);
});
