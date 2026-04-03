import React from 'react';
import { Text, StyleSheet, type StyleProp, type TextStyle } from 'react-native';

import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

export type TextVariant =
  | 'display'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'bodyLg'
  | 'bodyMd'
  | 'bodySm'
  | 'labelLg'
  | 'labelMd'
  | 'labelSm'
  | 'caption';

interface AppTextProps {
  variant?: TextVariant;
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  accessibilityLabel?: string;
}

export function AppText({
  variant = 'bodyMd',
  children,
  style,
  numberOfLines,
  accessibilityLabel,
}: AppTextProps) {
  return (
    <Text
      style={[styles.base, variantStyles[variant], style]}
      numberOfLines={numberOfLines}
      accessibilityLabel={accessibilityLabel}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    color: colors.textPrimary,
    fontFamily: typography.fonts.inter.normal,
  },
});

const variantStyles: Record<TextVariant, TextStyle> = {
  display: {
    fontSize: typography.sizes.display,
    fontFamily: typography.fonts.inter.bold,
    lineHeight: typography.sizes.display * 1.2,
  },
  h1: {
    fontSize: typography.sizes.xxxl,
    fontFamily: typography.fonts.inter.bold,
    lineHeight: typography.sizes.xxxl * 1.25,
  },
  h2: {
    fontSize: typography.sizes.xxl,
    fontFamily: typography.fonts.inter.semiBold,
    lineHeight: typography.sizes.xxl * 1.3,
  },
  h3: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.inter.semiBold,
    lineHeight: typography.sizes.xl * 1.35,
  },
  bodyLg: {
    fontSize: typography.sizes.l,
    fontFamily: typography.fonts.inter.normal,
    lineHeight: typography.sizes.l * 1.5,
  },
  bodyMd: {
    fontSize: typography.sizes.m,
    fontFamily: typography.fonts.inter.normal,
    lineHeight: typography.sizes.m * 1.5,
  },
  bodySm: {
    fontSize: typography.sizes.s,
    fontFamily: typography.fonts.inter.normal,
    lineHeight: typography.sizes.s * 1.5,
  },
  labelLg: {
    fontSize: typography.sizes.m,
    fontFamily: typography.fonts.inter.semiBold,
    lineHeight: typography.sizes.m * 1.2,
  },
  labelMd: {
    fontSize: typography.sizes.s,
    fontFamily: typography.fonts.inter.semiBold,
    lineHeight: typography.sizes.s * 1.2,
  },
  labelSm: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.inter.semiBold,
    lineHeight: typography.sizes.xs * 1.2,
  },
  caption: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.inter.normal,
    lineHeight: typography.sizes.xs * 1.4,
  },
};
