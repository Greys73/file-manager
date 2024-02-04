import path from 'node:path';

export const getUserNameFromArgs = (args) => {
  const flag = '--username=';
  let arg = args.find((arg) => arg.startsWith(flag));
  if(arg) arg = arg.replace(flag, '').trim();
  return arg || null;
};

const reset = '\x1b[0m';
export const log = {
  error: (text) => console.log('\x1b[31m' + text + reset),
  info: (text) => console.log('\x1b[32m' + text + reset),
  warn: (text) => console.log('\x1b[33m' + text + reset),
  message: (text) => console.log('\x1b[47m' + text + reset),
}

export const parseCommand = (text) => {
  const regex = /[^\s"]+|"([^"]*)"/g;
  const matches = text.match(regex);
  const command = matches.shift();
  const args = matches.map((arg) => arg.replaceAll('"', ''));
  return { command, args };
}

export const isValidFilename = (filename) => {
  const regex = /^[^\\/:\*\?"<>\|]+$/g;
  return regex.test(filename);
}

export const getNormalizedPath = (cd, arg) => {
  const resultPath = path.isAbsolute(arg) ? arg : `${cd}/${arg}`;
  return path.normalize(resultPath);
}