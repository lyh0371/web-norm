// import { loadJsonFile } from 'load-json-file';
import path from 'path';
import fs from 'fs-extra';
import { pathExists, checkVueVersion } from './check';

//
const env = {
  base: '',
  isVue: false,
  isVue3: false,
  isVue2: false,
  isVueCli: false,
  isWebpack: true,
  isEslint: false,
};

type envKeys = keyof typeof env;

/**
 * @name 设置变量
 */
export const setEnv = (key: envKeys, val: any) => {
  env[key] = val as never;
};
/**
 * @name 获取变量
 */
export const getEnv = (key: envKeys) => {
  return env[key];
};

/**
 * @name 把package.json转化为json
 */
export const getPackageJson = async (
  base: string = getEnv('base') as string
) => {
  if (!(await pathExists('package.json'))) process.exit(0);
  const file = path.resolve(base, 'package.json');
  const json = fs.readJSON(file);
  return json;
};

export const initProjectInfo = (pckJson: any) => {
  const deps = { ...pckJson.devDependencies, ...pckJson.dependencies };

  if (deps['vue'] && checkVueVersion(deps['vue']) === 2) {
    setEnv('isVue2', true);
  }
  if (deps['eslint']) {
    setEnv('isEslint', true);
  }
};
