import spawn from 'cross-spawn';
import { getEnv } from './env';
import { checkNpmOrYarn } from './check';
import { debugInfo, debugWarning } from './debug';
export const down = async (runName: string | string[], type: string) => {
  const basePath = getEnv('base') as string;
  const [n, i] = await checkNpmOrYarn(basePath);
  if (typeof runName === 'string') {
    debugInfo(`安装${runName}`);
    spawn.sync(n, [i, runName, type], {
      stdio: 'inherit',
      cwd: basePath,
    });
    return false;
  }
  runName.forEach((runItem) => {
    debugInfo(`安装${runItem}`);
    spawn.sync(n, [i, runItem, type], {
      stdio: 'inherit',
      cwd: basePath,
    });
  });
};

export const run = async (str: string) => {
  const basePath = getEnv('base') as string;
  const runArr = str.split(' ');
  if (runArr.length < 2) {
    debugWarning(`运行参数错误${str}`);
    return false;
  }
  const [npm, ...args] = runArr;
  debugInfo(`${runArr.join(' ')}✅`);
  spawn.sync(npm, args, {
    stdio: 'inherit',
    cwd: basePath,
  });
};
