import React, { useState, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import { colors, palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { AppText } from '@/components/ui/app-text';
import { SmartSummaryTab } from '@/features/session-result/components/smart-summary-tab';
import { KeyMomentsTab } from '@/features/session-result/components/key-moments-tab';
import type { SessionResult } from '@/features/session-result/types';
import type { RootScreenProps } from '@/navigation/types';

import sessionData from '@/mock-data/session-result.json';

type Props = RootScreenProps<'SessionResult'>;
type TabType = 'summary' | 'keyMoments';

const TABS: { key: TabType; label: string }[] = [
  { key: 'summary', label: 'Smart summary' },
  { key: 'keyMoments', label: 'Key moments' },
];

export function SessionResultScreen({ navigation }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>('summary');
  const result = sessionData as unknown as SessionResult;
  const { width: screenWidth } = useWindowDimensions();
  const tabWidth = (screenWidth - spacing.screenPadding * 2) / 2;

  // Animated tab indicator
  const indicatorX = useSharedValue(0);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorX.value }],
    width: tabWidth,
  }));

  const handleTabPress = useCallback(
    (tab: TabType, index: number) => {
      setActiveTab(tab);
      indicatorX.value = withTiming(index * tabWidth, {
        duration: 250,
        easing: Easing.out(Easing.ease),
      });
    },
    [indicatorX, tabWidth],
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* ── Green header ── */}
      <View style={styles.header}>
        {/* Close button */}
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Close session result"
        >
          <Ionicons name="close" size={20} color={colors.textPrimary} />
        </TouchableOpacity>

        {/* Overlapping avatars */}
        <View style={styles.avatarsContainer}>
          <View style={[styles.avatar, styles.avatarLeft]}>
            <AppText style={styles.avatarEmoji}>👨</AppText>
          </View>
          <View style={[styles.avatar, styles.avatarRight]}>
            <AppText style={styles.avatarEmoji}>👩</AppText>
          </View>
        </View>

        {/* Question card */}
        <View style={styles.questionCard}>
          <AppText variant="bodyMd" style={styles.questionText}>
            {result.questionText}
          </AppText>
          <View style={styles.askedByRow}>
            <View style={styles.companyLogoSmall}>
              <AppText variant="labelSm" style={styles.logoText}>
                {result.companyName.slice(0, 2).toLowerCase()}
              </AppText>
            </View>
            <AppText variant="labelMd" style={styles.askedByText}>
              Asked by {result.companyName}
            </AppText>
          </View>
        </View>
      </View>

      {/* ── Tab switcher ── */}
      <View style={styles.tabContainer}>
        {TABS.map((tab, index) => (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabButton}
            onPress={() => handleTabPress(tab.key, index)}
            accessibilityRole="tab"
            accessibilityState={{ selected: activeTab === tab.key }}
          >
            <AppText
              variant="labelMd"
              style={[
                styles.tabLabel,
                activeTab === tab.key ? styles.tabLabelActive : styles.tabLabelInactive,
              ]}
            >
              {tab.label}
            </AppText>
          </TouchableOpacity>
        ))}

        {/* Animated indicator bar */}
        <Animated.View style={[styles.tabIndicator, indicatorStyle]} />
      </View>

      {/* ── Tab content ── */}
      <View style={styles.tabContent}>
        {activeTab === 'summary' && <SmartSummaryTab data={result.smartSummary} />}
        {activeTab === 'keyMoments' && (
          <KeyMomentsTab
            moments={result.keyMoments}
            audioDurationSeconds={result.audioDurationSeconds}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  // ── Header ──
  header: {
    backgroundColor: colors.sessionHeaderBg,
    paddingTop: spacing.giga,
    paddingBottom: spacing.l,
    paddingHorizontal: spacing.screenPadding,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: spacing.xxxl + spacing.xs,
    right: spacing.screenPadding,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  avatarsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.m,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: spacing.xxxl,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.sessionHeaderBg,
  },
  avatarLeft: {
    zIndex: 1,
  },
  avatarRight: {
    marginLeft: -spacing.l,
    zIndex: 0,
  },
  avatarEmoji: {
    fontSize: 40,
  },
  questionCard: {
    backgroundColor: colors.success,
    borderRadius: spacing.cardRadius,
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.m,
    gap: spacing.s,
    width: '100%',
  },
  questionText: {
    color: colors.textInverse,
    fontFamily: typography.fonts.inter.semiBold,
    lineHeight: 22,
    textAlign: 'center',
  },
  askedByRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  companyLogoSmall: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: colors.textInverse,
    fontSize: typography.sizes.xxs,
  },
  askedByText: {
    color: colors.textInverse,
    fontFamily: typography.fonts.inter.medium,
  },
  // ── Tabs ──
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    position: 'relative',
    paddingHorizontal: spacing.screenPadding,
  },
  tabButton: {
    flex: 1,
    paddingVertical: spacing.m,
    alignItems: 'center',
  },
  tabLabel: {
    textAlign: 'center',
  },
  tabLabelActive: {
    color: colors.textPrimary,
    fontFamily: typography.fonts.inter.bold,
  },
  tabLabelInactive: {
    color: colors.textSecondary,
    fontFamily: typography.fonts.inter.normal,
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: spacing.screenPadding,
    height: 2,
    backgroundColor: colors.textPrimary,
  },
  tabContent: {
    flex: 1,
  },
});
