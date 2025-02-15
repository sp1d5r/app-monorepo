const { getDefaultConfig } = require('@expo/metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const moduleCache = new Map();

function findModulePath(moduleName) {
  if (moduleCache.has(moduleName)) {
    return moduleCache.get(moduleName);
  }

  const possiblePaths = [
    path.resolve(workspaceRoot, 'node_modules', moduleName),
    path.resolve(projectRoot, 'node_modules', moduleName),
    path.resolve(workspaceRoot, '..', 'node_modules', moduleName),
  ];
  
  for (const possiblePath of possiblePaths) {
    if (fs.existsSync(possiblePath)) {
      if (!moduleCache.has(moduleName)) {
        console.log(`Found ${moduleName} at: ${possiblePath}`);
      }
      moduleCache.set(moduleName, possiblePath);
      return possiblePath;
    }
  }
  
  console.error(`❌ Module Resolution Failed - ${moduleName} not found in:`, possiblePaths);
  throw new Error(`Could not find ${moduleName}`);
}

function resetWatchman() {
  try {
    console.log('🧹 Cleaning Watchman state...');
    execSync('watchman watch-del-all');
    // Remove the shutdown-server command
    console.log('✅ Watchman state cleaned');
  } catch (error) {
    console.log('⚠️ Watchman cleanup failed:', error.message);
  }
}

resetWatchman();

const config = getDefaultConfig(projectRoot);
const isWeb = process.env.TAMAGUI_TARGET === 'web';

// Add all customizations directly to config
config.watchFolders = [
  workspaceRoot,
  path.resolve(workspaceRoot, 'node_modules'),
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'packages'),
].filter(folder => fs.existsSync(folder));

config.resolver = {
  ...config.resolver,
  enableSymlinks: true,
  blockList: exclusionList([
    /.*\.web\.jsx?$/,
    /^(?!.*node_modules).*\/dist\/.*/,
  ]),
  resolverMainFields: ['browser', 'main', 'module', isWeb ? 'web' : null].filter(Boolean),
  platforms: ['web', 'ios', 'android'],
  disableHierarchicalLookup: false,
  
  extraNodeModules: new Proxy(
    {
      '@expo/metro-runtime': findModulePath('@expo/metro-runtime'),
      'expo': findModulePath('expo'),
      'expo-router': findModulePath('expo-router'),
      '@babel/runtime': findModulePath('@babel/runtime'),
      'react': findModulePath('react'),
      'react-dom': findModulePath('react-dom'),
      '@app-monorepo/ui': path.resolve(workspaceRoot, 'packages/ui'),
    },
    {
      get: (target, name) => {
        if (name in target) {
          return target[name];
        }
        try {
          return findModulePath(String(name));
        } catch (e) {
          return path.join(process.cwd(), `node_modules/${name}`);
        }
      },
    }
  ),

  sourceExts: isWeb 
    ? ['web.tsx', 'web.ts', 'web.jsx', 'web.js', 'tsx', 'ts', 'jsx', 'js']
    : ['tsx', 'ts', 'jsx', 'js', 'json'],

  assetExts: [
    ...config.resolver.assetExts,
    'db', 'sqlite', 'png', 'jpg', 'gif', 'ttf', 'otf', 'svg',
  ],
};

config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve('metro-react-native-babel-transformer'),
  assetPlugins: ['expo-asset/tools/hashAssetFiles'],
  unstable_allowRequireContext: true,
  minifierPath: isWeb ? undefined : config.transformer.minifierPath,
  getTransformOptions: async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: true,
    },
  }),
};

config.server = {
  ...config.server,
  useWatchman: true,
  enhanceMiddleware: (middleware) => {
    return (req, res, next) => {
      if (isWeb) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
      }
      return middleware(req, res, next);
    };
  },
};

module.exports = config;