import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Image } from 'expo-image';

import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { AppText } from '@/components/ui/app-text';
import type { SmartSummary } from '@/features/session-result/types';

interface SmartSummaryTabProps {
  data: SmartSummary;
}

export const SmartSummaryTab = React.memo(function SmartSummaryTab({ data }: SmartSummaryTabProps) {
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* What worked well */}
      <Section title="What worked well" items={data.whatWorkedWell} />

      <View style={styles.sectionSpacer} />

      {/* Overall takeaways */}
      <Section title="Overall takeaways" items={data.overallTakeaways} />

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
});

interface SectionProps {
  title: string;
  items: string[];
}

function Section({ title, items }: SectionProps) {
  return (
    <View accessibilityRole="summary">
      <AppText style={styles.sectionTitle}>
        {title}
      </AppText>
      <View style={styles.bulletList}>
        {items.map((item, index) => (
          <View key={index} style={styles.bulletRow}>
            <Image 
               source={require('../../../../assets/images/bullet-point.png')} 
               style={styles.bulletSymbol} 
               contentFit="contain" 
            />
            <AppText style={styles.bulletText}>
              {item}
            </AppText>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  sectionTitle: {
    color: '#1C1C1E',
    fontFamily: typography.fonts.inter.semiBold,
    fontSize: 16,
    lineHeight: 16,
    marginBottom: 16,
  },
  bulletList: {
    gap: 12,
  },
  bulletRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  bulletSymbol: {
    width: 6,
    height: 6,
    marginTop: 8,
  },
  bulletText: {
    flex: 1,
    color: '#48484A', // var(--Surface-70)
    fontFamily: typography.fonts.inter.semiBold,
    fontSize: 16,
    lineHeight: 22,
  },
  sectionSpacer: {
    height: spacing.xl,
  },
  bottomSpacer: {
    height: spacing.xxxl,
  },
});
