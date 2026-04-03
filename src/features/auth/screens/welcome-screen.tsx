import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';

import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { SafeScreen } from '@/components/ui/safe-screen';
import type { AuthScreenProps } from '@/navigation/types';

const { width } = Dimensions.get('window');
type Props = AuthScreenProps<'Welcome'>;

export function WelcomeScreen({ navigation }: Props) {
  return (
    <SafeScreen>
      <StatusBar style="dark" />
      <View style={styles.container}>
        {/* Illustration */}
        <Animated.View 
          entering={FadeInUp.duration(1000).springify()}
          style={styles.illustrationContainer}
        >
          <View style={styles.artBoard}>
            {/* Background Circle */}
            <View style={styles.circleBg} />
            {/* Abstract Shapes */}
            <View style={[styles.shape, styles.shape1]} />
            <View style={[styles.shape, styles.shape2]} />
            <View style={[styles.shape, styles.shape3]} />
            {/* Floating Message Bubbles Mock */}
            <View style={styles.bubbleContainer}>
              <View style={[styles.bubble, styles.bubbleRight]}>
                <View style={[styles.bubbleLine, { width: '80%' }]} />
                <View style={[styles.bubbleLine, { width: '50%' }]} />
              </View>
              <View style={[styles.bubble, styles.bubbleLeft]}>
                <View style={[styles.bubbleLine, { width: '70%', backgroundColor: colors.success }]} />
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Brand Copy */}
        <Animated.View 
          entering={FadeInDown.delay(300).duration(1000).springify()}
          style={styles.copyContainer}
        >
          <AppText variant="display" style={styles.logo}>
            Ready!
          </AppText>
          <AppText variant="h2" style={styles.tagline}>
            Practice Top Interview{'\n'}Questions with AI
          </AppText>
          <AppText variant="bodyMd" style={styles.subTagline}>
            Simulate real interviews, get instant feedback,{'\n'}and land your dream job at top-tier companies.
          </AppText>
        </Animated.View>

        {/* CTA */}
        <Animated.View 
          entering={FadeInDown.delay(600).duration(1000).springify()}
          style={styles.ctaContainer}
        >
          <Button
            label="Get Started"
            onPress={() => navigation.navigate('Login')}
            style={styles.ctaButton}
            accessibilityLabel="Get started with Ready"
          />
          <AppText variant="caption" style={styles.footerNote}>
            Elevate your career with AI-powered practice.
          </AppText>
        </Animated.View>
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: spacing.xl,
  },
  illustrationContainer: {
    flex: 1.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  artBoard: {
    width: width * 0.75,
    height: width * 0.75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.primaryLight,
    borderRadius: (width * 0.75) / 2,
    opacity: 0.6,
    transform: [{ scale: 0.9 }],
  },
  shape: {
    position: 'absolute',
    borderRadius: 12,
  },
  shape1: {
    width: 60,
    height: 60,
    backgroundColor: '#FFBE7D',
    top: '20%',
    left: '10%',
    borderRadius: 30,
    opacity: 0.8,
  },
  shape2: {
    width: 100,
    height: 100,
    backgroundColor: '#FFE5C4',
    bottom: '15%',
    right: '5%',
    borderRadius: 20,
    transform: [{ rotate: '15deg' }],
  },
  shape3: {
    width: 40,
    height: 40,
    backgroundColor: colors.primary,
    top: '15%',
    right: '15%',
    borderRadius: 8,
    transform: [{ rotate: '-20deg' }],
  },
  bubbleContainer: {
    width: '80%',
    gap: spacing.s,
  },
  bubble: {
    padding: spacing.s,
    borderRadius: 16,
    backgroundColor: colors.background,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    gap: 6,
  },
  bubbleRight: {
    alignSelf: 'flex-end',
    width: '70%',
    borderBottomRightRadius: 2,
  },
  bubbleLeft: {
    alignSelf: 'flex-start',
    width: '60%',
    borderBottomLeftRadius: 2,
  },
  bubbleLine: {
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.border,
  },
  copyContainer: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  logo: {
    color: colors.primary,
    fontSize: 44,
    fontFamily: typography.fonts.inter.bold,
    letterSpacing: -1.5,
    marginBottom: spacing.xs,
  },
  tagline: {
    textAlign: 'center',
    color: colors.textPrimary,
    marginBottom: spacing.m,
    lineHeight: 34,
    fontSize: 28,
  },
  subTagline: {
    textAlign: 'center',
    color: colors.textSecondary,
    lineHeight: 24,
    fontSize: 15,
  },
  ctaContainer: {
    gap: spacing.m,
    alignItems: 'center',
  },
  ctaButton: {
    width: '100%',
    height: 56,
  },
  footerNote: {
    color: colors.textTertiary,
  },
});
