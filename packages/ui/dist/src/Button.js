var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx } from "react/jsx-runtime";
import { styled, Button as TamaguiButton } from 'tamagui';
// Customize TamaguiButton
var CustomButton = styled(TamaguiButton, {
    name: 'Button',
    variants: {
        variant: {
            primary: {
                backgroundColor: '$primary',
                color: '$white',
            },
            secondary: {
                backgroundColor: '$secondary',
                color: '$black',
            },
        },
    },
});
export function Button(_a) {
    var _b = _a.variant, variant = _b === void 0 ? 'primary' : _b, children = _a.children;
    return _jsx(CustomButton, __assign({ variant: variant }, { children: children }));
}
