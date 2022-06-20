import { getPackageJson } from '../src/utils/env';
import spawn from 'cross-spawn';
const tagInit = async () => {
  const { version } = await getPackageJson();
  // 打tag
  spawn.sync('git', ['tag', `v${version}`], {
    stdio: 'inherit',
    cwd: './',
  });
  spawn.sync('git', ['push'], {
    stdio: 'inherit',
    cwd: './',
  });
};

tagInit();
