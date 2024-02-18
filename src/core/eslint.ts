import fs from 'fs-extra'
import { writeInPkg } from '../utils/tool'
import { getPackageJson, getEnv, getEslintrc } from '../utils/env'
import { prettierrcInit } from '../templet/prettierrc'
import { eslintrcFn } from '../templet/eslintrc'
import { getpath } from '../utils/path'
import { teepEslintConfig } from '../especial'
import { debugError } from '../utils/debug'
const baseDep = [
  'eslint@^7.25.0',
  'prettier@^2.7.1',
  'eslint-friendly-formatter@^4.0.1',
  'eslint-plugin-prettier@^4.0.0',
  'eslint-plugin-html@^6.2.0',
  'eslint-config-prettier@^8.5.0'
]

interface Obj {
  [key: string]: any
}

export const eslintInit = async () => {
  let devDependencies: string[] = baseDep
  if (getEnv('isVue2')) {
    devDependencies = [...baseDep, 'eslint-plugin-vue@^9.21.1']
  }
  if (getEnv('isVue3')) {
    devDependencies = [...baseDep, 'eslint-plugin-vue@^9.21.1', '@typescript-eslint/parser@^5.30.7']
  }
  if (getEnv('isReact')) {
    devDependencies = [...baseDep, 'eslint-plugin-react@^7.30.1', 'eslint-plugin-jsx-a11y@^6.6.1', '@typescript-eslint/parser@^5.30.7', '@typescript-eslint/eslint-plugin@5.30.7']
  }

  if (getEnv('merge')) {
    // 合并操作
    const oldEslintConfig = await getEslintrc()
    if (oldEslintConfig) {
      // 存在旧版本eslint
      const nEslint = getEnv('especial') ? teepEslintConfig.rules : {}
      const mEslint = meageEslint(oldEslintConfig, nEslint)
      const eslintToString = JSON.stringify(mEslint, null, 2)
      writeEslintConfig(`module.exports = ${eslintToString}`)
    }
    return false
  }

  // 调用down直接可以把依赖安装好
  // await down(devDependencies, '-D');
  // writeInPkg 只是把依赖写入到package中
  await writeInPkg(devDependencies, 'devDependencies')

  writeEslintConfig(eslintrcFn(getEnv('especial') as boolean))
  // 合并 执行一次 eslint 把重复的对象合并
  const eslint2 = await getEslintrc()
  writeEslintConfig(`module.exports = ${JSON.stringify(eslint2, null, 2)}`)
  async function writeEslintConfig(eslintConfig: string) {
    fs.outputFileSync(getpath('./.eslintrc.js'), eslintConfig)
    fs.outputFileSync(getpath('./.prettierrc'), prettierrcInit)
    let pkgJson = await getPackageJson()
    if (pkgJson['eslintConfig']) {
      delete pkgJson.eslintConfig
    }
    fs.writeJsonSync(getpath('package.json'), pkgJson, { spaces: 2 })
  }
}

function meageEslint(oldEslintConfig: Obj, newEslintRules: Obj): Obj {
  const { rules } = oldEslintConfig
  if (oldEslintConfig && rules) {
    oldEslintConfig.rules = {
      ...oldEslintConfig.rules,
      ...newEslintRules
    }
    return oldEslintConfig
  } else {
    debugError('.eslintrc格式有误，请删除后再运行命令')
    return {}
  }
}
