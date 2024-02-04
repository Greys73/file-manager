import fs from 'node:fs';
import crypto from 'node:crypto';
import { getNormalizedPath } from '../utils.mjs';

const hashFile = (currentDir, arg) => {  
  const pathToFile = getNormalizedPath(currentDir, arg);
  return new Promise((resolve) => {
    let data = '';
    const stream = fs.createReadStream(pathToFile, 'utf8');
    const hash = crypto.createHash('sha256');
    stream.on('end', () => {
      hash.end();
      data += hash.read();
      return resolve({data, error: null})
    });
    stream.on('error', (error) => resolve({data: null, error}));
    stream.pipe(hash).setEncoding('hex');
  });
};

export default hashFile;