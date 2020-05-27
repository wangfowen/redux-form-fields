import autoprefixer from 'autoprefixer';
import fs from 'fs';
import glob from 'glob';
import pkg from './package.json';
import postcss from 'rollup-plugin-postcss-modules';
import typescript from 'rollup-plugin-typescript2';

/* initialize CSS files because of a catch-22 situation:
   https://github.com/rollup/rollup/issues/1404 */
glob.sync('src/**/*.css').forEach(css => {
  // Use forEach because https://github.com/rollup/rollup/issues/1873
  const definition = `${css}.d.ts`;
  if (!fs.existsSync(definition))
    fs.writeFileSync(definition, 'const mod: { [cls: string]: string }\nexport default mod\n');
});

export default [
  {
    input: 'src/index.ts',
    external: Object.keys(pkg.peerDependencies || {}),
    plugins: [
      postcss({
        plugins: [autoprefixer()],
        writeDefinitions: true,
      }),
      typescript({
        typescript: require('typescript'),
      }),
    ],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'esm' },
      {
        file: 'example/src/reactComponentLib/index.js',
        format: 'es',
        banner: '/* eslint-disable */',
      },
    ],
  },
];
