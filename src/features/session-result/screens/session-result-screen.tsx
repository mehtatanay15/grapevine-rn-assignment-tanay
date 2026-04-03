import React, { useState, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
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

const COMPANY_LOGOS: Record<string, any> = {
  phonepe: require('../../../../assets/images/Companies/phonepe.png'),
  amazon: require('../../../../assets/images/Companies/amazon.png'),
  google: require('../../../../assets/images/Companies/google.png'),
  microsoft: require('../../../../assets/images/Companies/microsoft.png'),
  facebook: require('../../../../assets/images/Companies/facebook.png'),
};

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
        {/* Close button  */}
        <View style={styles.closeBtnShadow} />
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Close session result"
        >
          <Image source={require('../../../../assets/images/cross.png')} style={{ width: 14, height: 14 }} contentFit="contain" />
        </TouchableOpacity>

        {/* Grouped mock avatars */}
        <Image 
          source={require('../../../../assets/images/mock.png')} 
          style={styles.mockAvatars}
          contentFit="contain"
        />

        {/* Triangle pointing up */}
        <View style={styles.triangleUp} />

        {/* Question card */}
        <View style={styles.questionCard}>
          <AppText style={styles.questionText}>
            {result.questionText}
          </AppText>
          <View style={styles.askedByRow}>
            {COMPANY_LOGOS[result.companyName.toLowerCase()] && (
              <View style={styles.companyLogoSmall}>
                <Image 
                  source={COMPANY_LOGOS[result.companyName.toLowerCase()]} 
                  style={styles.companyLogo} 
                  contentFit="contain" 
                />
              </View>
            )}
            <AppText style={styles.askedByText}>
              Asked by {result.companyName}
            </AppText>
          </View>
        </View>
      </View>

      {/* ── White Board ── */}
      <View style={styles.boardContainer}>

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

      {/* ── Tab Content ── */}
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
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F7EC', // Derived light mint tint
  },
  // ── Header ──
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    zIndex: 10,
  },
  closeBtnShadow: {
    position: 'absolute',
    top: 64 + 4, // 60 padding + 4 margin offset for drop shadow
    right: 16,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#13BF69', // var(--Green-40) shadow base
    zIndex: 100,
  },
  closeButton: {
    position: 'absolute',
    top: 64,
    right: 16,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#95E5BD', // var(--Green-20)
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 101,
  },
  mockAvatars: {
    width: 173,
    height: 100,
    marginBottom: 8,
  },
  triangleUp: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#13BF69',
    marginTop: -8, // pull up into avatars space slightly or flush
  },
  questionCard: {
    backgroundColor: '#13BF69', // var(--Green-40)
    borderRadius: 16,
    padding: 16,
    gap: 10,
    width: 361,
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionText: {
    color: '#FFFFFF', // var(--Grey-00)
    fontFamily: typography.fonts.inter.bold,
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
  },
  askedByRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  companyLogoSmall: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  companyLogo: {
    width: 14,
    height: 14,
  },
  askedByText: {
    color: '#FFFFFF',
    fontFamily: typography.fonts.inter.semiBold,
    fontSize: 14,
  },
  // ── White Board ──
  boardContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#EFEFF4', 
    marginHorizontal: 0, // full width
    paddingTop: 8,
  },
  // ── Tabs ──
  tabContainer: {
    flexDirection: 'row',
    position: 'relative',
    paddingHorizontal: spacing.screenPadding,
    marginTop: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabLabel: {
    textAlign: 'center',
    fontSize: 15,
  },
  tabLabelActive: {
    color: '#1C1C1E',
    fontFamily: typography.fonts.inter.bold,
  },
  tabLabelInactive: {
    color: '#8E8E93',
    fontFamily: typography.fonts.inter.medium,
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: spacing.screenPadding,
    height: 2,
    backgroundColor: '#1C1C1E',
  },
  tabContent: {
    flex: 1,
  },
});
