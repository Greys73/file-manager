import * as os from 'node:os';

const osInfo = (arg) => {
  let data;
  let error;
  switch (arg) {
    case '--EOL':
      data = `Default system End-Of-Line is ${JSON.stringify(os.EOL)}\n`;
      break;
    case '--cpus':
      const cpus = os.cpus();
      data = `Overall amount of CPUS = ${cpus.length}\n`;
      cpus.map((cpu, id) => {
        data += `CPU-${id + 1}: ${cpu.model}, ${(cpu.speed / 1000).toFixed(1)}GHz\n`;
      });
      break;
    case '--homedir':
      data = `Home directory is "${os.homedir()}"\n`;
      break;
    case '--username':
      data = `System current user name is "${os.userInfo().username}"\n`;
      break;
    case '--architecture':
      data = `CPU architecture is "${os.arch()}"\n`;
      break;
    default:
      error = `Invalid parameter "${arg}"\n`;
      break;
  }
  return {data, error };
};

export default osInfo;