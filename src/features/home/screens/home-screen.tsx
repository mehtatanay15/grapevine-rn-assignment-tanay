import React, { useCallback, useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, Feather } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';

import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { AppText } from '@/components/ui/app-text';
import { SafeScreen } from '@/components/ui/safe-screen';
import { QuestionCard } from '@/features/home/components/question-card';
import { QuestionBottomSheet } from '@/features/home/components/question-bottom-sheet';
import type { Question, QuestionCardState } from '@/features/home/types';
import type { MainTabScreenProps } from '@/navigation/types';

import questionsData from '@/mock-data/questions.json';

type Props = MainTabScreenProps<'Home'>;

const SOCIAL_PROOF_INDEX = 2; // Show banner after card index 2 (before card 3)

function getCardState(index: number, activeIndex: number): QuestionCardState {
  if (index < activeIndex) return 'locked';
  if (index === activeIndex) return 'active';
  if (index === activeIndex + 1) return 'next';
  return 'locked';
}

type ListItem =
  | { type: 'question'; question: Question; idx: number }
  | { type: 'socialProof'; count: number; questionNumber: number };

export function HomeScreen({ navigation }: Props) {
  const [isPracticeExpanded, setIsPracticeExpanded] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const questions: Question[] = questionsData as Question[];
  const ACTIVE_INDEX = 0; // first card is active

  // Build list items (inject social proof after SOCIAL_PROOF_INDEX)
  const listItems = React.useMemo<ListItem[]>(() => {
    const items: ListItem[] = [];
    questions.forEach((q, idx) => {
      items.push({ type: 'question', question: q, idx });
      if (idx === SOCIAL_PROOF_INDEX - 1) {
        items.push({
          type: 'socialProof',
          count: questions[SOCIAL_PROOF_INDEX].completedTodayCount,
          questionNumber: questions[SOCIAL_PROOF_INDEX].questionNumber,
        });
      }
    });
    return items;
  }, [questions]);

  const handleCardPress = useCallback((question: Question) => {
    setSelectedQuestion(question);
    bottomSheetRef.current?.expand();
  }, []);

  const handleClose = useCallback(() => {
    bottomSheetRef.current?.close();
    setSelectedQuestion(null);
  }, []);

  const handleFeedbackPress = useCallback(() => {
    bottomSheetRef.current?.close();
    if (selectedQuestion) {
      navigation.navigate('SessionResult', { questionId: selectedQuestion.id });
    }
  }, [navigation, selectedQuestion]);

  const renderItem = useCallback(
    ({ item }: { item: ListItem }) => {
      if (item.type === 'socialProof') {
        return (
          <View style={styles.socialProofBanner}>
            <AppText variant="caption" style={styles.socialProofText}>
              🏅 {item.count.toLocaleString()} users completed Question {item.questionNumber} today 🏅
            </AppText>
          </View>
        );
      }
      const cardState = getCardState(item.idx, ACTIVE_INDEX);
      return (
        <QuestionCard
          question={item.question}
          state={cardState}
          showStart={item.idx === ACTIVE_INDEX}
          onPress={handleCardPress}
        />
      );
    },
    [handleCardPress],
  );

  const keyExtractor = useCallback((item: ListItem) => {
    if (item.type === 'question') return item.question.id;
    return `social-proof-${item.questionNumber}`;
  }, []);

  return (
    <SafeScreen>
      <StatusBar style="dark" />

      {/* ── Header ── */}
      <View style={styles.header}>
        <AppText variant="h2" style={styles.headerLogo}>
          Ready!
        </AppText>
        <View style={styles.headerRight}>
          {/* Notification badge */}
          <TouchableOpacity
            style={styles.notificationBadge}
            accessibilityRole="button"
            accessibilityLabel="Notifications, 8 unread"
          >
            <Ionicons name="flash" size={16} color={colors.textInverse} />
            <AppText variant="labelSm" style={styles.badgeCount}>
              8
            </AppText>
          </TouchableOpacity>
          {/* Hamburger */}
          <TouchableOpacity
            style={styles.hamburger}
            accessibilityRole="button"
            accessibilityLabel="Open menu"
          >
            <Feather name="menu" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Practice Set Card ── */}
      <TouchableOpacity
        style={styles.practiceCard}
        onPress={() => setIsPracticeExpanded(p => !p)}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel="Practice set: Top 50 Questions for Big Tech Companies"
      >
        <AppText variant="caption" style={styles.practiceLabel}>
          Practicing Top 50 Questions for
        </AppText>
        <View style={styles.practiceRow}>
          <AppText variant="h3" style={styles.practiceTitle}>
            💪 Big Tech Companies
          </AppText>
          <Ionicons
            name={isPracticeExpanded ? 'chevron-up' : 'chevron-down'}
            size={20}
            color={colors.textSecondary}
          />
        </View>
      </TouchableOpacity>

      {/* ── Question List ── */}
      <View style={styles.listContainer}>
        <FlashList
          data={listItems}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* ── Bottom Sheet ── */}
      <QuestionBottomSheet
        question={selectedQuestion}
        bottomSheetRef={bottomSheetRef}
        onFeedbackPress={handleFeedbackPress}
        onClose={handleClose}
      />
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.s,
  },
  headerLogo: {
    color: colors.primary,
    fontSize: 28,
    fontFamily: typography.fonts.inter.bold,
    letterSpacing: -0.5,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s,
  },
  notificationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.success,
    borderRadius: 20,
    paddingHorizontal: spacing.s,
    paddingVertical: spacing.xxs,
    gap: spacing.xxxs,
  },
  badgeCount: {
    color: colors.textInverse,
  },
  hamburger: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  practiceCard: {
    marginHorizontal: spacing.screenPadding,
    marginBottom: spacing.m,
    backgroundColor: '#FFF9E6',
    borderRadius: spacing.cardRadius,
    borderWidth: 1.5,
    borderColor: '#E8C84A',
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
  },
  practiceLabel: {
    color: colors.textSecondary,
    marginBottom: spacing.xxxs,
  },
  practiceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  practiceTitle: {
    color: colors.textPrimary,
    flex: 1,
    fontSize: typography.sizes.m,
    fontFamily: typography.fonts.inter.bold,
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: spacing.xl,
  },
  socialProofBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.s,
    marginVertical: spacing.xs,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  socialProofText: {
    color: colors.primary,
    fontFamily: typography.fonts.inter.semiBold,
  },
});
