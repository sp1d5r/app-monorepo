const path = require('path');

module.exports = ({ config }) => {
  // Handle workspace packages
  config.resolve.alias = {
    ...config.resolve.alias,
    '@app-monorepo/ui': path.resolve(__dirname, '../../ui/dist'),
    '@app-monorepo/ui/tamagui.config': path.resolve(__dirname, '../../ui/dist/tamagui.config.js'),
    'react-native$': 'react-native-web',
    'react-native-svg': 'react-native-svg-web',
  };

  // Handle React Native Web
  config.resolve.extensions = [
    '.web.js',
    '.web.jsx',
    '.web.ts',
    '.web.tsx',
    '.ts',
    '.tsx',
    '.js',
    '.jsx',
    ...config.resolve.extensions,
  ];

  // Add transpilation rules
  config.module.rules.push({
    test: /\.(js|jsx|ts|tsx)$/,
    exclude: /node_modules\/(?!(react-native-|@react-native|@tamagui|react-native-svg)).*/,
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: {
          presets: [
            ['@babel/preset-env', { targets: "defaults" }],
            '@babel/preset-react',
            '@babel/preset-typescript',
            'module:metro-react-native-babel-preset'
          ],
          plugins: ['react-native-web'],
        },
      },
    ],
  });

  return config;
}; 