import fs from 'fs-extra';
import { down } from '../utils/tool';
import { getPackageJson } from '../utils/env';
import { prettierrcInit } from '../templet/prettierrc';
import { eslintrcInit } from '../templet/eslintrc';
import { getpath } from '../utils/path';

const devDependencies = [
  'eslint',
  'prettier',
  'eslint-friendly-formatter',
  'eslint-config-prettie',
  'eslint-plugin-prettier',
  'eslint-plugin-vue',
  'eslint-plugin-html',
  'plugin:prettier/recommended',
];
export const eslintInit = async () => {
  await down(devDependencies, '-D');
  fs.outputFileSync(getpath('./.eslintrc.js'), eslintrcInit);
  fs.outputFileSync(getpath('./.prettierrc'), prettierrcInit);
  let pkgJson = await getPackageJson();
  if (pkgJson['eslintConfig']) {
    delete pkgJson.eslintConfig;
  }
  fs.writeJsonSync(getpath('package.json'), pkgJson, { spaces: 2 });
};
