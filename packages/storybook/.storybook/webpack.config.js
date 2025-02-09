const path = require('path');

module.exports = ({ config }) => {
  // Handle workspace packages
  config.resolve.alias = {
    ...config.resolve.alias,
    '@app-monorepo/ui': path.resolve(__dirname, '../../ui/dist'),
    '@app-monorepo/ui/tamagui.config': path.resolve(__dirname, '../../ui/dist/tamagui.config.js'),
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

  // Add transpilation for the UI package
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    include: [
      path.resolve(__dirname, '../../ui/src'),
      path.resolve(__dirname, '../../ui/tamagui.config.ts'),
      path.resolve(__dirname, '../stories'),
    ],
    exclude: /node_modules/,
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: {
          presets: [
            ['@babel/preset-env', { targets: "defaults" }],
            '@babel/preset-react',
            '@babel/preset-typescript'
          ],
          plugins: ['react-native-web'],
        },
      },
    ],
  });

  // Add support for React Native
  config.resolve.alias = {
    ...config.resolve.alias,
    'react-native$': 'react-native-web',
  };

  // Handle React Native modules
  config.module.rules.push({
    test: /\.(js|jsx|ts|tsx)$/,
    exclude: /node_modules\/(?!(react-native-|@react-native|@tamagui|react-native-web|@expo|expo)).*/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-react',
          '@babel/preset-typescript',
          '@babel/preset-flow'
        ],
      },
    },
  });

  return config;
}; 