
export const getUserNameFromArgs = (args) => {
  const flag = '--username=';
  let arg = args.find((arg) => arg.startsWith(flag));
  if(arg) arg = arg.replace(flag, '').trim();
  return arg || null;
};