// 各种检测函数
import fs from 'fs-extra';
import { debugError } from './debug';

/**
 * @name 判断文件夹存不存在
 */
export const pathExists = async (
  base: string,
  name: string
): Promise<boolean | void> => {
  const res = await fs.pathExists(`${base}/${name}`);
  if (!res) {
    debugError(`${base}/${name}不存在`);
    return false;
  } else {
    return res;
  }
};

/**
 * @name 判断是哪个vue版本
 */
export const checkVueVersion = (version: string) => {
  return parseInt(version.split('.')[0], 10);
};

/**
 * @name 判断使用的是npm和yarn
 */
export const checkNpmOrYarn = async (basePath: string): Promise<string[]> => {
  // 如果原项目使用的是yarn进行安装的，那还是使用npm进行按照，否则就使用npm
  if (await pathExists(basePath, 'yarn.lock')) {
    return ['yarn', 'add'];
  }
  return ['npm', 'init'];
};
