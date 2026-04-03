import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import * as Haptics from 'expo-haptics';

import { colors, palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { AppText } from '@/components/ui/app-text';

export type ButtonVariant = 'primary' | 'outlined' | 'dark' | 'ghost';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  accessibilityLabel,
}: ButtonProps) {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  const containerStyle = [
    styles.base,
    variant === 'primary' && styles.primary,
    variant === 'outlined' && styles.outlined,
    variant === 'dark' && styles.dark,
    variant === 'ghost' && styles.ghost,
    (disabled || loading) && styles.disabled,
    style,
  ];

  const textColor =
    variant === 'outlined'
      ? colors.primary
      : variant === 'ghost'
        ? colors.primary
        : colors.textInverse;

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={handlePress}
      disabled={disabled || loading}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <AppText
          variant="labelLg"
          style={{ color: textColor, letterSpacing: variant === 'outlined' ? 1.5 : 0 }}
        >
          {label}
        </AppText>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 56,
    borderRadius: spacing.buttonRadius,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  primary: {
    backgroundColor: colors.buttonPrimary,
  },
  outlined: {
    backgroundColor: colors.background,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  dark: {
    backgroundColor: '#1A1A1A',
  },
  ghost: {
    backgroundColor: palette.transparent,
  },
  disabled: {
    opacity: 0.5,
  },
});
