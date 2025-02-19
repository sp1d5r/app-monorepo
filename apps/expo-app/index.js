// First, set up the web environment
if (typeof window === 'undefined') {
    global.window = {
        document: {
            createElement: () => ({}),
            createTextNode: () => ({}),
            querySelector: () => null,
            querySelectorAll: () => [],
        },
        addEventListener: () => {},
        removeEventListener: () => {},
        getComputedStyle: () => ({}),
        setTimeout,
        clearTimeout,
        navigator: { userAgent: 'node' },
    };
    global.document = global.window.document;
}

// Mock native modules for web
if (process.env.TAMAGUI_TARGET === 'web') {
    global.__fbBatchedBridgeConfig = {
        remoteModuleConfig: {},
        moduleNames: [],
    };
    
    global.nativeModuleProxy = {
        startObserving: () => {},
        stopObserving: () => {},
        addListener: () => {},
        removeListeners: () => {},
    };
}

// Just import expo-router/entry - it handles everything else
import 'expo-router/entry';

// Optional: Add error boundary for development
if (process.env.NODE_ENV === 'development') {
    const originalConsoleError = console.error;
    console.error = (...args) => {
        if (args[0]?.includes?.('__fbBatchedBridgeConfig')) {
            return; // Suppress this specific error in development
        }
        originalConsoleError.apply(console, args);
    };
} 