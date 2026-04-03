import React, { useCallback, useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { FlashList } from '@shopify/flash-list';
import BottomSheet from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Haptics from 'expo-haptics';

import { colors, palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { AppText } from '@/components/ui/app-text';
import { SafeScreen } from '@/components/ui/safe-screen';
import { ScalePressable } from '@/components/ui/animated-pressable';
import { QuestionCard } from '@/features/home/components/question-card';
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
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // Toggle the selected question
    setSelectedQuestion((prev) => (prev?.id === question.id ? null : question));
  }, []);

  const handleFeedbackPress = useCallback(() => {
    if (selectedQuestion) {
      navigation.navigate('SessionResult', { questionId: selectedQuestion.id });
    }
  }, [selectedQuestion, navigation]);

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
              showStart={state === 'active'}
              isExpanded={selectedQuestion?.id === q.id}
              onPress={handleQuestionPress}
              onFeedbackPress={handleFeedbackPress}
            />
        );
      }
      return null;
    },
    [handleQuestionPress, selectedQuestion?.id],
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
          extraData={selectedQuestion?.id}
        />
      </View>

      <BottomNav />
    </SafeScreen>
  );
}

/* ─── Header Component ──────────────────────────────────────────────────────── */

function HomeHeader() {
  return (
    <View style={styles.headerContainer}>
      {/* Top bar: Brand + streak + menu */}
      <View style={styles.topBar}>
        <Image
          source={require('../../../../assets/images/logo.png')}
          style={styles.logo}
          contentFit="contain"
          cachePolicy="memory-disk"
        />
        <View style={styles.topBarRight}>
          <View style={styles.streakBadge}>
            <Image 
              source={require('../../../../assets/images/lightning.png')} 
              style={{ width: 14, height: 18 }} 
              contentFit="contain" 
            />
            <AppText variant="labelMd" style={styles.streakCount}>
              8
            </AppText>
          </View>
          <TouchableOpacity
            style={styles.menuButton}
            accessibilityRole="button"
            accessibilityLabel="Open menu"
          >
            <Image 
              source={require('../../../../assets/images/burger.png')} 
              style={{ width: 20, height: 16 }} 
              contentFit="contain" 
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Context card */}
      <View style={styles.contextCard}>
        <Image 
          source={require('../../../../assets/images/Bicep.png')} 
          style={styles.contextIconLeft} 
          contentFit="contain" 
        />
        <View style={styles.contextTextContainer}>
          <AppText style={styles.contextLabel}>
            Practicing Top 50 Questions for
          </AppText>
          <AppText style={styles.contextTitle}>
            Big Tech Companies
          </AppText>
        </View>
        <Image 
          source={require('../../../../assets/images/chevron-down.png')} 
          style={styles.contextIconRight} 
          contentFit="contain" 
        />
      </View>
    </View>
  );
}

/* ─── Social Proof Banner ───────────────────────────────────────────────────── */

function SocialProofBanner() {
  return (
    <View style={styles.socialProofContainer}>
      <View style={styles.socialProofContent}>
         <View style={styles.socialProofBorderTop} />
         <View style={styles.socialProofInnerRow}>
            <Image 
              source={require('../../../../assets/images/flag.png')} 
              style={styles.socialProofFlag} 
              contentFit="contain" 
            />
            <AppText style={styles.socialProofText}>
              2,312 users completed Question 3 today
            </AppText>
            <Image 
              source={require('../../../../assets/images/flag.png')} 
              style={styles.socialProofFlag} 
              contentFit="contain" 
            />
        </View>
        <View style={styles.socialProofBorderBottom} />
      </View>
    </View>
  );
}

/* ─── Bottom Nav ────────────────────────────────────────────────────────────── */

