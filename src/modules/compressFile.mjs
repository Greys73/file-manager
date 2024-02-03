import fs from 'node:fs';
import zlib from 'node:zlib';
import path from 'node:path';
import stream from 'node:stream';
import { getNormalizedPath } from '../utils.mjs';

const compressFile = async (currentDir, sourceFile, destDir='') => {
  const sourcePath = getNormalizedPath(currentDir, sourceFile);
  const fileName = `${path.parse(sourcePath).name}.gz`;
  const destPath = path.join(getNormalizedPath(currentDir, destDir), fileName);
  const successMsg = `"${sourcePath}" archived to "${destPath}"`
  const source = fs.createReadStream(sourcePath, 'utf8');
  const archive = fs.createWriteStream(destPath);
  const gzip = zlib.createBrotliCompress();
  try {
    await stream.promises.pipeline(source, gzip, archive);
    return {data: successMsg, error: null};
  } catch(error) {
    fs.unlink(destPath, () => {});
    return {data: null, error};
  }
};

export default compressFile;