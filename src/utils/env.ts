import path from 'path'
import fs from 'fs-extra'
import { checkVueVersion } from './check'
export const env = {
  base: '',
  isVue: false,
  isVue3: false,
  isReact: false,
  isVue2: false,
  isVueCli: false,
  isWebpack: true,
  isEslint: false,
  especial: false,
  merge: false, // 是否覆盖原有eslint 默认覆盖
  isZh: true, // 中英文
  simple: false, // 是否是简单模式 默认是否
  noEmoji: false // 是否不要表情 默认是要
}

type envKeys = keyof typeof env

/**
 * @name 设置变量
 */
export const setEnv = (key: envKeys, val: any) => {
  env[key] = val as never
}
/**
 * @name 获取变量
 */
export const getEnv = (key: envKeys) => {
  return env[key]
}

/**
 * @name 检测是否包含指定文件
 *
 */

export const existsSync = (fileName: string, base: string = getEnv('base') as string) => {
  const file = path.resolve(base, fileName)
  return fs.existsSync(file)
}

/**
 * @name 获取指定文件，并转化为json
 *
 */

export const getFiletoJson = async (fileName: string, base: string = getEnv('base') as string) => {
  const file = path.resolve(base, fileName)
  const res = fs.existsSync(file)
  if (!res) return false
  const json = fs.readJSON(file)
  return json
}
/**
 * @name 把package.json转化为json
 */
export const getPackageJson = async (base: string = getEnv('base') as string) => {
  return getFiletoJson('package.json', base)
}

/**
 * @name 获取eslintrc
 */
export const getEslintrc = async (base: string = getEnv('base') as string) => {
  const file = path.resolve(base, '.eslintrc.js')
  const res = fs.existsSync(file)
  if (!res) return false
  const eslintStr = await fs.readFile(file, 'utf8')
  return eval(eslintStr)
}

export const initProjectInfo = async (pckJson: any) => {
  const deps = { ...pckJson.devDependencies, ...pckJson.dependencies }
  if (deps['vue']) {
    setEnv('isVue', true)
    if (checkVueVersion(deps['vue']) === 2) {
      setEnv('isVue2', true)
    }
    if (checkVueVersion(deps['vue']) === 3) {
      setEnv('isVue3', true)
    }
  }

  if (deps['react']) {
    setEnv('isReact', true)
  }

  if (deps['eslint']) {
    setEnv('isEslint', true)
  }
  return true
}
