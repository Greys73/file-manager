import fs from 'node:fs';
import path from 'node:path';
import { isValidFilename } from '../utils.mjs';

const addFile = (currentDir, arg) => {
  return new Promise((resolve) => {
    if(isValidFilename(arg)){
      const pathToFile = path.normalize(`${currentDir}/${arg}`);
      const stream = fs.createWriteStream(pathToFile, { flags: 'wx' });
      stream.on('error', (error) => resolve({data: null, error}));
      stream.on('finish', () => resolve({data: `File "${arg}" was created!`, error: null}));
      stream.end();
    } else {
      resolve({data: null, error: 'Invalid file name!'});
    }
  });
};

export default addFile;