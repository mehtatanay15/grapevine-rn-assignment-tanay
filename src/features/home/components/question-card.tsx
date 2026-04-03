import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';

import { colors, palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { AppText } from '@/components/ui/app-text';
import { ScalePressable } from '@/components/ui/animated-pressable';
import type { Question, QuestionCardState } from '@/features/home/types';

interface QuestionCardProps {
  question: Question;
  state: QuestionCardState;
  showStart?: boolean;
  onPress: (question: Question) => void;
}

const STATE_THEME: Record<
  QuestionCardState,
  { bg: string; border: string; badgeBg: string; badgeText: string; shadowBg: string }
> = {
  active: {
    bg: colors.cardActiveBg,
    border: colors.cardActiveBorder,
    badgeBg: colors.cardActiveBadge,
    badgeText: colors.textInverse,
    shadowBg: colors.cardActiveBorder,
  },
  next: {
    bg: colors.cardNextBg,
    border: colors.cardNextBorder,
    badgeBg: colors.cardNextBadge,
    badgeText: colors.textInverse,
    shadowBg: colors.cardNextBorder,
  },
  locked: {
    bg: colors.cardLockedBg,
    border: colors.cardLockedBorder,
    badgeBg: colors.cardLockedBadge,
    badgeText: colors.textInverse,
    shadowBg: colors.cardLockedShadow,
  },
};

/**
 * Calculates alignment/margin for the winding-path stagger effect.
 * Index 0: left-aligned
 * Index 1: center-right
 * Index 2+: right-aligned
 */
export function getStaggerStyle(index: number) {
  if (index === 0) {
    return {
      alignSelf: 'flex-start' as const,
      marginLeft: spacing.screenPadding,
      marginRight: spacing.giga + spacing.xl,
    };
  }
  if (index === 1) {
    return {
      alignSelf: 'center' as const,
      marginLeft: spacing.xxxl,
      marginRight: spacing.screenPadding,
    };
  }
  // Index 2+ : right-aligned
  return {
    alignSelf: 'flex-end' as const,
    marginLeft: spacing.giga + spacing.m,
    marginRight: spacing.screenPadding,
  };
}

export const QuestionCard = memo(function QuestionCard({
  question,
  state,
  showStart = false,
  onPress,
}: QuestionCardProps) {
  const theme = STATE_THEME[state];

  return (
    <View style={[styles.outerWrapper, getStaggerStyle(question.questionNumber - 1)]}>
      <ScalePressable
        onPress={() => onPress(question)}
        accessibilityLabel={`Question ${question.questionNumber} by ${question.companyName}`}
        scaleValue={0.96}
      >
        {/* 3D shadow layer for the pill */}
        <View
          style={[
            styles.pillShadow,
            { backgroundColor: theme.shadowBg },
          ]}
        />

        {/* Main pill surface */}
        <View style={[styles.pill, { backgroundColor: theme.bg, borderColor: theme.border }]}>
          {/* Company logo placeholder + name */}
          <View style={styles.leftSection}>
            <View style={[styles.logoPlaceholder, { borderColor: theme.border }]}>
              <AppText variant="labelSm" style={styles.logoText}>
                {question.companyName.slice(0, 2).toLowerCase()}
              </AppText>
            </View>
            <AppText variant="labelMd" style={styles.companyName}>
              {question.companyName}
            </AppText>
          </View>

          {/* Number badge */}
          <View style={[styles.badge, { backgroundColor: theme.badgeBg }]}>
            {/* Badge shadow */}
            <View style={[styles.badgeShadow, { backgroundColor: theme.shadowBg }]} />
            <View style={[styles.badgeInner, { backgroundColor: theme.badgeBg }]}>
              <AppText variant="h2" style={[styles.badgeNumber, { color: theme.badgeText }]}>
                {question.questionNumber}
              </AppText>
            </View>
          </View>
        </View>
      </ScalePressable>

      {/* START tag (only for active card) */}
      {showStart && (
        <View style={styles.startTag}>
          <AppText variant="labelMd" style={styles.startText}>
            START
          </AppText>
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  outerWrapper: {
    marginBottom: spacing.m,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pillShadow: {
    position: 'absolute',
    top: spacing.xxs,
    left: 0,
    right: 0,
    bottom: -spacing.xxs,
    borderRadius: spacing.pillRadius,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: spacing.pillRadius,
    borderWidth: 2,
    paddingVertical: spacing.xs,
    paddingLeft: spacing.m,
    paddingRight: spacing.xxs,
    minHeight: 68,
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  logoPlaceholder: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  logoText: {
    color: colors.textSecondary,
    fontSize: typography.sizes.xxs,
    fontFamily: typography.fonts.inter.semiBold,
  },
  companyName: {
    color: colors.textPrimary,
    fontFamily: typography.fonts.inter.semiBold,
  },
  badge: {
    width: spacing.badgeSize,
    height: spacing.badgeSize,
    borderRadius: spacing.badgeSize / 2,
    position: 'relative',
  },
  badgeShadow: {
    position: 'absolute',
    top: spacing.xxs,
    left: 0,
    right: 0,
    bottom: -spacing.xxs,
    borderRadius: spacing.badgeSize / 2,
  },
  badgeInner: {
    width: spacing.badgeSize,
    height: spacing.badgeSize,
    borderRadius: spacing.badgeSize / 2,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  badgeNumber: {
    fontSize: 28,
    fontFamily: typography.fonts.inter.bold,
  },
  startTag: {
    backgroundColor: colors.background,
    borderRadius: spacing.xs,
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.xxs,
    marginLeft: spacing.xs,
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: spacing.xxs,
    elevation: 3,
  },
  startText: {
    color: colors.cardActiveBadge,
    fontSize: typography.sizes.s,
    fontFamily: typography.fonts.inter.bold,
    letterSpacing: 0.5,
  },
});
