/**
 * ReadyU Brand Color Palette
 *
 * Use these tokens throughout your components.
 * Do NOT use hardcoded hex values in component files.
 */
export const palette = {
  // Brand Orange
  orange10: '#FFF7ED',
  orange20: '#FFEDD5',
  orange30: '#FED7AA',
  orange40: '#FB923C',
  orange50: '#F97316',
  orange60: '#EA580C',
  orange70: '#C2410C',
  orange80: '#9A3412',

  // Greens
  green10: '#F0FDF4',
  green20: '#DCFCE7',
  green30: '#86EFAC',
  green40: '#4ADE80',
  green50: '#22C55E',
  green60: '#16A34A',
  green70: '#15803D',
  green80: '#166534',
  green90: '#064E3B',

  // Yellow / Gold
  yellow10: '#FFFBEB',
  yellow20: '#FEF3C7',
  yellow30: '#FDE68A',
  yellow40: '#FCD34D',
  yellow50: '#F5C518',
  yellow60: '#D4A017',
  yellow70: '#B8860B',

  // Slate (Neutrals)
  slate50: '#F8FAFC',
  slate100: '#F1F5F9',
  slate200: '#E2E8F0',
  slate300: '#CBD5E1',
  slate400: '#94A3B8',
  slate500: '#64748B',
  slate600: '#475569',
  slate700: '#334155',
  slate800: '#1E293B',
  slate900: '#0F172A',

  // Blue (Key Moments timestamps)
  blue50: '#1D7FEA',
  blue60: '#2563EB',

  // Red
  red50: '#EF4444',
  red10: '#FEF2F2',
  red60: '#EA4C1D',

  // Utility
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
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
  primaryShadow: palette.orange70,

  // Text
  textPrimary: palette.slate900,
  textSecondary: palette.slate500,
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
  successMedium: palette.green20,
  successDark: palette.green90,
  error: palette.red50,
  errorLight: palette.red10,

  // Card States (Winding Path)
  cardActiveBg: '#D4F5C4',
  cardActiveBorder: '#3DAB23',
  cardActiveBadge: '#3DAB23',
  cardNextBg: '#FFF0B3',
  cardNextBorder: palette.yellow60,
  cardNextBadge: palette.yellow60,
  cardLockedBg: '#F0F0F0',
  cardLockedBorder: '#E0E0E0',
  cardLockedBadge: '#C5C5C5',
  cardLockedShadow: '#D5D5D5',

  // Bottom Sheet & Accents
  sheetQuestionBg: palette.yellow50,
  sessionHeaderBg: '#D4EDDA',

  // Interactive
  buttonPrimary: palette.orange50,
  buttonPrimaryText: palette.white,
  buttonPrimaryShadow: palette.orange70,
  buttonSecondary: palette.slate100,
  buttonSecondaryText: palette.slate800,
  buttonDark: '#1A1A1A',
  buttonDarkShadow: '#000000',
  buttonDisabled: palette.slate200,
  buttonDisabledText: palette.slate400,

  // Badge
  streakBadgeBg: '#10B981',
  streakBadgeText: palette.white,

  // Timestamp colors
  timestampPositive: palette.blue50,
  timestampNegative: palette.red60,
} as const;

export type Colors = typeof colors;
