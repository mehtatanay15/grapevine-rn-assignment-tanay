import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withDelay,
  Easing 
} from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';

import { colors } from '@/theme/colors';
import { AppText } from '@/components/ui/app-text';
import type { AuthScreenProps } from '@/navigation/types';

type Props = AuthScreenProps<'Splash'>;

export function SplashScreen({ navigation }: Props) {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);

  useEffect(() => {
    // Initial animation
    opacity.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.quad) });
    scale.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.back(1.5)) });

    // Navigate after a delay
    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigation, opacity, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Animated.View style={[styles.logoContainer, animatedStyle]}>
        <AppText variant="display" style={styles.logoText}>
          Ready!
        </AppText>
        <View style={styles.dot} />
      </Animated.View>
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
    fontSize: 56,
    letterSpacing: -1.5,
    fontWeight: '800',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginTop: -8,
    alignSelf: 'center',
  },
});
