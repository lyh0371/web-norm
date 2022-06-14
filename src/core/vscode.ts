/**
 * vscode 配置
 */
import fs from 'fs-extra';
import { getpath } from '../utils/path';

export const vscodeInit = async () => {
  const haveVscodeSetting = await fs.pathExists(
    getpath('./vscode/settings.json')
  );

  let vscodeSetting = {};
  if (!haveVscodeSetting) {
    vscodeSetting = {
      'editor.formatOnSave': true, //每次保存自动格式化
      '[vue]': {
        'editor.defaultFormatter': 'esbenp.prettier-vscode',
      },
      '[javascript]': {
        'editor.defaultFormatter': 'esbenp.prettier-vscode',
      },
      'editor.codeActionsOnSave': {
        'source.fixAll.eslint': true,
      },
    };
  } else {
    // const nowSetting = await getPackageJson('./vscode/settings.json');
    const nowSetting = fs.readJSON(getpath('./vscode/settings.json'));

    vscodeSetting = { ...nowSetting, ...vscodeSetting };
  }
  fs.outputFileSync(
    getpath('./vscode/settings.json'),
    JSON.stringify(vscodeSetting, null, 2)
  );
};
