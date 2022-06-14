// 开始分析项目
import { getPackageJson, initProjectInfo, getEnv } from './utils/env';
import { debugError, debugInfo } from './utils/debug';
import { eslintInit } from './core/eslint';
import { huskyInit } from './core/husky';
import { eslintignoreInit } from './core/eslintignore';
import { commitLintInit } from './core/commitlint';
import { vscodeInit } from './core/vscode';
import { logger } from './utils/tool';
export const start = async (base: string) => {
  const pckJson = await getPackageJson(base);
  const loading = async () => {
    return new Promise((resolve) => {
      setTimeout(async () => {
        resolve('success');
      }, 1000);
    });
  };

  initProjectInfo(pckJson);
  // TODO: 分析package.json 1.查看项目类型
  if (!getEnv('isVue2')) {
    debugError('暂不支持除vue2之外的其他版本');
  }
  try {
    await logger(loading(), '分析项目中');
    // TODO: 安装eslint 和 preitter 并自动生成配置文件
    debugInfo('当前进度10%，请等待...');
    await eslintInit();
    debugInfo('当前进度30%，请等待...');
    // TODO: 安装 hucky 并自动生成配置文件
    await huskyInit();
    debugInfo('当前进度50%，请等待...');
    // TODO: 生成.vscode 配置文件 支持自动格式化代码
    await commitLintInit();
    debugInfo('当前进度80%，请等待...');
    // TODO: 添加eslint忽略文件
    await eslintignoreInit();
    debugInfo('当前进度100%，请等待...');
    await vscodeInit();
  } catch (error) {
    debugError(JSON.stringify(error));
  }

  debugInfo('success!');
};
