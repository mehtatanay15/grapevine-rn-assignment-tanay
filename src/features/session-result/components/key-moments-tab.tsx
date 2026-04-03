import React, { memo, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Ionicons } from '@expo/vector-icons';

import { colors, palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { AppText } from '@/components/ui/app-text';
import type { KeyMoment } from '@/features/session-result/types';

interface KeyMomentsTabProps {
  moments: KeyMoment[];
  audioDurationSeconds: number;
}

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export const KeyMomentsTab = memo(function KeyMomentsTab({
  moments,
  audioDurationSeconds,
}: KeyMomentsTabProps) {
  const renderMoment = useCallback(
    ({ item, index }: { item: KeyMoment; index: number }) => {
      const isLast = index === moments.length - 1;
      return (
        <View style={[styles.momentRow, !isLast && styles.momentBorder]}>
          <AppText
            variant="labelMd"
            style={[
              styles.timestamp,
              { color: item.type === 'positive' ? '#1D7FEA' : '#EA4C1D' },
            ]}
          >
            {item.timestamp}
          </AppText>
          <AppText variant="bodyMd" style={styles.description}>
            {item.description}
          </AppText>
        </View>
      );
    },
    [moments.length],
  );

  return (
    <View style={styles.container}>
      {/* Mock audio player */}
      <View style={styles.player}>
        <TouchableOpacity
          style={styles.playButton}
          accessibilityRole="button"
          accessibilityLabel="Play audio"
        >
          <Ionicons name="play" size={20} color={colors.primary} />
        </TouchableOpacity>

        <View style={styles.playerInfo}>
          <AppText variant="labelMd" style={styles.playerTitle}>
            Mock Interview
          </AppText>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>
          </View>
          <View style={styles.timeRow}>
            <AppText variant="caption" style={styles.timeText}>
              00:00
            </AppText>
            <AppText variant="caption" style={styles.timeText}>
              {formatDuration(audioDurationSeconds)}
            </AppText>
          </View>
        </View>
      </View>

      {/* Key moments list */}
      <FlashList
        data={moments}
        renderItem={renderMoment}
        keyExtractor={item => item.timestamp}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  player: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.screenPadding,
    marginTop: spacing.m,
    marginBottom: spacing.s,
    backgroundColor: '#FFF3E0',
    borderRadius: spacing.cardRadius,
    padding: spacing.m,
    gap: spacing.m,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  playerInfo: {
    flex: 1,
    gap: spacing.xxxs,
  },
  playerTitle: {
    color: colors.primary,
    fontFamily: typography.fonts.inter.semiBold,
  },
  progressContainer: {
    width: '100%',
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    width: '40%',
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    color: colors.textSecondary,
  },
  listContent: {
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: spacing.xxxl,
  },
  momentRow: {
    paddingVertical: spacing.m,
    gap: spacing.xxs,
  },
  momentBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  timestamp: {
    fontFamily: typography.fonts.inter.semiBold,
  },
  description: {
    color: colors.textPrimary,
    lineHeight: 22,
  },
});
