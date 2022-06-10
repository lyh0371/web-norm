import path from 'path';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: path.resolve(__dirname, './index.ts'),
  output: {
    dir: path.resolve(__dirname, 'dist/'),
    format: 'cjs',
  },
};
