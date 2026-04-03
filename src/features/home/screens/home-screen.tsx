import React, { useCallback, useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FlashList } from '@shopify/flash-list';
import BottomSheet from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { colors, palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { AppText } from '@/components/ui/app-text';
import { SafeScreen } from '@/components/ui/safe-screen';
import { QuestionCard } from '@/features/home/components/question-card';
import { QuestionBottomSheet } from '@/features/home/components/question-bottom-sheet';
import type { Question, QuestionCardState } from '@/features/home/types';
import type { RootStackParamList } from '@/navigation/types';

import questionsData from '@/mock-data/questions.json';

type ListItem =
  | { type: 'header' }
  | { type: 'question'; data: Question }
  | { type: 'socialProof' };

function getQuestionState(index: number): QuestionCardState {
  if (index === 0) return 'active';
  if (index === 1) return 'next';
  return 'locked';
}

export function HomeScreen() {
  const questions = questionsData as Question[];
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

  // Build list items: header + questions + social proof after Q3
  const listItems: ListItem[] = React.useMemo(() => {
    const items: ListItem[] = [{ type: 'header' }];
    questions.forEach((q, i) => {
      items.push({ type: 'question', data: q });
      // Insert social proof after question 3
      if (i === 2) {
        items.push({ type: 'socialProof' });
      }
    });
    return items;
  }, [questions]);

  const handleQuestionPress = useCallback((question: Question) => {
    setSelectedQuestion(question);
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  const handleFeedbackPress = useCallback(() => {
    bottomSheetRef.current?.close();
    if (selectedQuestion) {
      navigation.navigate('SessionResult', { questionId: selectedQuestion.id });
    }
  }, [selectedQuestion, navigation]);

  const handleBottomSheetClose = useCallback(() => {
    setSelectedQuestion(null);
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: ListItem }) => {
      if (item.type === 'header') {
        return <HomeHeader />;
      }
      if (item.type === 'socialProof') {
        return <SocialProofBanner />;
      }
      if (item.type === 'question') {
        const q = item.data;
        const state = getQuestionState(q.questionNumber - 1);
        return (
          <QuestionCard
            question={q}
            state={state}
            showStart={q.questionNumber === 1}
            onPress={handleQuestionPress}
          />
        );
      }
      return null;
    },
    [handleQuestionPress],
  );

  const keyExtractor = useCallback(
    (item: ListItem, index: number) => {
      if (item.type === 'header') return 'header';
      if (item.type === 'socialProof') return 'social-proof';
      if (item.type === 'question') return item.data.id;
      return `item-${index}`;
    },
    [],
  );

  return (
    <SafeScreen>
      <StatusBar style="dark" />

      <View style={styles.listContainer}>
        <FlashList
          data={listItems}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={100}
        />
      </View>

      <QuestionBottomSheet
        question={selectedQuestion}
        bottomSheetRef={bottomSheetRef}
        onFeedbackPress={handleFeedbackPress}
        onClose={handleBottomSheetClose}
      />
    </SafeScreen>
  );
}

/* ─── Header Component ──────────────────────────────────────────────────────── */

function HomeHeader() {
  return (
    <View style={styles.headerContainer}>
      {/* Top bar: Brand + streak + menu */}
      <View style={styles.topBar}>
        <AppText variant="h2" style={styles.brandText}>
          Ready!
        </AppText>
        <View style={styles.topBarRight}>
          <View style={styles.streakBadge}>
            <AppText variant="labelSm" style={styles.streakIcon}>
              ⚡
            </AppText>
            <AppText variant="labelMd" style={styles.streakCount}>
              8
            </AppText>
          </View>
          <TouchableOpacity
            style={styles.menuButton}
            accessibilityRole="button"
            accessibilityLabel="Open menu"
          >
            <Ionicons name="menu" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Context card */}
      <View style={styles.contextCard}>
        <AppText variant="h3" style={styles.contextEmoji}>
          💪
        </AppText>
        <View style={styles.contextTextContainer}>
          <AppText variant="bodySm" style={styles.contextLabel}>
            Practicing Top 50 Questions for
          </AppText>
          <AppText variant="labelLg" style={styles.contextTitle}>
            Big Tech Companies
          </AppText>
        </View>
        <Ionicons name="chevron-down" size={20} color={colors.textSecondary} />
      </View>
    </View>
  );
}

/* ─── Social Proof Banner ───────────────────────────────────────────────────── */

function SocialProofBanner() {
  return (
    <View style={styles.socialProofContainer}>
      <View style={styles.socialProofBorder} />
      <View style={styles.socialProofContent}>
        <AppText variant="labelSm" style={styles.socialProofIcon}>
          🏅
        </AppText>
        <AppText variant="caption" style={styles.socialProofText}>
          2,312 users completed Question 3 today
        </AppText>
        <AppText variant="labelSm" style={styles.socialProofIcon}>
          🏅
        </AppText>
      </View>
      <View style={styles.socialProofBorder} />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingBottom: spacing.xxl,
  },
  // ── Header ──
  headerContainer: {
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: spacing.l,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.m,
  },
  brandText: {
    color: colors.primary,
    fontFamily: typography.fonts.inter.bold,
    fontSize: typography.sizes.xxl,
  },
  topBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.streakBadgeBg,
    borderRadius: spacing.l,
    paddingHorizontal: spacing.s,
    paddingVertical: spacing.xxs,
    gap: spacing.xxxs,
  },
  streakIcon: {
    fontSize: typography.sizes.s,
  },
  streakCount: {
    color: colors.streakBadgeText,
    fontFamily: typography.fonts.inter.bold,
  },
  menuButton: {
    width: spacing.xxxl,
    height: spacing.xxxl,
    borderRadius: spacing.l,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // ── Context Card ──
  contextCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardNextBg,
    borderRadius: spacing.cardRadius,
    padding: spacing.m,
    gap: spacing.s,
    borderWidth: 1,
    borderColor: colors.cardNextBorder,
  },
  contextEmoji: {
    fontSize: 28,
  },
  contextTextContainer: {
    flex: 1,
  },
  contextLabel: {
    color: colors.textSecondary,
    fontSize: typography.sizes.xs,
  },
  contextTitle: {
    color: colors.textPrimary,
    fontFamily: typography.fonts.inter.bold,
  },
  // ── Social Proof ──
  socialProofContainer: {
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.m,
    gap: spacing.xs,
  },
  socialProofBorder: {
    height: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: colors.cardNextBorder,
  },
  socialProofContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.xs,
  },
  socialProofIcon: {
    fontSize: typography.sizes.m,
  },
  socialProofText: {
    color: colors.textSecondary,
    fontFamily: typography.fonts.inter.medium,
  },
});
