import React, { memo, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
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
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* ── Audio Player ── */}
      <View style={styles.player}>
        <TouchableOpacity
          style={styles.playButton}
          accessibilityRole="button"
          accessibilityLabel="Play audio"
        >
          <Ionicons name="play" size={20} color={colors.textPrimary} />
        </TouchableOpacity>

        <View style={styles.playerInfo}>
          <AppText variant="labelMd" style={styles.playerTitle}>
            Mock Interview
          </AppText>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
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

      {/* ── Moments List ── */}
      {moments.map((moment, index) => {
        const isLast = index === moments.length - 1;
        return (
          <View key={`${moment.timestamp}-${index}`} style={[styles.momentRow, !isLast && styles.momentBorder]}>
            <AppText
              variant="labelMd"
              style={[
                styles.timestamp,
                {
                  color:
                    moment.type === 'positive'
                      ? colors.timestampPositive
                      : colors.timestampNegative,
                },
              ]}
            >
              {moment.timestamp}
            </AppText>
            <AppText variant="bodyMd" style={styles.description}>
              {moment.description}
            </AppText>
          </View>
        );
      })}
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.m,
    paddingBottom: spacing.xxxl,
  },
  // ── Player ──
  player: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: spacing.cardRadius,
    padding: spacing.m,
    gap: spacing.m,
    marginBottom: spacing.m,
  },
  playButton: {
    width: spacing.xxxl,
    height: spacing.xxxl,
    borderRadius: spacing.l,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: spacing.xxs,
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
  progressBar: {
    height: spacing.xxs,
    backgroundColor: colors.border,
    borderRadius: spacing.xxxs,
    overflow: 'hidden',
  },
  progressFill: {
    width: '40%',
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: spacing.xxxs,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    color: colors.textSecondary,
  },
  // ── Moments ──
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