function BottomNav() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.bottomNavContainer}>
      <View style={styles.navCapsule}>
        <TouchableOpacity activeOpacity={0.8}>
          <Image 
            source={require('../../../../assets/images/Home-button.png')} 
            style={styles.navIcon} 
            contentFit="contain" 
            cachePolicy="memory-disk" 
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Settings')}>
          <Image 
            source={require('../../../../assets/images/Settings-button.png')} 
            style={styles.navIcon} 
            contentFit="contain" 
            cachePolicy="memory-disk" 
          />
        </TouchableOpacity>
      </View>
      
      <ScalePressable scaleValue={0.96} accessibilityLabel="Store navigation">
        <View style={styles.storeCapsule}>
          <Image 
            source={require('../../../../assets/images/Store-button.png')} 
            style={styles.navIcon} 
            contentFit="contain" 
            cachePolicy="memory-disk" 
          />
        </View>
      </ScalePressable>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: '#FAFAFA', // Optional, if needed
  },
  listContent: {
    paddingBottom: 140, // Increased to avoid BottomNav overlap
  },
  // ── Header ──
  headerContainer: {
    alignItems: 'center',
    paddingBottom: spacing.l,
  },
  topBar: {
    width: 393,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
    paddingLeft: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: spacing.l,
  },
  logo: {
    width: 94,
    height: 31,
  },
  topBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  streakBadge: {
    width: 49,
    height: 36,
    paddingTop: 8,
    paddingRight: 12,
    paddingBottom: 8,
    paddingLeft: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#57D997', // var(--Green-30)
    borderRadius: 28, // Rounding/XXXL
    borderBottomWidth: 4,
    borderBottomColor: '#13BF69', // var(--Green40)
    gap: 2,
  },
  streakCount: {
    color: '#FFFFFF',
    fontFamily: typography.fonts.inter.semiBold,
    fontSize: 16,
  },
  menuButton: {
    width: 40,
    height: 36,
    paddingTop: 8,
    paddingRight: 12,
    paddingBottom: 8,
    paddingLeft: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F8', // var(--Grey-10)
    borderRadius: 28,
    borderBottomWidth: 4,
    borderBottomColor: '#E5E5EA', // var(--Grey20)
  },
  // ── Context Card ──
  contextCard: {
    width: 361,
    height: 76,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF6D9', // var(--Yellow-10)
    borderRadius: 24,
    padding: 16,
    gap: 12,
    borderBottomWidth: 4,
    borderBottomColor: '#BF9C26', // var(--Yellow50)
  },
  contextIconLeft: {
    width: 32,
    height: 32,
  },
  contextTextContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: 2,
  },
  contextLabel: {
    color: '#48484A', // var(--Grey-60)
    fontFamily: typography.fonts.inter.medium,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
  },
  contextTitle: {
    color: '#1C1C1E', // var(--Grey-80)
    fontFamily: typography.fonts.inter.semiBold,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
  },
  contextIconRight: {
    width: 24,
    height: 24,
  },
  // ── Social Proof ──
  socialProofContainer: {
    alignItems: 'center',
    marginVertical: spacing.s,
  },
  socialProofContent: {
    width: 361,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialProofInnerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 12,
  },
  socialProofBorderTop: {
    width: '100%',
    height: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#BF9C26',
  },
  socialProofBorderBottom: {
    width: '100%',
    height: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#BF9C26',
  },
  socialProofFlag: {
    width: 20,
    height: 20,
  },
  socialProofText: {
    fontFamily: typography.fonts.inter.bold,
    fontSize: 14,
    color: '#BF9C26', // var(--Yellow-50)
    letterSpacing: -0.14,
  },
  // ── Bottom Nav ──
  bottomNavContainer: {
    position: 'absolute',
    bottom: 34,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 16,
    zIndex: 20,
  },
  navCapsule: {
    width: 172,
    height: 68,
    paddingTop: 5,
    paddingRight: 16,
    paddingBottom: 5,
    paddingLeft: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
    borderRadius: 99999,
    borderWidth: 1,
    borderColor: '#EFEFF4',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 4, // Replicating solid shadow 0px 4px 0px 0px #EFEFF4
    borderBottomColor: '#EFEFF4', 
  },
  storeCapsule: {
    width: 68,
    height: 68,
    paddingTop: 6,
    paddingRight: 5,
    paddingBottom: 6,
    paddingLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 99999,
    borderWidth: 1,
    borderColor: '#B2D9FF',
    backgroundColor: '#E5F2FF',
    borderBottomWidth: 4, // Solid shadow 4px
    borderBottomColor: '#B2D9FF',
  },
  navIcon: {
    width: 48, // estimated bounds fitting inside capsule spacing
    height: 48,
  },
});
