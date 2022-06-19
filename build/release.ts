import { run } from '../src/utils/tool';
import { getPackageJson } from '../src/utils/env';
const tagInit = async () => {
  const { version } = await getPackageJson();
  // 打tag
  await run(`git tag v${version}`);

  // 提交代码
  await run('git push');
};

tagInit();
