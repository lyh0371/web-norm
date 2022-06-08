import { down, run } from '../utils/tool';
import fs from 'fs-extra';
import { getPackageJson } from '../utils/env';
import { getpath } from '../utils/path';
import { debugInfo, debugWarning } from '../utils/debug';
import { pathExists } from '../utils/check';
// 需要安装的依赖
const devDependencies = ['husky', 'lint-staged'];

export const huskyInit = async () => {
  // 检查是否有git 如果没有 需要先初始化git
  if (!pathExists('.git', false)) {
    debugWarning(`请先初始化git`);
    debugInfo('参考命令 git init');
    process.exit();
  }
  // 安装依赖
  await down(devDependencies, '-D');
  // 更改package
  let pkgJson = await getPackageJson();
  pkgJson.scripts['prepare'] = 'husky install';
  pkgJson.scripts['pre-commit'] = 'lint-staged';
  pkgJson.scripts['pre-commit'] = 'lint-staged';
  pkgJson['lint-staged'] = {
    '*.{js,ts,vue,jsx,tsx}': ['vue-cli-service lint'],
  };
  fs.writeJsonSync(getpath('package.json'), pkgJson, { spaces: 2 });
  debugInfo('初始化 husky');

  await run('npm run prepare');
  await run('npx husky add .husky/pre-commit "npm-run-pre-commit"');
};
