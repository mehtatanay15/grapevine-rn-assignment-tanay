import React from 'react';
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

export const KeyMomentsTab = React.memo(function KeyMomentsTab({
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
          {/* using Ionicons play since pause.png doesn't exist locally */}
          <Ionicons name="play" size={20} color="#BF5F0A" style={{ marginLeft: 3 }} />
        </TouchableOpacity>

        <View style={styles.playerInfo}>
          <AppText style={styles.playerTitle}>
            Mock Interview
          </AppText>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
          <View style={styles.timeRow}>
            <AppText style={styles.timeText}>
              00:00
            </AppText>
            <AppText style={styles.timeText}>
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
    backgroundColor: '#FFF1E5', // var(--Orange-10)
    borderRadius: 16, // Rounding/L
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 16,
    paddingLeft: 12,
    gap: 12,
    marginBottom: spacing.l,
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  playerInfo: {
    flex: 1,
    gap: 6,
  },
  playerTitle: {
    color: '#BF5F0A', // var(--Orange-50)
    fontFamily: typography.fonts.inter.semiBold,
    fontSize: 14,
    lineHeight: 14,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#FFD8B2', // Track color estimate
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    width: '40%',
    height: '100%',
    backgroundColor: '#BF5F0A',
    borderRadius: 2,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    color: '#8E8E93',
    fontFamily: typography.fonts.inter.medium,
    fontSize: 12,
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
