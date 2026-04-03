import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { SafeScreen } from '@/components/ui/safe-screen';
import type { AuthScreenProps } from '@/navigation/types';

type Props = AuthScreenProps<'Welcome'>;

export function WelcomeScreen({ navigation }: Props) {
  return (
    <SafeScreen>
      <StatusBar style="dark" />
      <View style={styles.container}>
        {/* Illustration placeholder */}
        <View style={styles.illustrationContainer}>
          <View style={styles.illustrationPlaceholder}>
            <AppText variant="h3" style={styles.placeholderText}>
              🎓
            </AppText>
            <AppText variant="caption" style={styles.placeholderLabel}>
              Illustration
            </AppText>
          </View>
        </View>

        {/* Brand copy */}
        <View style={styles.copyContainer}>
          <AppText variant="display" style={styles.logo}>
            Ready!
          </AppText>
          <AppText variant="h3" style={styles.tagline}>
            Practice Top Interview{'\n'}Questions with AI
          </AppText>
          <AppText variant="bodyMd" style={styles.subTagline}>
            Simulate real interviews, get instant feedback,{'\n'}and land your dream job.
          </AppText>
        </View>

        {/* CTA */}
        <View style={styles.ctaContainer}>
          <Button
            label="Get Started"
            onPress={() => navigation.navigate('Login')}
            style={styles.ctaButton}
            accessibilityLabel="Get started with Ready"
          />
        </View>
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: spacing.xxxl,
  },
  illustrationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationPlaceholder: {
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  placeholderText: {
    fontSize: 64,
  },
  placeholderLabel: {
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  copyContainer: {
    alignItems: 'center',
    marginBottom: spacing.xxxl,
  },
  logo: {
    color: colors.primary,
    fontSize: 44,
    letterSpacing: -1,
    marginBottom: spacing.m,
  },
  tagline: {
    textAlign: 'center',
    color: colors.textPrimary,
    marginBottom: spacing.s,
    lineHeight: 30,
  },
  subTagline: {
    textAlign: 'center',
    color: colors.textSecondary,
    lineHeight: 22,
  },
  ctaContainer: {
    gap: spacing.s,
  },
  ctaButton: {
    width: '100%',
  },
});
