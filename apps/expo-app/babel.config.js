module.exports = function (api) {
  api.cache(true);
  
  console.log('Babel environment:', process.env.BABEL_ENV);
  console.log('Node environment:', process.env.NODE_ENV);
  console.log('Platform:', process.env.TAMAGUI_TARGET);

  return {
    presets: ['babel-preset-expo'],
    assumptions: {
      'enumerableModuleMeta': true
    },
    plugins: [
      ['@babel/plugin-transform-runtime', {
        corejs: 3,
        helpers: true,
        regenerator: true,
        version: '^7.26.9',
        absoluteRuntime: false
      }],
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@app-monorepo/ui': '../../packages/ui/src',
            'react': '../../node_modules/react',
            'react-dom': '../../node_modules/react-dom',
            'react/jsx-runtime': '../../node_modules/react/jsx-runtime',
            'react/jsx-dev-runtime': '../../node_modules/react/jsx-dev-runtime',
          },
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        },
      ],
      // [
      //   '@tamagui/babel-plugin',
      //   {
      //     components: ['tamagui', '@app-monorepo/ui'],
      //     config: './tamagui.config.ts',
      //     importsWhitelist: ['constants.js', 'colors.js'],
      //     logTimings: true,
      //     disableExtraction: process.env.NODE_ENV === 'development',
      //   },
      // ],
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