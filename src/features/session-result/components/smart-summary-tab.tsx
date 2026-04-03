import React, { memo } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { AppText } from '@/components/ui/app-text';
import type { SmartSummary } from '@/features/session-result/types';

interface SmartSummaryTabProps {
  data: SmartSummary;
}

export const SmartSummaryTab = memo(function SmartSummaryTab({ data }: SmartSummaryTabProps) {
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
      <AppText variant="h3" style={styles.sectionTitle}>
        {title}
      </AppText>
      <View style={styles.bulletList}>
        {items.map((item, index) => (
          <View key={index} style={styles.bulletRow}>
            <AppText variant="bodyMd" style={styles.bulletSymbol}>
              ✦
            </AppText>
            <AppText variant="bodyMd" style={styles.bulletText}>
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
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.l,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: typography.sizes.l,
    fontFamily: typography.fonts.inter.bold,
    marginBottom: spacing.m,
  },
  bulletList: {
    gap: spacing.m,
  },
  bulletRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    alignItems: 'flex-start',
  },
  bulletSymbol: {
    color: colors.textPrimary,
    fontSize: typography.sizes.xs,
    marginTop: spacing.xxs,
    lineHeight: 20,
  },
  bulletText: {
    flex: 1,
    color: colors.textPrimary,
    lineHeight: 22,
  },
  sectionSpacer: {
    height: spacing.xl,
  },
  bottomSpacer: {
    height: spacing.xxxl,
  },
});
