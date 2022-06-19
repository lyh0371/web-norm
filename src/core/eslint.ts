import fs from 'fs-extra';
import { down } from '../utils/tool';
import { getPackageJson } from '../utils/env';
import { prettierrcInit } from '../templet/prettierrc';
import { eslintrcInit } from '../templet/eslintrc';
import { getpath } from '../utils/path';

const devDependencies = [
  'eslint@^7.25.0',
  'prettier@^2.7.1',
  'eslint-friendly-formatter@^4.0.1',
  'eslint-plugin-prettier@^4.0.0',
  'eslint-plugin-vue@^6.2.2',
  'eslint-plugin-html@^6.2.0"',
  'plugin:prettier/recommended',
  'eslint-config-prettier@^8.5.0',
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
