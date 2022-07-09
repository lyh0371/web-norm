// 开始分析项目
import { getPackageJson, initProjectInfo, getEnv } from './utils/env';
import { debugError, debugInfo, debugprocess } from './utils/debug';
import { eslintInit } from './core/eslint';
import { huskyInit } from './core/husky';
import { eslintignoreInit } from './core/eslintignore';
import { commitLintInit } from './core/commitlint';
import { vscodeInit } from './core/vscode';
export const start = async (base: string) => {
  const pckJson = await getPackageJson(base);

  await initProjectInfo(pckJson);
  // TODO: 分析package.json 1.查看项目类型
  if (!getEnv('isVue')) {
    debugError('暂不支持除Vue之外的其他版本');
  }
  try {
    debugprocess('开始分析项目，请稍等...');
    // TODO: 安装eslint 和 preitter 并自动生成配置文件
    await eslintInit();
    debugprocess('当前进度30%，请等待...');
    // TODO: 安装 hucky 并自动生成配置文件
    await huskyInit();
    debugprocess('当前进度50%，请等待...');
    // TODO: 生成.vscode 配置文件 支持自动格式化代码
    await commitLintInit();
    debugprocess('当前进度80%，请等待...');
    // TODO: 添加eslint忽略文件
    await eslintignoreInit();
    debugprocess('当前进度100%');
    await vscodeInit();
  } catch (error) {
    debugError(JSON.stringify(error));
  }

  debugInfo('success!');

  debugprocess(`温馨提示：
    1. 请确保您使用编辑器是vscode
    2. 推荐安装vscode插件 eslint、prettier`);
};
