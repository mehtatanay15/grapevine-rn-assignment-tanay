import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';

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

export function SessionResultScreen({ navigation }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>('summary');
  const result = sessionData as unknown as SessionResult;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* ── Green header ── */}
      <View style={styles.header}>
        {/* Avatars */}
        <View style={styles.avatarsRow}>
          {/* Avatar 1 placeholder */}
          <View style={[styles.avatar, styles.avatarLeft]}>
            <AppText variant="h3" style={styles.avatarEmoji}>
              👨
            </AppText>
          </View>
          {/* Avatar 2 placeholder */}
          <View style={[styles.avatar, styles.avatarRight]}>
            <AppText variant="h3" style={styles.avatarEmoji}>
              👩
            </AppText>
          </View>

          {/* Close button */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => navigation.goBack()}
            accessibilityRole="button"
            accessibilityLabel="Close session result"
          >
            <Ionicons name="close" size={18} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Question card */}
        <View style={styles.questionCard}>
          <AppText variant="bodyMd" style={styles.questionText}>
            {result.questionText}
          </AppText>
          <View style={styles.askedByRow}>
            {result.companyLogoUrl ? (
              <Image
                source={{ uri: result.companyLogoUrl }}
                style={styles.companyLogo}
                cachePolicy="memory-disk"
                contentFit="contain"
                accessibilityLabel={`${result.companyName} logo`}
              />
            ) : (
              <View style={[styles.companyLogo, styles.logoPlaceholder]}>
                <AppText variant="labelSm" style={{ color: colors.textSecondary }}>
                  {result.companyName.slice(0, 2).toUpperCase()}
                </AppText>
              </View>
            )}
            <AppText variant="labelMd" style={styles.askedByText}>
              Asked by {result.companyName}
            </AppText>
          </View>
        </View>
      </View>

      {/* ── Tab switcher ── */}
      <View style={styles.tabContainer}>
        <TabButton
          label="Smart summary"
          isActive={activeTab === 'summary'}
          onPress={() => setActiveTab('summary')}
        />
        <TabButton
          label="Key moments"
          isActive={activeTab === 'keyMoments'}
          onPress={() => setActiveTab('keyMoments')}
        />
      </View>

      {/* ── Tab content ── */}
      <View style={styles.tabContent}>
        {activeTab === 'summary' ? (
          <SmartSummaryTab data={result.smartSummary} />
        ) : (
          <KeyMomentsTab
            moments={result.keyMoments}
            audioDurationSeconds={result.audioDurationSeconds}
          />
        )}
      </View>
    </View>
  );
}

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
}

function TabButton({ label, isActive, onPress }: TabButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.tabButton, isActive && styles.tabButtonActive]}
      onPress={onPress}
      accessibilityRole="tab"
      accessibilityLabel={label}
      accessibilityState={{ selected: isActive }}
    >
      <AppText
        variant="labelMd"
        style={[styles.tabLabel, isActive ? styles.tabLabelActive : styles.tabLabelInactive]}
      >
        {label}
      </AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  // ── Header ──
  header: {
    backgroundColor: '#E8F5E9',
    paddingTop: 56, // safe area for modal
    paddingBottom: spacing.l,
    paddingHorizontal: spacing.screenPadding,
  },
  avatarsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: spacing.m,
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.border,
  },
  avatarLeft: {
    zIndex: 1,
  },
  avatarRight: {
    marginLeft: -20,
    zIndex: 0,
  },
  avatarEmoji: {
    fontSize: 40,
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#DFF0DF',
    borderWidth: 1,
    borderColor: '#B8D8B8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionCard: {
    backgroundColor: colors.success,
    borderRadius: 20,
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.m,
    gap: spacing.s,
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
  companyLogo: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  logoPlaceholder: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  askedByText: {
    color: colors.textInverse,
    fontSize: typography.sizes.s,
  },
  // ── Tabs ──
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tabButton: {
    flex: 1,
    paddingVertical: spacing.m,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: palette.transparent,
  },
  tabButtonActive: {
    borderBottomColor: colors.textPrimary,
  },
  tabLabel: {
    textAlign: 'center',
  },
  tabLabelActive: {
    color: colors.textPrimary,
    fontFamily: typography.fonts.inter.semiBold,
  },
  tabLabelInactive: {
    color: colors.textSecondary,
    fontFamily: typography.fonts.inter.normal,
  },
  tabContent: {
    flex: 1,
  },
});
