import React, { memo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';

import { colors, palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { AppText } from '@/components/ui/app-text';
import type { Question, QuestionCardState } from '@/features/home/types';

interface QuestionCardProps {
  question: Question;
  state: QuestionCardState;
  showStart?: boolean;
  onPress: (question: Question) => void;
}

const STATE_COLORS: Record<QuestionCardState, { bg: string; badgeBg: string; badgeText: string; border: string }> = {
  active: {
    bg: '#D4F5C4',       // light green
    badgeBg: '#3DAB23',  // deep green
    badgeText: colors.textInverse,
    border: '#3DAB23',
  },
  next: {
    bg: '#FFF0B3',       // light yellow
    badgeBg: '#D4A017',  // golden yellow
    badgeText: colors.textInverse,
    border: '#D4A017',
  },
  locked: {
    bg: '#F0F0F0',
    badgeBg: '#C5C5C5',
    badgeText: colors.textInverse,
    border: '#C5C5C5',
  },
};

export const QuestionCard = memo(function QuestionCard({
  question,
  state,
  showStart = false,
  onPress,
}: QuestionCardProps) {
  const theme = STATE_COLORS[state];

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.bg, borderColor: theme.border }]}
      onPress={() => onPress(question)}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel={`Question ${question.questionNumber} by ${question.companyName}`}
    >
      {/* Company logo + name */}
      <View style={styles.leftSection}>
        {question.companyLogoUrl ? (
          <Image
            source={{ uri: question.companyLogoUrl }}
            style={styles.logo}
            cachePolicy="memory-disk"
            contentFit="contain"
            accessibilityLabel={`${question.companyName} logo`}
          />
        ) : (
          <View style={[styles.logo, styles.logoPlaceholder]}>
            <AppText variant="labelSm" style={{ color: colors.textSecondary }}>
              {question.companyName.slice(0, 2).toUpperCase()}
            </AppText>
          </View>
        )}
        <AppText variant="labelMd" style={styles.companyName}>
          {question.companyName}
        </AppText>
      </View>

      {/* START bubble (optional) */}
      {showStart && (
        <View style={styles.startBubble}>
          <AppText variant="labelMd" style={styles.startText}>
            START
          </AppText>
        </View>
      )}

      {/* Number badge */}
      <View style={[styles.badge, { backgroundColor: theme.badgeBg }]}>
        <AppText variant="h2" style={[styles.badgeNumber, { color: theme.badgeText }]}>
          {question.questionNumber}
        </AppText>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 40,
    borderWidth: 1.5,
    paddingVertical: spacing.s,
    paddingLeft: spacing.m,
    paddingRight: spacing.xxs,
    marginBottom: spacing.s,
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s,
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  logoPlaceholder: {
    backgroundColor: colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  companyName: {
    color: colors.textPrimary,
  },
  startBubble: {
    backgroundColor: colors.background,
    borderRadius: spacing.s,
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.xxs,
    marginRight: spacing.xs,
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  startText: {
    color: colors.textPrimary,
    fontSize: typography.sizes.s,
    letterSpacing: 0.5,
  },
  badge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeNumber: {
    color: colors.textInverse,
    fontSize: 28,
    fontFamily: typography.fonts.inter.bold,
  },
});
