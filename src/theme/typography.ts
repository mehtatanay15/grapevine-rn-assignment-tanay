import { Platform } from "react-native";

/**
 * Typography
 *
 * Font family definitions using the Inter font loaded via expo-font.
 * See README for how to load fonts in App.tsx.
 */

export const typography = {
  fonts: {
    inter: {
      light: "Inter_300Light",
      normal: "Inter_400Regular",
      medium: "Inter_500Medium",
      semiBold: "Inter_600SemiBold",
      bold: "Inter_700Bold",
    },
    system: Platform.select({
      ios: "System",
      android: "Roboto",
      default: "System",
    }),
  },

  sizes: {
    xxxs: 9,
    xxs: 11,
    xs: 12,
    s: 14,
    m: 16,
    l: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    display: 44,
    giga: 56,
  },
} as const;

export type Typography = typeof typography;
