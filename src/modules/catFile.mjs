import fs from 'node:fs';
import path from 'node:path';

const catFile = (currentDir, arg) => {  
  const pathToFile = path.normalize(path.isAbsolute(arg) ? arg : `${currentDir}/${arg}`);
  return new Promise((resolve) => {
    let data = '\n';
    const stream = fs.createReadStream(pathToFile, 'utf8');
    stream.on('data', (chunk) => data += chunk);
    stream.on('end', () => resolve({data, error: null}));
    stream.on('error', (error) => resolve({data: null, error}));
  });
};

export default catFile;