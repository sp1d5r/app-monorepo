import { createTamagui, createTokens } from '@tamagui/core';
import { shorthands } from '@tamagui/shorthands';
var tokens = createTokens({
    color: {
        white: '#FFFFFF',
        black: '#000000',
        primary: '#5C7AEA',
        secondary: '#EBB434',
    },
    space: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
    },
    size: {
        sm: 32,
        md: 48,
        lg: 64,
    },
    radius: {
        sm: 4,
        md: 8,
        lg: 16,
    },
});
var config = createTamagui({
    defaultTheme: 'light',
    shouldAddPrefersColorThemes: true,
    themeClassNameOnRoot: true,
    shorthands: shorthands,
    tokens: tokens,
    themes: {
        light: {
            background: tokens.color.white,
            color: tokens.color.black,
        },
        dark: {
            background: tokens.color.black,
            color: tokens.color.white,
        },
    },
    fonts: {
        body: {
            family: 'System',
            size: {
                1: 14,
                2: 16,
                3: 18,
            },
            lineHeight: {
                1: 20,
            }
        }
    }
});
export default config;
