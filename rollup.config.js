import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import nodeResolve from 'rollup-plugin-node-resolve';
import { argv } from 'yargs';

const format = argv.format || argv.f || 'iife';
const compress = argv.uglify;

const babelOptions = {
  exclude: 'node_modules/**',
  presets: [['es2015', { modules: false }], 'stage-0'],
  babelrc: false
};

const dest = {
  amd: `dist/amd/vueI18nTranslationParser${compress ? '.min' : ''}.js`,
  umd: `dist/umd/vueI18nTranslationParser${compress ? '.min' : ''}.js`,
  iife: `dist/iife/vueI18nTranslationParser${compress ? '.min' : ''}.js`
}[format];

export default {
  entry: 'src/index.js',
  format,
  plugins: [
    babel(babelOptions),
    nodeResolve({ jsnext: true })
  ].concat(compress ? uglify() : []),
  moduleName: 'vueI18nTranslationParser',
  //moduleId: 'i18nextXHRBackend',
  dest
};
