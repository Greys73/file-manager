import fs from 'node:fs';
import path from 'node:path';
import { isValidFilename } from '../utils.mjs';

const addFile = (currentDir, arg) => {
  return new Promise((resolve) => {
    if(isValidFilename(arg)) {
      const pathToFile = path.normalize(`${currentDir}/${arg}`);
      const stream = fs.createWriteStream(pathToFile, { flags: 'wx' });
      const successMsg = `File "${arg}" was created in"${currentDir}"!`
      stream.on('error', (error) => resolve({data: null, error}));
      stream.on('finish', () => resolve({data: successMsg, error: null}));
      stream.end();
    } else {
      resolve({data: null, error: 'Invalid file name!'});
    }
  });
};

export default addFile;