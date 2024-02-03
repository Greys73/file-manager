import fs from 'node:fs';
import path from 'node:path';
import { getNormalizedPath } from '../utils.mjs';

const moveFile = async (currentDir, sourceFile, destDir, isCopy) => {
  const sourcePath = getNormalizedPath(currentDir, sourceFile);
  const fileName = path.basename(sourcePath);
  const destPath = `${getNormalizedPath(currentDir, destDir)}\\${fileName}`;
  const successMsg = `"${sourceFile}" was ${isCopy ? 'copyed' : 'moving'} to "${destPath}"`
  return new Promise((resolve) => {
    const readStream = fs.createReadStream(sourcePath);
    const writeStream = fs.createWriteStream(destPath);
    
    readStream.on('end', async () => {
      if(!isCopy) {
        try { await fs.promises.unlink(sourcePath) }
        catch(error) { return resolve({data: null, error}) }
      }
      return resolve({data: successMsg, error: null});
    });
    readStream.on('error', (error) => resolve({data: null, error}));
    writeStream.on('error', (error) => resolve({data: null, error}));
    readStream.pipe(writeStream);
  });
};

export default moveFile;