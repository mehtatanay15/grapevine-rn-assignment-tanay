import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { colors } from '@/theme/colors';
import { AppText } from '@/components/ui/app-text';
import type { AuthScreenProps } from '@/navigation/types';

type Props = AuthScreenProps<'Splash'>;

export function SplashScreen({ navigation }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.logoContainer}>
        <AppText variant="display" style={styles.logoText}>
          Ready!
        </AppText>
        <View style={styles.dot} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: colors.primary,
    fontSize: 48,
    letterSpacing: -1,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginTop: 4,
    opacity: 0,
  },
});
