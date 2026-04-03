import React, { useCallback, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';

import { colors, palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import type { Question } from '@/features/home/types';

interface QuestionBottomSheetProps {
  question: Question | null;
  bottomSheetRef: React.RefObject<BottomSheet | null>;
  onFeedbackPress: () => void;
  onClose: () => void;
}

export function QuestionBottomSheet({
  question,
  bottomSheetRef,
  onFeedbackPress,
  onClose,
}: QuestionBottomSheetProps) {
  const snapPoints = useMemo(() => ['55%'], []);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose();
      }
    },
    [onClose],
  );

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.4}
      />
    ),
    [],
  );

  if (!question) return null;

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      onChange={handleSheetChanges}
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.sheetBackground}
      handleIndicatorStyle={styles.handle}
    >
      <BottomSheetView style={styles.content}>
        {/* Yellow question card */}
        <View style={styles.questionCard}>
          <AppText variant="h3" style={styles.questionText}>
            {question.text}
          </AppText>

          {/* Asked by + duration row */}
          <View style={styles.metaRow}>
            <View style={styles.askedBySection}>
              <View style={styles.companyLogoSmall}>
                <AppText variant="labelSm" style={styles.logoText}>
                  {question.companyName.slice(0, 2).toLowerCase()}
                </AppText>
              </View>
              <AppText variant="bodyMd" style={styles.askedByText}>
                Asked by {question.companyName}
              </AppText>
            </View>

            <View style={styles.durationBadge}>
              <Ionicons name="time-outline" size={14} color={colors.textSecondary} />
              <AppText variant="caption" style={styles.durationText}>
                {question.durationMinutes} mins
              </AppText>
            </View>
          </View>
        </View>

        {/* Action buttons */}
        <View style={styles.actionsContainer}>
          <Button
            label="FEEDBACK"
            onPress={onFeedbackPress}
            variant="outlined"
            accessibilityLabel="View feedback for this question"
          />
          <Button
            label="🎧  AI VS AI (LISTEN)"
            onPress={() => {}}
            variant="dark"
            accessibilityLabel="Listen to AI vs AI conversation"
          />
        </View>

        {/* Social proof */}
        <View style={styles.socialProof}>
          <View style={styles.socialBorder} />
          <View style={styles.socialContent}>
            <AppText variant="labelSm" style={styles.socialIcon}>🏅</AppText>
            <AppText variant="caption" style={styles.socialText}>
              {question.completedTodayCount.toLocaleString()} users completed Question{' '}
              {question.questionNumber} today
            </AppText>
            <AppText variant="labelSm" style={styles.socialIcon}>🏅</AppText>
          </View>
          <View style={styles.socialBorder} />
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  sheetBackground: {
    backgroundColor: colors.background,
    borderTopLeftRadius: spacing.bottomSheetRadius,
    borderTopRightRadius: spacing.bottomSheetRadius,
  },
  handle: {
    backgroundColor: colors.borderStrong,
    width: spacing.xxxl,
  },
  content: {
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.s,
    gap: spacing.m,
  },
  // ── Question Card ──
  questionCard: {
    backgroundColor: colors.sheetQuestionBg,
    borderRadius: spacing.cardRadius,
    padding: spacing.m,
    gap: spacing.m,
  },
  questionText: {
    color: colors.textPrimary,
    lineHeight: 26,
    fontFamily: typography.fonts.inter.semiBold,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  askedBySection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  companyLogoSmall: {
    width: 24,
    height: 24,
    borderRadius: spacing.s,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  logoText: {
    color: colors.textSecondary,
    fontSize: typography.sizes.xxs,
  },
  askedByText: {
    color: colors.textPrimary,
    fontFamily: typography.fonts.inter.medium,
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxxs,
  },
  durationText: {
    color: colors.textSecondary,
    fontFamily: typography.fonts.inter.medium,
  },
  // ── Actions ──
  actionsContainer: {
    gap: spacing.s,
  },
  // ── Social Proof ──
  socialProof: {
    gap: spacing.xs,
  },
  socialBorder: {
    height: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: colors.cardNextBorder,
  },
  socialContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.xs,
  },
  socialIcon: {
    fontSize: typography.sizes.m,
  },
  socialText: {
    color: colors.textSecondary,
    fontFamily: typography.fonts.inter.medium,
  },
});
