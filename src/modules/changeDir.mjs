import fs from 'node:fs/promises';
import path from 'node:path';

const changeDir = async (currentDir, folder) => {
  try {
    const data = path.normalize(path.isAbsolute(folder) ? folder : `${currentDir}/${folder}`);
    await fs.access(data);
    return {data, error: null};
  } catch(error) {
    return {data: null, error};
  }
};

export default changeDir;