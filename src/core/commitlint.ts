/**
 * husk 结合 commitlint 提交信息校验
 */
import { getPackageJson } from '../utils/env';
import { down, run } from '../utils/tool';
import fs from 'fs-extra';
import { commitLintConfig } from '../utils/commitlint.config';
import { getpath } from '../utils/path';

const devDependencies = [
  ' @commitlint/cli',
  '@commitlint/config-angular',
  'commitizen',
  'cz-customizable',
  '@commitlint/cz-commitlint',
];

export const commitLintInit = async () => {
  await down(devDependencies, '-D');
  await run('npx husky add .husky/commit-msg "npm-run-test"');
  let pkgJson = await getPackageJson();
  pkgJson['config'] = {
    commitizen: {
      path: '@commitlint/cz-commitlint',
    },
  };
  pkgJson.scripts['commit'] = 'git add . && git-cz';
  fs.writeJsonSync(getpath('package.json'), pkgJson, { spaces: 2 });

  fs.outputFileSync(
    getpath('commitlint.config.js'),
    `module.exports=${JSON.stringify(commitLintConfig)}`
  );
};
