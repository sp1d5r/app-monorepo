require('dotenv').config(); // Load variables from .env

const fs = require('fs');
const path = require('path');

function getAssetPath(assetPath, fallback = './assets/images/default.png') {
  const fullPath = path.resolve(__dirname, assetPath);
  if (fs.existsSync(fullPath)) {
    return assetPath;
  }
  console.warn(`⚠️ Asset not found: ${assetPath}, using fallback`);
  return fallback;
}

export default {
  expo: {
    name: process.env.APP_NAME || 'expo-app',
    slug: process.env.APP_SLUG || 'expo-app',
    platforms: ['ios', 'android', 'web'],
    version: process.env.APP_VERSION || '1.0.0',
    orientation: 'portrait',
    icon: getAssetPath('./assets/images/icon.png'),
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: getAssetPath('./assets/images/adaptive-icon.png'),
        backgroundColor: '#ffffff',
      },
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: getAssetPath('./assets/images/favicon.png'),
    },
    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          image: getAssetPath('./assets/images/splash.png'),
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#ffffff',
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      API_URL: process.env.API_URL,
      // Add more variables as needed
    },
    entryPoint: "../../node_modules/expo-router/entry",
  },
};
