import fs from 'node:fs/promises';
import { getNormalizedPath } from '../utils.mjs';

const changeDir = async (currentDir, folder) => {
  try {
    const data = getNormalizedPath(currentDir, folder);
    await fs.access(data);
    return {data, error: null};
  } catch(error) {
    return {data: null, error};
  }
};

export default changeDir;