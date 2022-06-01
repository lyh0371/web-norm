import { getEnv } from '../utils/env';
// import { checkNpmOrYarn } from '../utils/check';
import { debugError, debugInfo } from '../utils/debug';
// import spawn from 'cross-spawn';
export const eslintInit = async () => {
  if (!getEnv('isEslint')) {
    debugError('你未安装eslint，请先按照eslint');
    debugInfo('vue2项目可以使用 vue add eslint 进行按照');
    return false;
  }

  // const basePath = getEnv('base') as string;
  // const res = await checkNpmOrYarn(basePath);
  // const [sname, spaw] = res;
  // const ps = spawn.sync(sname, [spaw, 'eslint'], {
  //   stdio: 'ignore',
  //   cwd: basePath,
  // });

  // console.log(ps);

  // debugInfo('eslint 安装成功');
};
