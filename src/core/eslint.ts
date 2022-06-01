import { getEnv } from '../utils/env';
import { checkNpmOrYarn } from '../utils/check';
import { debugInfo } from '../utils/debug';
import spawn from 'cross-spawn';
export const eslintInit = async () => {
  const basePath = getEnv('base') as string;
  const res = await checkNpmOrYarn(basePath);
  const [sname, spaw] = res;
  const ps = spawn.sync(sname, [spaw, 'eslint'], {
    stdio: 'ignore',
    cwd: basePath,
  });

  console.log(ps);

  debugInfo('eslint 安装成功');
};
