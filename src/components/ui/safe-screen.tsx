import React from 'react';
import { View, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@/theme/colors';

interface SafeScreenProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
}

export function SafeScreen({
  children,
  style,
  backgroundColor = colors.background,
  edges = ['top', 'left', 'right'],
}: SafeScreenProps) {
  return (
    <SafeAreaView style={[styles.safe, { backgroundColor }, style]} edges={edges}>
      <View style={[styles.content, { backgroundColor }]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
