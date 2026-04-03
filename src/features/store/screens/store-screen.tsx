import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { AppText } from '@/components/ui/app-text';
import { SafeScreen } from '@/components/ui/safe-screen';

export function StoreScreen() {
  return (
    <SafeScreen>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Ionicons name="bag-outline" size={64} color={colors.primary} />
        </View>
        <AppText variant="h2" style={styles.title}>
          Store
        </AppText>
        <AppText variant="bodyMd" style={styles.subtitle}>
          Premium features & content packs{'\n'}coming soon!
        </AppText>
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.screenPadding,
    gap: spacing.m,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.textPrimary,
  },
  subtitle: {
    textAlign: 'center',
    color: colors.textSecondary,
  },
});
