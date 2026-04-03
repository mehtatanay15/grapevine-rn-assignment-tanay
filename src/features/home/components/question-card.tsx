import React, { memo } from 'react';
import { View, StyleSheet, Text, Pressable, useWindowDimensions } from 'react-native';
import { Image } from 'expo-image';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { AppText } from '@/components/ui/app-text';
import type { Question, QuestionCardState } from '@/features/home/types';

interface QuestionCardProps {
  question: Question;
  state: QuestionCardState;
  showStart?: boolean;
  isExpanded?: boolean;
  onPress: (question: Question) => void;
  onFeedbackPress?: () => void;
}

const COMPANY_LOGOS: Record<string, any> = {
  phonepe: require('../../../../assets/images/Companies/phonepe.png'),
  amazon: require('../../../../assets/images/Companies/amazon.png'),
  google: require('../../../../assets/images/Companies/google.png'),
  microsoft: require('../../../../assets/images/Companies/microsoft.png'),
  facebook: require('../../../../assets/images/Companies/facebook.png'),
};

const THEME_MAP: Record<
  QuestionCardState,
  { baseBg: string; rightBg: string; shadowBg: string }
> = {
  active: {
    baseBg: '#D8F7C2',
    rightBg: '#79D634',
    shadowBg: '#00AA2B',
  },
  next: {
    baseBg: '#FFF0BF',
    rightBg: '#FFD033',
    shadowBg: '#C19400',
  },
  locked: {
    baseBg: '#EFEFF4',
    rightBg: '#D1D1D6',
    shadowBg: '#8E8E93',
  },
};

const BASE_W = 206;
const BASE_H = 73;
const RIGHT_W = 74;
const SHADOW_H = 8;
const PILL_RADIUS = 30;

function OutlinedNumber({ text }: { text: string }) {
  const outlineColor = 'rgba(0,0,0,0.6)';
  const baseStyle = {
    fontFamily: typography.fonts.inter.bold,
    fontSize: 36,
    lineHeight: 36,
    includeFontPadding: false,
    textAlign: 'center' as const,
  };

  return (
    <View style={styles.outlinedNumberContainer}>
      {/* 
        Using transforms instead of absolute positional offsets guarantees sub-pixel perfectly centered overlay
        prevents any dual rendering or fuzzy artifacting issues on Android
       */}
      <Text style={[baseStyle, { position: 'absolute', transform: [{ translateX: -1.5 }, { translateY: -1.5 }], color: outlineColor }]}>{text}</Text>
      <Text style={[baseStyle, { position: 'absolute', transform: [{ translateX: 1.5 }, { translateY: -1.5 }], color: outlineColor }]}>{text}</Text>
      <Text style={[baseStyle, { position: 'absolute', transform: [{ translateX: -1.5 }, { translateY: 1.5 }], color: outlineColor }]}>{text}</Text>
      <Text style={[baseStyle, { position: 'absolute', transform: [{ translateX: 1.5 }, { translateY: 1.5 }], color: outlineColor }]}>{text}</Text>
      <Text style={[baseStyle, { position: 'absolute', transform: [{ translateX: -1.5 }, { translateY: 0 }], color: outlineColor }]}>{text}</Text>
      <Text style={[baseStyle, { position: 'absolute', transform: [{ translateX: 1.5 }, { translateY: 0 }], color: outlineColor }]}>{text}</Text>
      <Text style={[baseStyle, { position: 'absolute', transform: [{ translateX: 0 }, { translateY: -1.5 }], color: outlineColor }]}>{text}</Text>
      <Text style={[baseStyle, { position: 'absolute', transform: [{ translateX: 0 }, { translateY: 1.5 }], color: outlineColor }]}>{text}</Text>
      <Text style={[baseStyle, { position: 'absolute', color: '#FFFFFF' }]}>{text}</Text>
    </View>
  );
}

