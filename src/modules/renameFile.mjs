import fs from 'node:fs';
import { getNormalizedPath } from '../utils.mjs';

const renameFile = async (currentDir, sourceFile, destFile) => {
  try {
    const sourcePath = getNormalizedPath(currentDir, sourceFile);
    const destPath = getNormalizedPath(currentDir, destFile);
    await fs.promises.rename(sourcePath, destPath);
    const successMsg = `File "${sourceFile}" was renamed to "${destFile}"!`
    return {data: successMsg, error: null};
  } catch(error) {
    return {data: null, error};
  }
};

export default renameFile;