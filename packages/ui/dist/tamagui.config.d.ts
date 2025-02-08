declare const config: import("@tamagui/core").TamaguiInternalConfig<{
    color: {
        white: import("@tamagui/core").Variable<string>;
        black: import("@tamagui/core").Variable<string>;
        primary: import("@tamagui/core").Variable<string>;
        secondary: import("@tamagui/core").Variable<string>;
    };
    space: {
        xs: import("@tamagui/core").Variable<number>;
        sm: import("@tamagui/core").Variable<number>;
        md: import("@tamagui/core").Variable<number>;
        lg: import("@tamagui/core").Variable<number>;
    };
    size: {
        sm: import("@tamagui/core").Variable<number>;
        md: import("@tamagui/core").Variable<number>;
        lg: import("@tamagui/core").Variable<number>;
    };
    radius: {
        sm: import("@tamagui/core").Variable<number>;
        md: import("@tamagui/core").Variable<number>;
        lg: import("@tamagui/core").Variable<number>;
    };
    zIndex: {};
} & Omit<{
    color: {
        white: import("@tamagui/core").Variable<string>;
        black: import("@tamagui/core").Variable<string>;
        primary: import("@tamagui/core").Variable<string>;
        secondary: import("@tamagui/core").Variable<string>;
    };
    space: {
        xs: import("@tamagui/core").Variable<number>;
        sm: import("@tamagui/core").Variable<number>;
        md: import("@tamagui/core").Variable<number>;
        lg: import("@tamagui/core").Variable<number>;
    };
    size: {
        sm: import("@tamagui/core").Variable<number>;
        md: import("@tamagui/core").Variable<number>;
        lg: import("@tamagui/core").Variable<number>;
    };
    radius: {
        sm: import("@tamagui/core").Variable<number>;
        md: import("@tamagui/core").Variable<number>;
        lg: import("@tamagui/core").Variable<number>;
    };
}, "space" | "zIndex" | "size" | "color" | "radius">, {
    light: {
        background: import("@tamagui/core").Variable<string>;
        color: import("@tamagui/core").Variable<string>;
    };
    dark: {
        background: import("@tamagui/core").Variable<string>;
        color: import("@tamagui/core").Variable<string>;
    };
}, {
    readonly ussel: "userSelect";
    readonly cur: "cursor";
    readonly pe: "pointerEvents";
    readonly col: "color";
    readonly ff: "fontFamily";
    readonly fos: "fontSize";
    readonly fost: "fontStyle";
    readonly fow: "fontWeight";
    readonly ls: "letterSpacing";
    readonly lh: "lineHeight";
    readonly ta: "textAlign";
    readonly tt: "textTransform";
    readonly ww: "wordWrap";
    readonly ac: "alignContent";
    readonly ai: "alignItems";
    readonly als: "alignSelf";
    readonly b: "bottom";
    readonly bc: "backgroundColor";
    readonly bg: "backgroundColor";
    readonly bbc: "borderBottomColor";
    readonly bblr: "borderBottomLeftRadius";
    readonly bbrr: "borderBottomRightRadius";
    readonly bbw: "borderBottomWidth";
    readonly blc: "borderLeftColor";
    readonly blw: "borderLeftWidth";
    readonly boc: "borderColor";
    readonly br: "borderRadius";
    readonly bs: "borderStyle";
    readonly brw: "borderRightWidth";
    readonly brc: "borderRightColor";
    readonly btc: "borderTopColor";
    readonly btlr: "borderTopLeftRadius";
    readonly btrr: "borderTopRightRadius";
    readonly btw: "borderTopWidth";
    readonly bw: "borderWidth";
    readonly dsp: "display";
    readonly f: "flex";
    readonly fb: "flexBasis";
    readonly fd: "flexDirection";
    readonly fg: "flexGrow";
    readonly fs: "flexShrink";
    readonly fw: "flexWrap";
    readonly h: "height";
    readonly jc: "justifyContent";
    readonly l: "left";
    readonly m: "margin";
    readonly mah: "maxHeight";
    readonly maw: "maxWidth";
    readonly mb: "marginBottom";
    readonly mih: "minHeight";
    readonly miw: "minWidth";
    readonly ml: "marginLeft";
    readonly mr: "marginRight";
    readonly mt: "marginTop";
    readonly mx: "marginHorizontal";
    readonly my: "marginVertical";
    readonly o: "opacity";
    readonly ov: "overflow";
    readonly p: "padding";
    readonly pb: "paddingBottom";
    readonly pl: "paddingLeft";
    readonly pos: "position";
    readonly pr: "paddingRight";
    readonly pt: "paddingTop";
    readonly px: "paddingHorizontal";
    readonly py: "paddingVertical";
    readonly r: "right";
    readonly shac: "shadowColor";
    readonly shar: "shadowRadius";
    readonly shof: "shadowOffset";
    readonly shop: "shadowOpacity";
    readonly t: "top";
    readonly w: "width";
    readonly zi: "zIndex";
}, {}, {}, {
    body: {
        family: string;
        size: {
            1: number;
            2: number;
            3: number;
        };
        lineHeight: {
            1: number;
        };
    };
}, {
    allowedStyleValues: false;
    autocompleteSpecificTokens: "except-special";
}>;
export type AppConfig = typeof config;
declare module '@tamagui/core' {
    interface TamaguiCustomConfig extends AppConfig {
    }
}
export default config;
