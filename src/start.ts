// 开始分析项目
import { getPackageJson, initProjectInfo, getEnv } from './utils/env';
import { debugError, debugInfo } from './utils/debug';
import { eslintInit } from './core/eslint';
import { huskyInit } from './core/husky';
import { eslintignoreInit } from './core/eslintignore';
import { commitLintInit } from './core/commitlint';
import { vscodeInit } from './core/vscode';
export const start = async (base: string) => {
  const pckJson = await getPackageJson(base);
  initProjectInfo(pckJson);
  // TODO: 分析package.json 1.查看项目类型
  if (!getEnv('isVue2')) {
    debugError('暂不支持除vue2之外的其他版本');
  }
  // TODO: 安装eslint 和 preitter 并自动生成配置文件
  await eslintInit();
  // TODO: 安装 hucky 并自动生成配置文件
  await huskyInit();
  // TODO: 生成.vscode 配置文件 支持自动格式化代码
  await commitLintInit();
  // TODO: 添加eslint忽略文件
  await eslintignoreInit();
  await vscodeInit();
  debugInfo('success!');
};
