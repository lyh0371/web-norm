import fs from 'fs-extra';
import { getPackageJson } from '../src/utils/env';
import { getpath } from '../src/utils/path';
import { debugInfo } from '../src/utils/debug';
const buildInit = async () => {
  const pkgJson = await getPackageJson();
  let version = pkgJson.version.split('.');
  version[2] = Number(version[2]) + 1;
  pkgJson['version'] = version.join('.');
  fs.outputFileSync(
    getpath('./package.json'),
    JSON.stringify(pkgJson, null, 2)
  );
  pkgJson['bin'] = {
    'web-norm': 'index.js',
  };
  pkgJson['main'] = 'index.js';
  fs.outputFileSync(getpath('./dist/package.json'), JSON.stringify(pkgJson));
  debugInfo(`当前版本${pkgJson['version']}`);
};

buildInit();
