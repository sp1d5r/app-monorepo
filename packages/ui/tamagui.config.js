"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const font_inter_1 = require("@tamagui/font-inter");
const shorthands_1 = require("@tamagui/shorthands");
const animations_moti_1 = require("@tamagui/animations-moti");
const themes_1 = require("@tamagui/themes");
const tamagui_1 = require("tamagui");
const v4_1 = require("@tamagui/config/v4");
const tokens = (0, tamagui_1.createTokens)({
    size: themes_1.size,
    space: themes_1.space,
    zIndex: themes_1.zIndex,
    color: themes_1.color,
    radius: themes_1.radius,
});
const animations = (0, animations_moti_1.createAnimations)({
    fast: {
        type: 'spring',
        damping: 20,
        mass: 1.2,
        stiffness: 250,
    },
    medium: {
        type: 'spring',
        damping: 10,
        mass: 0.9,
        stiffness: 100,
    },
    slow: {
        type: 'spring',
        damping: 20,
        stiffness: 60,
    },
});
exports.default = (0, tamagui_1.createTamagui)(Object.assign(Object.assign({}, v4_1.defaultConfig), { animations,
    tokens,
    themes: themes_1.themes, defaultTheme: 'light', shouldAddPrefersColorThemes: true, themeClassNameOnRoot: true, shorthands: shorthands_1.shorthands, fonts: {
        heading: (0, font_inter_1.createInterFont)(),
        body: (0, font_inter_1.createInterFont)(),
    } }));
