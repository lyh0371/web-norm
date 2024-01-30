import chalk from 'chalk'
const log = console.log
let debugSwitch = true

/**
 * debug开关，默认开启
 * @param debug boolean
 */
const switchDebug = (debug: boolean) => {
  debugSwitch = debug
}

/**
 * debug 错误信息
 * @param type 类型
 * @param msg 信息
 */
const debugError = (msg: string) => {
  debugSwitch && log(chalk.hex('#646cff')(`[web-norm]:`) + chalk.red(msg))
  // 如果出错就退出
  process.exit(0)
}

/**
 * debug 信息
 * @param type 类型
 * @param msg 信息
 */
const debugInfo = (msg: string) => {
  debugSwitch && log(chalk.hex('#646cff')(`[web-norm]:`) + chalk.green(msg))
}

/**
 * debug 强调
 * @param type 类型
 * @param msg 信息
 */

const debugprocess = (msg: string) => {
  debugSwitch && log(chalk.hex('#646cff')(`[web-norm]:`) + chalk.yellow(msg))
}
/**
 * debug warning信息
 * @param type 类型
 * @param msg 信息
 */
const debugWarning = (msg: string) => {
  log(chalk.hex('#646cff')(`[web-norm]:`) + chalk.yellow(msg))
}

const debugTxt = (msg: string) => {
  log(chalk.hex('#646cff')(`[web-norm]:`) + chalk.hex('#5c6d82')(msg))
}

export { switchDebug, debugInfo, debugError, debugWarning, debugprocess, debugTxt }
