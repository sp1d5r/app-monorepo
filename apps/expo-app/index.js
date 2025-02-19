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
import React from 'react';
import 'expo-router/entry'; 