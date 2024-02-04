import fs from 'node:fs';
import path from 'node:path';
import { getNormalizedPath, isValidFilename } from '../utils.mjs';

const renameFile = async (currentDir, sourceFile, destFile) => {
  try {
    if(!isValidFilename(destFile)) throw new Error;
    const sourcePath = getNormalizedPath(currentDir, sourceFile);
    const destPath = path.join(path.dirname(sourcePath), destFile);
    await fs.promises.rename(sourcePath, destPath);
    const successMsg = `File "${sourcePath}" was renamed to "${destFile}"`
    return {data: successMsg, error: null};
  } catch(error) {
    return {data: null, error};
  }
};

export default renameFile;