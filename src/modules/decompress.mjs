import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import stream from 'node:stream';
import { getNormalizedPath } from '../utils.mjs';

const decompress = async (currentDir, sourceFile, destDir='') => {
  const sourcePath = getNormalizedPath(currentDir, sourceFile);
  const fileName = path.parse(sourcePath).name;
  const destPath = path.join(getNormalizedPath(currentDir, destDir), fileName);

  const successMsg = `"${sourcePath}" unpacked to "${destPath}"`
  const source = fs.createReadStream(sourcePath);
  const destination = fs.createWriteStream(destPath, 'utf8');
  const unzip = zlib.BrotliDecompress();
  try {
    await stream.promises.pipeline(source, unzip, destination);
    return {data: successMsg, error: null};
  } catch(error) {
    return {data: null, error};
  }
};

export default decompress;