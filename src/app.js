import path from 'node:path';
import { homedir } from 'node:os';
import * as readline from 'node:readline/promises';
import process, { stdin as input, stdout as output } from 'node:process';

import { getUserNameFromArgs, log, parseCommand } from './utils.mjs';
import getFileList from './modules/getFileList.mjs';
import changeDir from './modules/changeDir.mjs';
import catFile from './modules/catFile.mjs';
import addFile from './modules/addFile.mjs';
import renameFile from './modules/renameFile.mjs';
import moveFile from './modules/moveFile.mjs';
import deleteFile from './modules/deleteFile.mjs';
import osInfo from './modules/osInfo.mjs';
import hashFile from './modules/hashFile.mjs';
import compressFile from './modules/compressFile.mjs';
import decompress from './modules/decompress.mjs';


const userName = getUserNameFromArgs(process.argv.slice(2)) || 'My friend';
let currentDir = homedir();

const printWay = () => log.info(`You are currently in "${ currentDir }"`);
const printInputWarn = () => log.warn('Invalid input');
const printError = (error) => log.error(`Operation failed\n${error}`);

const rl = readline.createInterface({ input, output, prompt: '>' });
rl.on('line', (data) => { execCommand(data) });

const execCommand = async (text) => {
  const { command, args } = parseCommand(text);
  switch (command) {
    case 'up':
    case 'cd..':
      if(args.length) printInputWarn();
      else currentDir = path.normalize(`${currentDir}/..`);
      break;
    case 'cd':
      if(args.length !== 1) printInputWarn();
      else {
        const { data, error } = await changeDir(currentDir, ...args);
        if(error) printError(error);
        if(data) currentDir = data;
      };
      break;
    case 'ls':
      if(args.length) printInputWarn();
      else {
        const { data, error } = await getFileList(currentDir);
        if(error) printError(error);
        if(data) console.table(data);
      }
      break;
    case 'cat':
      if(args.length !== 1) printInputWarn();
      else {
        const { data, error } = await catFile(currentDir, ...args);
        if(error) printError(error);
        if(data) console.log(data);
      };
      break;
    case 'add':
      if(args.length !== 1) printInputWarn();
      else {
        const { data, error } = await addFile(currentDir, ...args);
        if(error) printError(error);
        if(data) log.message(data);
      };
      break;
    case 'rn':
      if(args.length !== 2) printInputWarn();
      else {
        const { data, error } = await renameFile(currentDir, ...args);
        if(error) printError(error);
        if(data) log.message(data);
      };
      break;
    case 'cp':
      if(args.length !== 2) printInputWarn();
      else {
        const { data, error } = await moveFile(currentDir, ...args, true);
        if(error) printError(error);
        if(data) log.message(data);
      };
      break;
    case 'mv':
      if(args.length !== 2) printInputWarn();
      else {
        const { data, error } = await moveFile(currentDir, ...args, false);
        if(error) printError(error);
        if(data) log.message(data);
      };
      break;
    case 'rm':
      if(args.length !== 1) printInputWarn();
      else {
        const { data, error } = await deleteFile(currentDir, ...args);
        if(error) printError(error);
        if(data) log.message(data);
      };
      break;
    case 'os':
      if(!args.length) printInputWarn();
      else {
        args.forEach((arg) => {
          const { data, error } = osInfo(arg);
          if(error) printError(error);
          if(data) console.log(data);
        });
      };
      break;
    case 'hash':
      if(args.length !== 1) printInputWarn();
      else {
        const { data, error } = await hashFile(currentDir, ...args);
        if(error) printError(error);
        if(data) log.message(data);
      };
      break;
    case 'compress':
      if((args.length > 2) && (args.length < 1)) printInputWarn();
      else {
        const { data, error } = await compressFile(currentDir, ...args);
        if(error) printError(error);
        if(data) log.message(data);
      };
      break;
    case 'decompress':
      if((args.length > 2) && (args.length < 1)) printInputWarn();
      else {
        const { data, error } = await decompress(currentDir, ...args);
        if(error) printError(error);
        if(data) log.message(data);
      };
      break;
    case '.exit':
      process.exit();
    default:
      printInputWarn();
      break;
  }
  printWay();
  rl.prompt();
};

log.message(`Welcome to the File Manager, ${ userName }!`);
printWay();
rl.prompt();
process.on('exit', () => {
  log.message(`Thank you for using File Manager, ${userName}, goodbye!`);
});
