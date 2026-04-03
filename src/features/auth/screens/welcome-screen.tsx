import React from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Pressable } from 'react-native';
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
const BUTTON_HEIGHT = 58;
const BUTTON_TOP = 670;
const BUTTON_LEFT = 24;
const BUTTON_SHADOW_H = 8;

const FOOTER_TOP = 768;
const FOOTER_LEFT = 24;
const FOOTER_WIDTH = 345;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// ─── Shared 3D Orange Button ─────────────────────────────────────────────────
/**
 * Reusable 3D orange button used on Welcome & Login screens.
 * Matches Figma: solid #FF6D00 surface, 8 dp #FF5000 bottom shadow,
 * border-radius Rounding/M (16), with optional left icon.
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
  const shadowH = useSharedValue(BUTTON_SHADOW_H);

  const animatedBtn = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));
  const animatedShadow = useAnimatedStyle(() => ({
    height: shadowH.value,
  }));

  const handlePressIn = () => {
    if (disabled) return;
    translateY.value = withSpring(BUTTON_SHADOW_H - 1, { damping: 20, stiffness: 400 });
    shadowH.value = withSpring(1, { damping: 20, stiffness: 400 });
  };
  const handlePressOut = () => {
    translateY.value = withSpring(0, { damping: 15, stiffness: 300 });
    shadowH.value = withSpring(BUTTON_SHADOW_H, { damping: 15, stiffness: 300 });
  };
  const handlePress = () => {
    if (disabled) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  const surfaceColor = disabled ? colors.buttonDisabled : '#FF6D00';
  const shadowColor = disabled ? '#C0C0C0' : '#FF5000';
  const labelColor = disabled ? colors.textDisabled : palette.white;

  return (
    <View style={{ width, height: BUTTON_HEIGHT + BUTTON_SHADOW_H }}>
      {/* 3D shadow layer */}
      <Animated.View
        style={[
          {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            borderRadius: spacing.m,
            backgroundColor: shadowColor,
          },
          animatedShadow,
        ]}
      />
      {/* Button surface */}
      <AnimatedPressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={label}
        style={[
          {
            width,
            height: BUTTON_HEIGHT,
            borderRadius: spacing.m,
            backgroundColor: surfaceColor,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: spacing.l,
            paddingHorizontal: spacing.m,
            gap: spacing.xxs,
            zIndex: 1,
          },
          animatedBtn,
        ]}
      >
        {showLeftIcon && (
          <Ionicons
            name="checkmark-circle-outline"
            size={20}
            color={labelColor}
            style={{ marginRight: 4 }}
          />
        )}
        <Text
          style={{
            color: labelColor,
            fontFamily: typography.fonts.inter.semiBold,
            fontSize: typography.sizes.m,
            letterSpacing: -0.16,
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
        style={styles.container}
        contentFit="contain"
        cachePolicy="memory-disk"
        accessibilityLabel="Practice Top Interview Questions with AI illustration"
      />

      {/* CTA Button — 345×58 @ top:670 left:24 */}
      <View style={styles.buttonPosition}>
        <OrangePrimaryButton
          label="Let's go"
          onPress={() => navigation.navigate('Login')}
          width={BUTTON_WIDTH}
          showLeftIcon
        />
      </View>

      {/* Footer — 345×34 @ top:768 left:24 */}
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
  container: {
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
    letterSpacing: -0.14,
    lineHeight: 18,
  },
  footerLink: {
    textDecorationLine: 'underline',
    color: '#6C6C70',
    fontFamily: typography.fonts.inter.normal,
  },
});
