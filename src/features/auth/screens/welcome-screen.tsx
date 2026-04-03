import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

import { colors, palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import type { AuthScreenProps } from '@/navigation/types';

type Props = AuthScreenProps<'Welcome'>;

const LOGO = require('../../../../assets/images/logo.png');
const CONTAINER_IMG = require('../../../../assets/images/Container.png');

// ─── Figma layout (dp) ───────────────────────────────────────────────────────
const LOGO_WIDTH = 138;
const LOGO_HEIGHT = 46;
const LOGO_TOP = 78;
const LOGO_LEFT = 128;

const CONTAINER_WIDTH = 348;
const CONTAINER_HEIGHT = 330;
const CONTAINER_TOP = 232;
const CONTAINER_LEFT = 21;

const BUTTON_WIDTH = 345;
const BUTTON_TOP = 670;
const BUTTON_LEFT = 24;

const FOOTER_TOP = 768;
const FOOTER_LEFT = 24;
const FOOTER_WIDTH = 345;

// ─── Button constants ─────────────────────────────────────────────────────────
export const BTN_H = 58;      // surface height
export const BTN_SHADOW = 8;  // depth of 3-D shadow

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// ─── OrangePrimaryButton ──────────────────────────────────────────────────────
/**
 * Shared 3-D orange press button.
 *
 * Architecture:
 *   ┌─ wrapper (BTN_H + BTN_SHADOW tall) ─────────────────────────┐
 *   │  [shadow rect]  — static, fills wrapper, darker orange      │
 *   │  [surface]      — absolute top:0, height: BTN_H             │
 *   │                   AnimatedPressable translates Y on press    │
 *   └─────────────────────────────────────────────────────────────┘
 *
 * On rest   : surface at translateY=0  → shadow pokes out BTN_SHADOW below
 * On press  : surface at translateY=BTN_SHADOW → covers all of shadow → flat
 *
 * No overflow:hidden on the surface — avoids descender clipping ("g", "y").
 */
export function OrangePrimaryButton({
  label,
  onPress,
  width,
  disabled = false,
  showLeftIcon = false,
}: {
  label: string;
  onPress: () => void;
  width: number;
  disabled?: boolean;
  showLeftIcon?: boolean;
}) {
  const translateY = useSharedValue(0);

  const animatedSurface = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const handlePressIn = () => {
    if (disabled) return;
    translateY.value = withSpring(BTN_SHADOW, {
      damping: 18,
      stiffness: 380,
      mass: 0.6,
    });
  };

  const handlePressOut = () => {
    translateY.value = withSpring(0, {
      damping: 14,
      stiffness: 280,
      mass: 0.6,
    });
  };

  const handlePress = () => {
    if (disabled) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onPress();
  };

  const surfaceBg = disabled ? colors.buttonDisabled : '#FF6D00';
  const shadowBg  = disabled ? '#BEBEBE'              : '#FF5000';
  const textColor = disabled ? colors.textDisabled    : palette.white;

  return (
    // Wrapper is tall enough to show the shadow below the surface
    <View style={{ width, height: BTN_H + BTN_SHADOW }}>

      {/* ── Shadow rect — static, fills full wrapper ── */}
      <View
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          borderRadius: spacing.m,
          backgroundColor: shadowBg,
        }}
      />

      {/* ── Animated surface — sits on top of shadow ── */}
      <AnimatedPressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={label}
        style={[
          {
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: BTN_H,
            borderRadius: spacing.m,
            backgroundColor: surfaceBg,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            // horizontal padding only — vertical centring via alignItems
            paddingHorizontal: spacing.m,
          },
          animatedSurface,
        ]}
      >
        {showLeftIcon && (
          <Ionicons
            name="checkmark-circle-outline"
            size={22}
            color={textColor}
            style={{ marginRight: 6 }}
          />
        )}
        <Text
          style={{
            color: textColor,
            fontFamily: typography.fonts.inter.semiBold,
            fontSize: typography.sizes.m,
            // no letterSpacing restriction that could clip glyphs
            includeFontPadding: false,
          }}
        >
          {label}
        </Text>
      </AnimatedPressable>
    </View>
  );
}

// ─── Welcome Screen ───────────────────────────────────────────────────────────
export function WelcomeScreen({ navigation }: Props) {
  return (
    <View style={styles.root}>
      <StatusBar style="dark" />

      {/* Logo — 138×46 @ top:78 left:128 */}
      <Image
        source={LOGO}
        style={styles.logo}
        contentFit="contain"
        cachePolicy="memory-disk"
        accessibilityLabel="Ready! logo"
      />

      {/* Illustration — 348×330 @ top:232 left:21 */}
      <Image
        source={CONTAINER_IMG}
        style={styles.containerImg}
        contentFit="contain"
        cachePolicy="memory-disk"
        accessibilityLabel="Practice Top Interview Questions with AI illustration"
      />

      {/* CTA — 345×(58+8) @ top:670 left:24 */}
      <View style={styles.buttonPosition}>
        <OrangePrimaryButton
          label="Let's go"
          onPress={() => navigation.navigate('Login')}
          width={BUTTON_WIDTH}
          showLeftIcon
        />
      </View>

      {/* Footer — width:345 @ top:768 left:24 */}
      <View style={styles.footerPosition}>
        <Text style={styles.footerText}>
          {'By continuing, you acknowledge agreeing to our '}
          <Text style={styles.footerLink}>terms of service</Text>
          {' and '}
          <Text style={styles.footerLink}>privacy policy</Text>
        </Text>
      </View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  logo: {
    position: 'absolute',
    top: LOGO_TOP,
    left: LOGO_LEFT,
    width: LOGO_WIDTH,
    height: LOGO_HEIGHT,
  },
  containerImg: {
    position: 'absolute',
    top: CONTAINER_TOP,
    left: CONTAINER_LEFT,
    width: CONTAINER_WIDTH,
    height: CONTAINER_HEIGHT,
  },
  buttonPosition: {
    position: 'absolute',
    top: BUTTON_TOP,
    left: BUTTON_LEFT,
  },
  footerPosition: {
    position: 'absolute',
    top: FOOTER_TOP,
    left: FOOTER_LEFT,
    width: FOOTER_WIDTH,
    alignItems: 'center',
  },
  footerText: {
    fontFamily: typography.fonts.inter.normal,
    fontSize: typography.sizes.s,
    color: '#6C6C70',
    textAlign: 'center',
    lineHeight: 18,
  },
  footerLink: {
    textDecorationLine: 'underline',
    color: '#6C6C70',
    fontFamily: typography.fonts.inter.normal,
  },
});
