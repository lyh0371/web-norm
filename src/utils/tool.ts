import spawn from 'cross-spawn';
import createLogger from 'progress-estimator';
import { join } from 'path';
import { getEnv } from './env';
import { checkNpmOrYarn } from './check';
import { debugInfo, debugWarning } from './debug';

export const down = async (runName: string | string[], type: string) => {
  const basePath = getEnv('base') as string;
  const [n, i] = await checkNpmOrYarn(basePath);
  if (typeof runName === 'string') {
    await logger(spawnSync(n, i, runName, type, basePath), runName);
    return false;
  }
  runName.forEach(async (runItem) => {
    await logger(spawnSync(n, i, runItem, type, basePath), runItem);
  });
};

export const spawnSync = (
  n: string,
  i: string,
  runItem: string,
  type: string,
  basePath: string
) => {
  return new Promise((resolve) => {
    spawn.sync(n, [i, runItem, type], {
      stdio: 'pipe',
      cwd: basePath,
    });
    debugInfo(`${runItem}✅`);

    resolve({ success: true });
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
    stdio: 'pipe',
    cwd: basePath,
  });
};

export const logger = createLogger({
  storagePath: join(__dirname, '.progress-estimator'),
});
