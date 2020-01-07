const path = require('path');
const {version} = require('./package');

module.exports = {
  propsParser: require('react-docgen-typescript').withCustomConfig(
    './tsconfig.json',
  ).parse,
  components: 'src/components/**/[A-Z]*.tsx',
  defaultExample: true,
  moduleAliases: {
    'rsg-example': path.resolve(__dirname, 'src'),
  },
  ribbon: {
    url: 'https://github.com/cstoltze/timer',
  },
  version,
};
