import fs from 'node:fs';
import path from 'node:path';
import { getNormalizedPath } from '../utils.mjs';

const copyFile = async (currentDir, sourceFile, destDir) => {
  const sourcePath = getNormalizedPath(currentDir, sourceFile);
  const fileName = path.basename(sourcePath);
  const destPath = `${getNormalizedPath(currentDir, destDir)}\\${fileName}`;
  const successMsg = `Success: "${sourceFile}" was copyed to "${destDir}"`
  return new Promise((resolve) => {
    const readStream = fs.createReadStream(sourcePath);
    const writeStream = fs.createWriteStream(destPath);

    readStream.pipe(writeStream);
    readStream.on('end', () => resolve({data: successMsg, error: null}));
    readStream.on('error', (error) => resolve({data: null, error}));
    writeStream.on('error', (error) => resolve({data: null, error}));
  });
};

export default copyFile;