/**
 * Spacing Scale
 *
 * Use named tokens instead of magic numbers for all margin/padding/gap values.
 */

export const spacing = {
  xxxs: 2,
  xxs: 4,
  xs: 8,
  s: 12,
  m: 16,
  l: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
  giga: 64,

  // Semantic
  screenPadding: 20,
  cardPadding: 16,
  cardRadius: 16,
  buttonRadius: 24,
  inputRadius: 12,
  avatarSize: 56,
  pillRadius: 40,
  badgeSize: 64,
  bottomSheetRadius: 24,
  otpBoxSize: 48,
} as const;

export type Spacing = typeof spacing;
