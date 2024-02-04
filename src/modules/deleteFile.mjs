import fs from 'node:fs';
import { getNormalizedPath } from '../utils.mjs';

const deleteFile = async (currentDir, file) => {  
  const pathToFile = getNormalizedPath(currentDir, file);
  const successMsg = `"${pathToFile}" was deleted!`
  try {
    await fs.promises.rm(pathToFile, { recursive: true });
    return {data: successMsg, error: null};
  } catch(error) {
    return {data: null, error};
  }
};

export default deleteFile;