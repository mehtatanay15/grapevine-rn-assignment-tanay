/**
 * ReadyU Brand Color Palette
 *
 * Use these tokens throughout your components.
 * Do NOT use hardcoded hex values in component files.
 */
export const palette = {
  // Brand
  orange10: "#FFF7ED",
  orange20: "#FFEDD5",
  orange30: "#FED7AA",
  orange40: "#FB923C",
  orange50: "#F97316",
  orange60: "#EA580C",
  orange70: "#C2410C",

  // Greens
  green10: "#F0FDF4",
  green20: "#DCFCE7",
  green30: "#86EFAC",
  green40: "#4ADE80",
  green50: "#22C55E",
  green60: "#16A34A",
  green90: "#064E3B",

  // Slate (New cleaner grays)
  slate50: "#F8FAFC",
  slate100: "#F1F5F9",
  slate200: "#E2E8F0",
  slate300: "#CBD5E1",
  slate400: "#94A3B8",
  slate500: "#64748B",
  slate600: "#475569",
  slate700: "#334155",
  slate800: "#1E293B",
  slate900: "#0F172A",

  // Utility
  white: "#FFFFFF",
  black: "#000000",
  transparent: "transparent",
} as const;

export const colors = {
  // Backgrounds
  background: palette.white,
  backgroundSecondary: palette.slate50,
  backgroundFeedback: palette.green10,

  // Brand
  primary: palette.orange50,
  primaryLight: palette.orange10,
  primaryDark: palette.orange60,

  // Text
  textPrimary: palette.slate900,
  textSecondary: palette.slate600,
  textTertiary: palette.slate400,
  textDisabled: palette.slate300,
  textInverse: palette.white,
  textLink: palette.orange50,

  // Border
  border: palette.slate200,
  borderStrong: palette.slate300,
  borderFocused: palette.orange50,

  // Status
  success: palette.green60,
  successLight: palette.green10,
  successDark: palette.green90,
  error: "#EF4444",
  errorLight: "#FEF2F2",

  // Interactive
  buttonPrimary: palette.orange50,
  buttonPrimaryText: palette.white,
  buttonSecondary: palette.slate100,
  buttonSecondaryText: palette.slate800,
  buttonDisabled: palette.slate200,
  buttonDisabledText: palette.slate400,
} as const;

export type Colors = typeof colors;
