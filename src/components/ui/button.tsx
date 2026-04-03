import React from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
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

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SHADOW_HEIGHT = 5;

/**
 * 3D Button — has a visible darker bottom edge that makes it look raised.
 * On press, the button translates down and the shadow shrinks.
 */
export function Button({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  accessibilityLabel,
}: ButtonProps) {
  const translateY = useSharedValue(0);
  const shadowHeight = useSharedValue(SHADOW_HEIGHT);

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const animatedShadowStyle = useAnimatedStyle(() => ({
    height: shadowHeight.value,
  }));

  const handlePressIn = () => {
    translateY.value = withSpring(SHADOW_HEIGHT - 1, { damping: 20, stiffness: 400 });
    shadowHeight.value = withSpring(1, { damping: 20, stiffness: 400 });
  };

  const handlePressOut = () => {
    translateY.value = withSpring(0, { damping: 15, stiffness: 300 });
    shadowHeight.value = withSpring(SHADOW_HEIGHT, { damping: 15, stiffness: 300 });
  };

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  const getShadowColor = () => {
    if (disabled) return colors.buttonDisabled;
    switch (variant) {
      case 'primary':
        return colors.buttonPrimaryShadow;
      case 'dark':
        return colors.buttonDarkShadow;
      case 'outlined':
        return colors.borderStrong;
      default:
        return palette.transparent;
    }
  };

  const textColor =
    variant === 'outlined'
      ? colors.primary
      : variant === 'ghost'
        ? colors.primary
        : disabled
          ? colors.buttonDisabledText
          : colors.textInverse;

  const show3D = variant !== 'ghost';

  return (
    <View style={[styles.wrapper, style]}>
      {/* Shadow layer (the darker bottom edge) */}
      {show3D && (
        <View
          style={[
            styles.shadowLayer,
            {
              backgroundColor: getShadowColor(),
              borderRadius: spacing.buttonRadius,
            },
          ]}
        />
      )}

      {/* Animated button surface */}
      <AnimatedPressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        disabled={disabled || loading}
        style={[
          styles.base,
          variant === 'primary' && styles.primary,
          variant === 'outlined' && styles.outlined,
          variant === 'dark' && styles.dark,
          variant === 'ghost' && styles.ghost,
          disabled && styles.disabled,
          animatedButtonStyle,
        ]}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? label}
      >
        {loading ? (
          <ActivityIndicator color={textColor} />
        ) : (
          <AppText
            variant="labelLg"
            style={{
              color: textColor,
              letterSpacing: variant === 'outlined' ? 1.5 : 0,
              fontFamily: typography.fonts.inter.bold,
            }}
          >
            {label}
          </AppText>
        )}
      </AnimatedPressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  shadowLayer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 56 + SHADOW_HEIGHT,
    borderRadius: spacing.buttonRadius,
  },
  base: {
    height: 56,
    borderRadius: spacing.buttonRadius,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    zIndex: 1,
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
    backgroundColor: colors.buttonDark,
  },
  ghost: {
    backgroundColor: palette.transparent,
  },
  disabled: {
    backgroundColor: colors.buttonDisabled,
  },
});