export function getStaggerStyle(index: number) {
  const staggerMargins = [48, 80, 120, 160, 120, 80, 40, 80, 120, 160];
  const margin = staggerMargins[index % staggerMargins.length];
  return { alignSelf: 'flex-start' as const, marginLeft: margin };
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function ActionButton({ title, titleColor, bg, shadowBg, icon, onPress }: any) {
  const pressValue = useSharedValue(0);
  const pressStyle = useAnimatedStyle(() => ({ transform: [{ translateY: pressValue.value }] }));
  return (
    <View style={styles.actionBtnWrapper}>
      <View style={[styles.actionBtnShadow, { backgroundColor: shadowBg }]} />
      <AnimatedPressable
        onPressIn={() => { pressValue.value = withSpring(3, { damping: 18, stiffness: 380, mass: 0.6 }); }}
        onPressOut={() => { pressValue.value = withSpring(0, { damping: 14, stiffness: 280, mass: 0.6 }); }}
        onPress={onPress}
        style={[styles.actionBtnSurface, { backgroundColor: bg }, pressStyle]}
      >
        <View style={styles.actionRow}>
          {icon && <Image source={icon} style={{ width: 18, height: 18 }} tintColor={titleColor} />}
          <Text style={[styles.actionBtnTitle, { color: titleColor }]}>{title}</Text>
        </View>
      </AnimatedPressable>
    </View>
  );
}

export const QuestionCard = memo(function QuestionCard({
  question,
  state,
  showStart = false,
  isExpanded = false,
  onPress,
  onFeedbackPress,
}: QuestionCardProps) {
  const theme = THEME_MAP[state];
  const pressValue = useSharedValue(0);

  const animatedSurfaceStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: pressValue.value }],
  }));

  const handlePressIn = () => {
    pressValue.value = withSpring(SHADOW_H, { damping: 18, stiffness: 380, mass: 0.6 });
  };
  const handlePressOut = () => {
    pressValue.value = withSpring(0, { damping: 14, stiffness: 280, mass: 0.6 });
  };
  const handlePress = () => onPress(question);

  const stagger = getStaggerStyle(question.questionNumber - 1);
  const marginL = stagger.marginLeft;
  // Center of badge = Margin + Base Width - half of Right Width 
  const badgeCenterOffset = marginL + BASE_W - (RIGHT_W / 2);

  return (
    <View style={styles.outerWrapper}>
      {/* Container big enough to hold button + shadow */}
      <View style={[styles.layoutConstraints, stagger]}>
        
        {/* Shadow block */}
        <View style={[styles.shadowBlock, { backgroundColor: theme.shadowBg }]} />
        
        {/* Animated surface */}
        <AnimatedPressable
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={handlePress}
          style={[styles.surfaceBlock, { backgroundColor: theme.baseBg }, animatedSurfaceStyle]}
        >
          {/* Complete base overlay mask only if not locked */}
          {state !== 'locked' && (
            <Image 
              source={require('../../../../assets/images/Button/base-mask.png')} 
              style={[StyleSheet.absoluteFillObject, { top: 2, left: 2, bottom: 2, right: 2, borderRadius: PILL_RADIUS - 2 }]} 
              contentFit="cover" 
              cachePolicy="memory-disk"
            />
          )}

          {/* Left section items */}
          <View style={styles.leftContent}>
            <AppText style={styles.companyName}>
              {question.companyName}
            </AppText>
            {/* Logo from assets or placeholder */}
            <View style={styles.logoCircle}>
              {COMPANY_LOGOS[question.companyId] ? (
                <Image 
                  source={COMPANY_LOGOS[question.companyId]} 
                  style={{ width: 16, height: 16 }} 
                  contentFit="contain" 
                  cachePolicy="memory-disk" 
                />
              ) : (
                <AppText style={styles.logoInitial}>
                  {question.companyName.charAt(0).toUpperCase()}
                </AppText>
              )}
            </View>
          </View>

          {/* Right section container */}
          <View style={[styles.rightContainer, { backgroundColor: theme.rightBg }]}>
            {state !== 'locked' && (
              <Image 
                source={require('../../../../assets/images/Button/mask-group.png')} 
                style={[StyleSheet.absoluteFillObject, { top: 2, left: 0, bottom: 2, right: 2, borderRadius: PILL_RADIUS - 2 }]} 
                contentFit="cover" 
                cachePolicy="memory-disk"
              />
            )}
            {/* The Number */}
            <View style={styles.numberCenter}>
              <OutlinedNumber text={String(question.questionNumber)} />
            </View>
          </View>
          
        </AnimatedPressable>

        {/* Start tooltip relative to layout wrapper - placed outside surface so it doesn't get masked */}
        {showStart && !isExpanded && (
          <View style={styles.startTooltipWrapper}>
            <View style={styles.startTag}>
              <AppText style={styles.startText}>START</AppText>
            </View>
            <View style={styles.startTooltipArrow} />
          </View>
        )}
      </View>

      {/* Expandable Flow */}
      {isExpanded && (
        <View style={styles.expandedWrapper}>
          <View style={[styles.arrowUp, { left: badgeCenterOffset - 10 }]} />
          <View style={styles.expandedBox}>
            <AppText style={styles.dialogText}>{question.text}</AppText>
            
            <View style={styles.dialogMetaRow}>
              <AppText style={styles.dialogMetaText}>Asked by {question.companyName}</AppText>
              <View style={styles.dialogTimeRow}>
                <Image source={require('../../../../assets/images/stopwatch.png')} style={{width: 16, height: 16}} />
                <AppText style={styles.dialogMetaText}>{question.durationMinutes} mins</AppText>
              </View>
            </View>

            <View style={{ gap: 8, marginTop: 4 }}>
              <ActionButton 
                title="FEEDBACK" 
                bg="#FFFFFF" 
                titleColor="#13BF69" 
                shadowBg="rgba(0, 0, 0, 0.2)"
                onPress={onFeedbackPress}
              />
              <ActionButton 
                title="AI VS AI (LISTEN)" 
                bg="#806B26" 
                titleColor="#FFFFFF" 
                shadowBg="#CCA814" 
                icon={require('../../../../assets/images/headphones.png')} 
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  outerWrapper: {
    marginBottom: spacing.m,
  },
  layoutConstraints: {
    width: BASE_W,
    height: BASE_H + SHADOW_H,
    position: 'relative',
  },
  shadowBlock: {
    position: 'absolute',
    top: SHADOW_H,
    left: 0,
    width: BASE_W,
    height: BASE_H,
    borderRadius: PILL_RADIUS,
  },
  surfaceBlock: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: BASE_W,
    height: BASE_H,
    borderRadius: PILL_RADIUS,
    overflow: 'hidden',
  },
  leftContent: {
    position: 'absolute',
    left: 24,
    top: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  companyName: {
    fontFamily: typography.fonts.inter.semiBold,
    fontSize: 16,
    lineHeight: 24,
    color: '#0B0B0D',
  },
  logoCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoInitial: {
    fontSize: 11,
    fontFamily: typography.fonts.inter.bold,
    color: '#48484A',
  },
  rightContainer: {
    position: 'absolute',
    right: 0,
    top: 0, 
    width: RIGHT_W,
    height: RIGHT_W,
    borderRadius: PILL_RADIUS,
    overflow: 'hidden',
    borderLeftWidth: 1.5,
    borderLeftColor: 'rgba(255, 255, 255, 0.4)', 
  },
  numberCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlinedNumberContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    paddingTop: 8,
  },
  startTooltipWrapper: {
    position: 'absolute',
    top: -46,
    right: 20,
    alignItems: 'center',
    zIndex: 10,
  },
  startTag: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderColor: '#E5E5EA',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startText: {
    color: '#13BF69',
    fontSize: 15,
    fontFamily: typography.fonts.inter.bold,
    letterSpacing: 0.51,
  },
  startTooltipArrow: {
    width: 14,
    height: 14,
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E5EA',
    borderRightWidth: 2,
    borderBottomWidth: 2,
    transform: [{ rotate: '45deg' }],
    marginTop: -8.5,
  },
  // Expanded Dialog styles
  expandedWrapper: {
    width: '100%',
    paddingHorizontal: 24,
    marginTop: 6,
    position: 'relative',
    zIndex: -1,
  },
  arrowUp: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderBottomWidth: 14,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FFD033',
    position: 'absolute',
    top: -10, 
  },
  expandedBox: {
    backgroundColor: '#FFD033',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    gap: 16,
  },
  dialogText: {
    fontFamily: typography.fonts.inter.bold,
    fontSize: 16,
    color: '#1C1C1E',
    lineHeight: 22,
  },
  dialogMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dialogMetaText: {
    fontFamily: typography.fonts.inter.semiBold,
    fontSize: 14,
    color: '#48484A',
  },
  dialogTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionBtnWrapper: {
    height: 44,
    position: 'relative',
    width: '100%',
  },
  actionBtnShadow: {
    position: 'absolute',
    top: 3, left: 0, right: 0, height: 41,
    borderRadius: 12,
  },
  actionBtnSurface: {
    position: 'absolute',
    top: 0, left: 0, right: 0, height: 41,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  actionBtnTitle: {
    fontFamily: typography.fonts.inter.bold,
    fontSize: 15,
    textTransform: 'uppercase',
    letterSpacing: 0.51,
  },
});
