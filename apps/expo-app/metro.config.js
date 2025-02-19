const { getDefaultConfig } = require('@expo/metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const { isAssetFile } = require('metro-resolver/src/utils/isAssetFile');

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

// Add this debug helper at the top
function debugLog(message, ...args) {
  console.log(`🔍 [Metro Debug] ${message}`, ...args);
}

// Add this before config creation
function validateDependencies() {
  const criticalDeps = [
    '@expo/metro-runtime',
    'metro-runtime',
    'expo-router',
    'react-native',
    'react-dom'
  ];

  criticalDeps.forEach(dep => {
    try {
      require.resolve(dep);
      debugLog(`✅ Found ${dep}`);
    } catch (e) {
      console.error(`❌ Missing critical dependency: ${dep}`);
    }
  });
}

validateDependencies();

// Add this helper function
function safeIsAssetFile(filePath) {
  debugLog('Checking if asset file:', filePath);
  if (!filePath || typeof filePath !== 'string') {
    debugLog('Invalid file path received:', filePath);
    return false;
  }
  return isAssetFile(filePath);
}

// Add this helper function near the top with other helpers
function resolveAssetPath(modulePath) {
  debugLog('Resolving asset path:', modulePath);
  
  // Handle relative asset paths
  if (modulePath.includes('./assets/')) {
    const absolutePath = path.resolve(projectRoot, modulePath.replace('./', ''));
    debugLog('Resolved relative asset path to:', absolutePath);
    return absolutePath;
  }
  
  // Handle absolute asset paths
  if (modulePath.includes('/assets/')) {
    const absolutePath = path.resolve(projectRoot, 'assets', modulePath.split('/assets/')[1]);
    debugLog('Resolved absolute asset path to:', absolutePath);
    return absolutePath;
  }
  
  return modulePath;
}

// Add this helper function to handle Babel runtime paths
function resolveBabelRuntimePath(moduleName) {
  debugLog('Resolving Babel runtime path:', moduleName);
  
  // Handle deep Babel runtime paths
  if (moduleName.includes('@babel/runtime/helpers/')) {
    const helperName = moduleName.split('@babel/runtime/helpers/').pop();
    const possiblePaths = [
      path.resolve(workspaceRoot, 'node_modules/@babel/runtime/helpers', helperName),
      path.resolve(workspaceRoot, 'node_modules/@babel/runtime/helpers', `${helperName}.js`),
      path.resolve(projectRoot, 'node_modules/@babel/runtime/helpers', helperName),
      path.resolve(projectRoot, 'node_modules/@babel/runtime/helpers', `${helperName}.js`),
    ];

    for (const possiblePath of possiblePaths) {
      if (fs.existsSync(possiblePath)) {
        debugLog('✅ Found Babel helper at:', possiblePath);
        return {
          filePath: possiblePath,
          type: 'sourceFile'
        };
      }
    }
    debugLog('⚠️ Babel helper not found:', moduleName);
  }
  return null;
}

// Update the resolver configuration
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
      '@babel/runtime/helpers': path.resolve(workspaceRoot, 'node_modules/@babel/runtime/helpers'),
      'apps/expo-app': projectRoot,
      'expo-router': path.resolve(projectRoot, 'node_modules/expo-router'),
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

  // Add asset resolution handling
  resolveRequest: (context, moduleName, platform) => {
    debugLog(`🔍 Resolving request:`, { moduleName, platform });

    // Handle Expo entry point specifically for monorepo
    if (moduleName === '../../apps/expo-app/App' || moduleName.includes('expo/AppEntry')) {
      debugLog('📱 Resolving Expo entry point for monorepo');
      return {
        filePath: path.resolve(workspaceRoot, 'node_modules/expo-router/entry.js'),
        type: 'sourceFile'
      };
    }

    // Handle Babel runtime paths first
    if (moduleName.includes('@babel/runtime/')) {
      const resolved = resolveBabelRuntimePath(moduleName);
      if (resolved) return resolved;
    }

    // Handle relative Babel runtime paths
    if (moduleName.includes('../../') && moduleName.includes('/helpers/')) {
      const helperName = moduleName.split('/helpers/').pop();
      const resolved = resolveBabelRuntimePath(`@babel/runtime/helpers/${helperName}`);
      if (resolved) return resolved;
    }

    // Handle asset paths
    if (moduleName.includes('/assets/') || moduleName.includes('./assets/')) {
      const resolvedPath = resolveAssetPath(moduleName);
      if (fs.existsSync(resolvedPath)) {
        debugLog('✅ Found asset at:', resolvedPath);
        return {
          filePath: resolvedPath,
          type: safeIsAssetFile(resolvedPath) ? 'asset' : 'sourceFile'
        };
      }
      debugLog('⚠️ Asset not found at:', resolvedPath);
    }

    // Handle node: protocol modules
    if (moduleName.startsWith('node:')) {
      const bareModuleName = moduleName.replace('node:', '');
      console.log(`🔄 Redirecting node: module: ${moduleName} -> ${bareModuleName}`);
      
      // Try to resolve the module without the node: prefix
      try {
        const resolvedPath = findModulePath(bareModuleName);
        return {
          filePath: resolvedPath,
          type: 'sourceFile',
        };
      } catch {
        // If we can't find the module, return an empty module
        console.log(`⚠️ Providing empty module for ${moduleName}`);
        return {
          type: 'empty',
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

      // Handle native modules in web
      if (
        moduleName.includes('NativeModules') ||
        moduleName.includes('NativeEventEmitter') ||
        moduleName.includes('BatchedBridge') ||
        moduleName.includes('RCTEventEmitter') ||
        moduleName.includes('RCTDeviceEventEmitter')
      ) {
        return {
          type: 'sourceFile',
          content: `
            // Mock native modules for web
            module.exports = {
              default: {},
              NativeModules: {},
              BatchedBridge: {
                registerCallableModule: () => {},
                registerLazyCallableModule: () => {},
                getCallableModule: () => {},
              },
              NativeEventEmitter: class {},
              RCTEventEmitter: {},
              RCTDeviceEventEmitter: {
                addListener: () => ({ remove: () => {} }),
                emit: () => {},
                removeAllListeners: () => {},
                removeSubscription: () => {},
              },
            };
          `
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

  // Update asset resolution
  resolveAsset: (context, moduleName, platform) => {
    debugLog(`🎯 Asset Resolution Request:`, { moduleName, platform });
    
    if (!moduleName) {
      debugLog('❌ No module name provided');
      return null;
    }

    // Handle asset paths
    if (moduleName.includes('/assets/') || moduleName.includes('./assets/')) {
      const resolvedPath = resolveAssetPath(moduleName);
      if (fs.existsSync(resolvedPath)) {
        debugLog('✅ Found asset at:', resolvedPath);
        return resolvedPath;
      }
      debugLog('⚠️ Asset not found at:', resolvedPath);
    }

    try {
      const result = context.resolveAsset(context, moduleName, platform);
      debugLog('📦 Default resolver result:', result);
      return result;
    } catch (error) {
      debugLog('❌ Asset resolution failed:', error.message);
      return null;
    }
  },

  // Ensure assets directory is in watch folders
  watchFolders: [
    ...config.watchFolders,
    path.resolve(projectRoot, 'assets'),
  ].filter(Boolean),

  // Add asset extensions explicitly
  assetExts: [
    ...config.resolver.assetExts || [],
    'png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'ttf', 'otf'
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
      throwIfNamespace: false,
      // Add runtime helpers configuration
      runtime: {
        helpers: true,
        regenerator: true,
        absoluteRuntime: path.resolve(workspaceRoot, 'node_modules/@babel/runtime'),
      },
    },
    resolver: {
      assetExts: config.resolver.assetExts,
      platforms: ['ios', 'android', 'web', 'native'],
    },
  }),
  // Add these options
  assetRegistryPath: 'react-native/Libraries/Image/AssetRegistry',
  enableBabelRCLookup: true,
  enableBabelRuntime: true,
  // Add specific asset extensions
  assetExts: [
    ...config.transformer.assetExts || [],
    'png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'ttf', 'otf', 'woff', 'woff2'
  ],
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

// Add this helper function at the top of the file
function validateAssetPaths() {
  const requiredAssetPaths = [
    path.resolve(projectRoot, 'assets'),
    path.resolve(projectRoot, 'assets/images'),
  ];

  requiredAssetPaths.forEach(assetPath => {
    if (!fs.existsSync(assetPath)) {
      console.warn(`⚠️ Required asset directory missing: ${assetPath}`);
      // Create the directory
      fs.mkdirSync(assetPath, { recursive: true });
    }
  });
}

// Call it before creating the config
validateAssetPaths();

// Add this before exporting
debugLog('Metro configuration initialized');
debugLog('Project root:', projectRoot);
debugLog('Watch folders:', config.watchFolders);

// Add this before module.exports
debugLog('Final resolver configuration:', {
  assetExts: config.resolver.assetExts,
  platforms: config.resolver.platforms,
  watchFolders: config.watchFolders
});

// Add this before module.exports to verify asset paths
debugLog('Asset directories:', {
  assets: path.resolve(projectRoot, 'assets'),
  images: path.resolve(projectRoot, 'assets/images'),
  exists: {
    assets: fs.existsSync(path.resolve(projectRoot, 'assets')),
    images: fs.existsSync(path.resolve(projectRoot, 'assets/images'))
  }
});

module.exports = config;