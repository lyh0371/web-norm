// 一些特殊的处理
import fs from 'fs-extra';
import { env, getPackageJson } from '../utils/env';
import { getpath } from '../utils/path';
export const specialFn = async () => {
  const { isVue3 } = env;
  if (!isVue3) return;
  let pkgJson = await getPackageJson();
  if (pkgJson.type) {
    delete pkgJson.type;
  }
  fs.writeJsonSync(getpath('package.json'), pkgJson, { spaces: 2 });
  // 如果是vue3 的话 需要把package中的 type="module"去掉
};
