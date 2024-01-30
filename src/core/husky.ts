import { writeInPkg, run } from '../utils/tool'
import fs from 'fs-extra'
import { getPackageJson } from '../utils/env'
import { getpath } from '../utils/path'
import { debugInfo, debugWarning } from '../utils/debug'
import { pathExists } from '../utils/check'
// 需要安装的依赖
const devDependencies = ['husky@^8.0.1', 'lint-staged@^12.4.1']

export const huskyInit = async () => {
  // 检查是否有git 如果没有 需要先初始化git
  if (!pathExists('.git', false)) {
    debugWarning(`请先初始化git`)
    debugInfo('参考命令 git init')
    process.exit()
  }
  // 安装依赖
  await writeInPkg(devDependencies)
  // 更改package
  let pkgJson = await getPackageJson()
  pkgJson.scripts['prepare'] = 'husky install'
  pkgJson.scripts['pre-commit'] = 'lint-staged'
  pkgJson.scripts['postinstallmac'] = 'git config core.hooksPath .husky && chmod 700 .husky/*'
  pkgJson.scripts['prettierwrite'] = 'prettier --write src/**/*.{vue,ts,js,tsx,jsx}'
  pkgJson.scripts['prettiercheck'] = 'prettier --check src/**/*.{vue,ts,js,tsx,jsx}'
  pkgJson.scripts['eslint'] = 'eslint --cache --max-warnings 0  "{src,mock}/**/*.{vue,ts,js,tsx}" --fix'
  pkgJson['lint-staged'] = {
    '*.{js,ts,vue,jsx,tsx}': ['npm run eslint'],
    '*.{js,jsx,ts,tsx,md,html,css,lees,scss,sass}': 'prettier --write'
  }
  fs.writeJsonSync(getpath('package.json'), pkgJson, { spaces: 2 })

  await run('npm run prepare')
  await run('npx husky add .husky/pre-commit "npm-run-pre-commit"')
}
