import fs from 'fs-extra';
import { writeInPkg } from '../utils/tool';
import { getPackageJson, getEnv } from '../utils/env';
import { prettierrcInit } from '../templet/prettierrc';
import { eslintrcFn } from '../templet/eslintrc';
import { getpath } from '../utils/path';

export const eslintInit = async () => {
  let devDependencies: string[] = [];
  if (getEnv('isVue2')) {
    devDependencies = [
      'eslint@^7.25.0',
      'prettier@^2.7.1',
      'eslint-friendly-formatter@^4.0.1',
      'eslint-plugin-prettier@^4.0.0',
      'eslint-plugin-vue@^6.2.2',
      'eslint-plugin-html@^6.2.0',
      'eslint-config-prettier@^8.5.0',
    ];
  }
  // 'plugin:prettier/recommended@',
  if (getEnv('isVue3')) {
    devDependencies = [
      'eslint@^8.19.0',
      'prettier@^2.7.1',
      'eslint-friendly-formatter@^4.0.1',
      'eslint-plugin-prettier@^4.2.1',
      'eslint-plugin-vue@^9.2.0',
      'eslint-plugin-html@^6.2.0',
      'eslint-config-prettier@^8.5.0',
      '@typescript-eslint/parser@^5.30.6',
    ];
  }
  // 调用down直接可以把依赖安装好
  // await down(devDependencies, '-D');
  // writeInPkg 只是把依赖写入到package中
  await writeInPkg(devDependencies, 'devDependencies');
  fs.outputFileSync(getpath('./.eslintrc.js'), eslintrcFn());
  fs.outputFileSync(getpath('./.prettierrc'), prettierrcInit);
  let pkgJson = await getPackageJson();
  if (pkgJson['eslintConfig']) {
    delete pkgJson.eslintConfig;
  }
  fs.writeJsonSync(getpath('package.json'), pkgJson, { spaces: 2 });
};
