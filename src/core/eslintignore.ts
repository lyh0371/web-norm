/**
 * husk 结合 commitlint 提交信息校验
 */
import fs from 'fs-extra';
import { getpath } from '../utils/path';

const eslintignore = `
.prettierrc
!commitlint.config.js
.babel.config.js
!.umirc.ts
 `;
export const eslintignoreInit = async () => {
  fs.outputFileSync(getpath('.eslintignore'), eslintignore);
};
