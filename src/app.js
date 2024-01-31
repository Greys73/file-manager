import * as readline from 'node:readline/promises';
import process, { stdin as input, stdout as output } from 'node:process';
import { getUserNameFromArgs  } from './utils.mjs';

const execCommand = (command) => {
  console.log(command);
};

const userName = getUserNameFromArgs(process.argv.slice(2)) || 'My friend';
console.log(`Welcome to the File Manager, ${userName}!`);

const rl = readline.createInterface({ input, output });
rl.on('line', (data) => { execCommand(data) });

process.on('exit', () => {
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
});
