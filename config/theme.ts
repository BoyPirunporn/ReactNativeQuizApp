import { DefaultTheme } from "react-native-paper";

let colors = {
    "colors": {
        "primary": "rgb(0, 109, 49)",
        "onPrimary": "rgb(255, 255, 255)",
        "primaryContainer": "rgb(118, 253, 152)",
        "onPrimaryContainer": "rgb(0, 33, 10)",
        "secondary": "rgb(0, 91, 192)",
        "onSecondary": "rgb(255, 255, 255)",
        "secondaryContainer": "rgb(216, 226, 255)",
        "onSecondaryContainer": "rgb(0, 26, 65)",
        "tertiary": "rgb(0, 109, 65)",
        "onTertiary": "rgb(255, 255, 255)",
        "tertiaryContainer": "rgb(96, 254, 172)",
        "onTertiaryContainer": "rgb(0, 33, 16)",
        "error": "rgb(186, 26, 26)",
        "onError": "rgb(255, 255, 255)",
        "errorContainer": "rgb(255, 218, 214)",
        "onErrorContainer": "rgb(65, 0, 2)",
        "background": "rgb(252, 253, 247)",
        "onBackground": "rgb(26, 28, 25)",
        "surface": "rgb(252, 253, 247)",
        "onSurface": "rgb(26, 28, 25)",
        "surfaceVariant": "rgb(221, 229, 218)",
        "onSurfaceVariant": "rgb(65, 73, 65)",
        "outline": "rgb(114, 121, 112)",
        "outlineVariant": "rgb(193, 201, 190)",
        "shadow": "rgb(0, 0, 0)",
        "scrim": "rgb(0, 0, 0)",
        "inverseSurface": "rgb(46, 49, 46)",
        "inverseOnSurface": "rgb(240, 241, 236)",
        "inversePrimary": "rgb(88, 224, 126)",
        "elevation": {
            "level0": "transparent",
            "level1": "rgb(239, 246, 237)",
            "level2": "rgb(232, 242, 231)",
            "level3": "rgb(224, 237, 225)",
            "level4": "rgb(222, 236, 223)",
            "level5": "rgb(217, 233, 219)"
        },
        "surfaceDisabled": "rgba(26, 28, 25, 0.12)",
        "onSurfaceDisabled": "rgba(26, 28, 25, 0.38)",
        "backdrop": "rgba(43, 50, 43, 0.4)"
    }
};

export const theme = {
    ...DefaultTheme,
    colors: colors.colors, // Copy it from the color codes scheme and then use it here
};