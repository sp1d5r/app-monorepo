module.exports = function (api) {
  api.cache(true);
  
  console.log('Babel environment:', process.env.BABEL_ENV);
  console.log('Node environment:', process.env.NODE_ENV);
  console.log('Platform:', process.env.TAMAGUI_TARGET);

  return {
    presets: [
      '@babel/preset-flow',
      ['babel-preset-expo', {
        jsxRuntime: 'automatic',
      }],
      ['module:@react-native/babel-preset']
    ],
    plugins: [
      ['@babel/plugin-transform-flow-strip-types', { 
        all: true,
        requireDirective: false,
      }],
      ['@babel/plugin-transform-react-jsx', {
        flow: true,
      }],
      '@babel/plugin-proposal-export-namespace-from',
      ['@babel/plugin-transform-private-methods', { loose: true }],
      ['@babel/plugin-transform-class-properties', { loose: true }],
      ['@babel/plugin-transform-private-property-in-object', { loose: true }],
      ['@babel/plugin-transform-runtime', {
        corejs: false,
        helpers: true,
        regenerator: true,
        version: '^7.22.5',
      }],
      ['module-resolver', {
        root: ['./'],
        alias: {
          '@app-monorepo/ui': '../../packages/ui/src',
          'react': '../../node_modules/react',
          'react-dom': '../../node_modules/react-dom',
          'react/jsx-runtime': '../../node_modules/react/jsx-runtime',
          'react/jsx-dev-runtime': '../../node_modules/react/jsx-dev-runtime',
          'react-native': '../../node_modules/react-native',
          '@react-native/babel-preset': '../../node_modules/@react-native/babel-preset',
        },
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json', '.d.ts'],
      }],
      'transform-inline-environment-variables',
      'react-native-reanimated/plugin',
    ],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
  }
}