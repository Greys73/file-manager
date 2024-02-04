import fs from 'node:fs';

const getFileList = async (path) => {
  try {
    const files = await fs.promises.readdir(path, {withFileTypes: true});
    const data = files.map((file) => {
      return { Name: file.name, Type: file.isDirectory() ? 'folder' : 'file' }
    });
    data.sort((a, b) => {
      if (a.Type.length < b.Type.length) return 1;
      if (a.Type.length > b.Type.length) return -1;
      return 0;
    });
    return {data, error: null};
  } catch(error) {
    return {data: null, error};
  }
};

export default getFileList;