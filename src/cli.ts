// 解析命令行参数以及获取脚本运行的路径
import cac from 'cac';
import { start } from './start';
const cli = cac('web-norm');
import { setEnv } from './utils/env';
const cliInit = () => {
  
  cli
    .command('[root]')
    .alias('alias')
    .option('-n, --en', 'lang')
    .option('-s,--simple','simple')
    .option('-n,--noEmoji','noEmoji')
    .action(async (_root, options) => {
      let base: string = options.base;
      const {en,simple,noEmoji} = options;
      en && setEnv('isZh',true)
      simple && setEnv('simple',true)
      noEmoji && setEnv('noEmoji',true)
      if (!base) {
        // 项目的最终路径
        base = process.cwd();
      }
      setEnv('base', base);    
      await start(base);
    });

  cli.help();
  cli.version('1.0.0');
  cli.parse();
};

export default cliInit;
