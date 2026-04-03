import React, { useCallback, useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '@/theme/colors';
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
  const snapPoints = useMemo(() => ['60%', '80%'], []);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose();
      }
    },
    [onClose],
  );

  if (!question) return null;

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      onChange={handleSheetChanges}
      backgroundStyle={styles.sheetBackground}
      handleIndicatorStyle={styles.handle}
    >
      <BottomSheetView style={styles.content}>
        {/* Close button */}
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Close question detail"
        >
          <Ionicons name="close" size={20} color={colors.textPrimary} />
        </TouchableOpacity>

        {/* Question card (yellow pill) */}
        <View style={styles.questionCard}>
          <AppText variant="h3" style={styles.questionText}>
            {question.text}
          </AppText>

          {/* Asked by row */}
          <View style={styles.askedByRow}>
            {question.companyLogoUrl ? (
              <Image
                source={{ uri: question.companyLogoUrl }}
                style={styles.companyLogo}
                cachePolicy="memory-disk"
                contentFit="contain"
                accessibilityLabel={`${question.companyName} logo`}
              />
            ) : (
              <View style={[styles.companyLogo, styles.logoPlaceholder]}>
                <AppText variant="labelSm" style={{ color: colors.textSecondary }}>
                  {question.companyName.slice(0, 2).toUpperCase()}
                </AppText>
              </View>
            )}
            <AppText variant="bodyMd" style={styles.askedByText}>
              Asked by {question.companyName}
            </AppText>
            <View style={styles.durationBadge}>
              <Ionicons name="timer-outline" size={14} color={colors.textSecondary} />
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
            style={styles.actionButton}
            accessibilityLabel="View feedback for this question"
          />
          <Button
            label="🎧  AI VS AI (LISTEN)"
            onPress={() => {}}
            variant="dark"
            style={styles.actionButton}
            accessibilityLabel="Listen to AI vs AI conversation"
          />
        </View>

        {/* Social proof */}
        <View style={styles.socialProof}>
          <AppText variant="caption" style={styles.socialProofText}>
            🏅 {question.completedTodayCount.toLocaleString()} users completed Question{' '}
            {question.questionNumber} today 🏅
          </AppText>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  sheetBackground: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  handle: {
    backgroundColor: colors.border,
    width: 40,
  },
  content: {
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.m,
    gap: spacing.m,
  },
  closeButton: {
    alignSelf: 'flex-end',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionCard: {
    backgroundColor: '#F5C518',
    borderRadius: spacing.cardRadius,
    padding: spacing.m,
    gap: spacing.m,
  },
  questionText: {
    color: colors.textPrimary,
    lineHeight: 26,
  },
  askedByRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  companyLogo: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  logoPlaceholder: {
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  askedByText: {
    flex: 1,
    color: colors.textPrimary,
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxxs,
    backgroundColor: 'rgba(0,0,0,0.08)',
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xxxs,
    borderRadius: spacing.xs,
  },
  durationText: {
    color: colors.textSecondary,
  },
  actionsContainer: {
    gap: spacing.s,
  },
  actionButton: {
    width: '100%',
  },
  socialProof: {
    alignItems: 'center',
    paddingVertical: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    borderStyle: 'dashed',
  },
  socialProofText: {
    color: colors.primary,
    fontFamily: typography.fonts.inter.semiBold,
  },
});
