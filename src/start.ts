// 开始分析项目
import { getPackageJson, initProjectInfo, getEnv } from './utils/env';
import { debugError, debugInfo, debugprocess, debugTxt } from './utils/debug';
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
    // TODO: 安装eslint 和 preitter 并自动生成配置文件
    await eslintInit();
    // TODO: 安装 hucky 并自动生成配置文件
    await huskyInit();
    // TODO: 生成.vscode 配置文件 支持自动格式化代码
    await commitLintInit();
    // TODO: 添加eslint忽略文件
    await eslintignoreInit();
    // await downNodeModules();
    await vscodeInit();
    debugInfo('success!');
    debugprocess('请重新安装依赖！npm install or yarn or ...');
    debugTxt(`

    😎 请确保您吃饭的家伙是vscode
    😘 推荐安装vscode插件 eslint、prettier(这不是广告)
    😫 一脸懵逼？请前往 https://github.com/lyh0371/web-norm
    `);
    debugTxt(``);
  } catch (error) {
    debugError(JSON.stringify(error));
  }
};
