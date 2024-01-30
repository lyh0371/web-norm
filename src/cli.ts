// 解析命令行参数以及获取脚本运行的路径
import cac from 'cac'
import { start } from './start'
import { prompt } from 'enquirer'

const cli = cac('web-norm')
import { existsSync, setEnv } from './utils/env'
const cliInit = () => {
  cli
    .command('[root]')
    .alias('alias')
    .option('-n, --en', 'lang')
    .option('-s,--simple', 'simple')
    .option('-n,--noEmoji', 'noEmoji')
    .option('-n,--especial', 'especial')
    .action(async (_root, options) => {
      let base: string = options.base
      const { en, simple, noEmoji, especial } = options

      en && setEnv('isZh', true)
      simple && setEnv('simple', true)
      noEmoji && setEnv('noEmoji', true)
      setEnv('especial', especial)
      if (existsSync('.eslintrc.js')) {
        const response: any = await prompt([
          {
            type: 'select', // 交互类型 -- 单选（无序）
            message: '是否覆盖已有eslint配置', // 引导词
            name: 'especial', // 自定义的字段名
            choices: ['是', '否（合并配置）'] // 选项列表
          }
        ])
        setEnv('merge', response.especial != '是')
      }
      if (!base) {
        // 项目的最终路径
        base = process.cwd()
      }
      setEnv('base', base)

      await start(base)
    })

  cli.help()
  cli.version('1.0.0')
  cli.parse()
}

export default cliInit
