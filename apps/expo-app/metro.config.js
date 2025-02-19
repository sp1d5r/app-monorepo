const { getDefaultConfig } = require('@expo/metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const moduleCache = new Map();
const resolutionCache = new Map();

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

// Add this helper function
function getReactNativePath() {
  const rnPath = path.resolve(workspaceRoot, 'node_modules/react-native');
  if (!fs.existsSync(rnPath)) {
    throw new Error(`React Native not found at ${rnPath}`);
  }
  console.log('🔍 Found React Native at:', rnPath);
  return rnPath;
}

const reactNativePath = getReactNativePath();

config.resolver = {
  ...config.resolver,
  enableSymlinks: true,
  blockList: exclusionList([
    /.*\.web\.jsx?$/,
    /^(?!.*node_modules).*\/dist\/.*/,
    /.*\/react-native\/Libraries\/vendor\/emitter\/EventEmitter\.js$/,
  ]),
  resolverMainFields: ['browser', 'main', 'module', isWeb ? 'web' : null].filter(Boolean),
  platforms: ['web', 'ios', 'android'],
  disableHierarchicalLookup: false,
  
  extraNodeModules: new Proxy(
    {
      // Explicitly add react-native
      'react-native': reactNativePath,
      '@expo/metro-runtime': findModulePath('@expo/metro-runtime'),
      'expo': findModulePath('expo'),
      'expo-router': findModulePath('expo-router'),
      '@babel/runtime': findModulePath('@babel/runtime'),
      '@babel/runtime-corejs3': findModulePath('@babel/runtime-corejs3'),
      '@react-native/babel-preset': findModulePath('@react-native/babel-preset'),
      '@babel/plugin-transform-flow-strip-types': findModulePath('@babel/plugin-transform-flow-strip-types'),
      '@babel/preset-flow': findModulePath('@babel/preset-flow'),
      'react': findModulePath('react'),
      'react-dom': findModulePath('react-dom'),
      '@app-monorepo/ui': path.resolve(workspaceRoot, 'packages/ui'),
    },
    {
      get: (target, name) => {
        if (name in target) {
          return target[name];
        }
        
        // Check resolution cache first
        if (resolutionCache.has(name)) {
          return resolutionCache.get(name);
        }

        // Log module resolution attempts only once
        console.log(`🔍 Resolving module: ${name}`);
        try {
          const resolvedPath = findModulePath(String(name));
          console.log(`✅ Resolved ${name} to: ${resolvedPath}`);
          resolutionCache.set(name, resolvedPath);
          return resolvedPath;
        } catch (e) {
          console.warn(`⚠️ Failed to resolve ${name}, falling back to default resolution`);
          const fallbackPath = path.join(process.cwd(), `node_modules/${name}`);
          resolutionCache.set(name, fallbackPath);
          return fallbackPath;
        }
      },
    }
  ),

  // Add this to ensure React Native modules are properly resolved
  nodeModulesPaths: [
    path.resolve(workspaceRoot, 'node_modules'),
    path.resolve(projectRoot, 'node_modules'),
  ],

  sourceExts: isWeb 
    ? ['web.tsx', 'web.ts', 'web.jsx', 'web.js', 'tsx', 'ts', 'jsx', 'js', 'json', 'd.ts', 'cjs', 'mjs']
    : [
        'ios.tsx', 'android.tsx',
        'ios.ts', 'android.ts',
        'ios.jsx', 'android.jsx',
        'ios.js', 'android.js',
        'tsx', 'ts', 'jsx', 'js', 'json', 'd.ts',
        'cjs', 'mjs'
      ],

  assetExts: [
    ...config.resolver.assetExts,
    'db', 'sqlite', 'png', 'jpg', 'gif', 'ttf', 'otf', 'svg',
  ],

  resolveRequest: (context, moduleName, platform) => {
    // Handle babel runtime helpers specifically
    if (moduleName.includes('@babel/runtime/helpers/')) {
      const helperPath = path.resolve(workspaceRoot, 'node_modules/@babel/runtime/helpers', 
        moduleName.replace('@babel/runtime/helpers/', '') + '.js');
      
      if (fs.existsSync(helperPath)) {
        return {
          filePath: helperPath,
          type: 'sourceFile',
        };
      }
    }

    // Handle SSR environment
    if (platform === 'web' && process.env.BABEL_ENV === 'node') {
      // Provide browser globals for SSR
      if (moduleName === 'react-dom' || moduleName.includes('react-dom/')) {
        console.log('🌐 Providing SSR environment for:', moduleName);
        return {
          type: 'sourceFile',
          filePath: path.resolve(workspaceRoot, 'node_modules/react-dom/cjs/react-dom.development.js'),
          // Inject our window mock before any code runs
          content: `
            // Mock the DOM environment check
            var canUseDOM = true;
            var window = {
              document: {
                createElement: () => ({}),
                createTextNode: () => ({}),
                querySelector: () => null,
                querySelectorAll: () => [],
              },
              addEventListener: () => {},
              removeEventListener: () => {},
              getComputedStyle: () => ({}),
              setTimeout: setTimeout,
              clearTimeout: clearTimeout,
              navigator: { userAgent: 'node' },
            };
            var document = window.document;
            globalThis.window = window;
            globalThis.document = document;

            // Now load the actual module
            ${fs.readFileSync(path.resolve(workspaceRoot, 'node_modules/react-dom/cjs/react-dom.development.js'), 'utf8')}
          `
        };
      }

      // Also handle react-dom/client specifically
      if (moduleName.includes('react-dom/client')) {
        return {
          type: 'sourceFile',
          content: `
            // Provide a minimal client implementation
            exports.createRoot = () => ({
              render: () => {},
              unmount: () => {},
            });
            exports.hydrateRoot = () => ({
              render: () => {},
              unmount: () => {},
            });
          `
        };
      }
    }

    // Handle web platform cases
    if (platform === 'web') {
      // Handle native-only modules
      if (
        moduleName.includes('codegenNativeCommands') ||
        moduleName.includes('/fabric/') ||
        moduleName.includes('native-only') ||
        moduleName.includes('/specs/Native') ||
        moduleName.includes('setUpDOM') ||
        moduleName.includes('InitializeCore') ||
        // Add react-native-screens specific modules
        moduleName.includes('react-native-screens/lib/commonjs/fabric') ||
        moduleName.includes('react-native/Libraries/Utilities/codegenNativeCommands') ||
        moduleName.includes('@expo/metro-runtime/src/setupHMR') ||
        moduleName.includes('@expo/metro-runtime/src/effects')
      ) {
        console.log('📱 Providing empty module for native-only import:', moduleName);
        return {
          type: 'empty',
        };
      }
    }

    if (moduleName.includes('createAnimatedComponent')) {
      // Try to find the compiled version first
      const compiledPath = path.resolve(workspaceRoot, 'node_modules/react-native/Libraries/Animated/createAnimatedComponent.js.flow');
      if (fs.existsSync(compiledPath)) {
        return {
          filePath: compiledPath,
          type: 'sourceFile',
        };
      }
    }

    if (moduleName.includes('EventEmitter')) {
      const customPath = path.resolve(projectRoot, 'src/utils/EventEmitter.js');
      if (fs.existsSync(customPath)) {
        return {
          filePath: customPath,
          type: 'sourceFile',
        };
      }
    }
    
    return context.resolveRequest(context, moduleName, platform);
  },
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
      throwIfNamespace: false,
      enableBabelRuntime: true,
      enableBabelRCLookup: true,
      // Add this to handle node environment properly
      unstable_disableES6Transforms: process.env.BABEL_ENV === 'node',
    },
    resolver: {
      sourceExts: ['js', 'jsx', 'ts', 'tsx', 'json', 'cjs', 'mjs'],
      assetExts: ['png', 'jpg', 'jpeg', 'gif', 'webp'],
      platforms: ['ios', 'android', 'web'],
      providesModuleNodeModules: ['react-native'],
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