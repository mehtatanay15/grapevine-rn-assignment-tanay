import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import { colors, palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { SafeScreen } from '@/components/ui/safe-screen';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { MainTabScreenProps, RootStackParamList } from '@/navigation/types';
import type { User } from '@/features/settings/types';

import userData from '@/mock-data/user.json';

type Props = MainTabScreenProps<'Settings'>;

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  value?: string;
  onPress: () => void;
  isDestructive?: boolean;
}

function MenuItem({ icon, label, value, onPress, isDestructive = false }: MenuItemProps) {
  return (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <View style={styles.menuIconContainer}>{icon}</View>
      <View style={styles.menuTextContainer}>
        <AppText
          variant="bodyMd"
          style={[styles.menuLabel, isDestructive && styles.menuLabelDestructive]}
        >
          {label}
        </AppText>
        {value && (
          <AppText variant="caption" style={styles.menuValue}>
            {value}
          </AppText>
        )}
      </View>
      {!isDestructive && (
        <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />
      )}
    </TouchableOpacity>
  );
}

export function SettingsScreen({ navigation }: Props) {
  const user: User = userData as User;
  const rootNav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogOut = () => {
    rootNav.reset({ index: 0, routes: [{ name: 'Auth' }] });
  };

  return (
    <SafeScreen>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <View style={styles.pageHeader}>
          <AppText variant="h2">Settings</AppText>
        </View>

        {/* ── Trial Banner ── */}
        <View style={styles.trialBanner}>
          <View style={styles.trialContent}>
            <AppText variant="h3" style={styles.trialTitle}>
              3 days free trial
            </AppText>
            <AppText variant="h2" style={styles.trialPrice}>
              for ₹1
            </AppText>
            <TouchableOpacity
              style={styles.trialButton}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Start free trial"
            >
              <AppText variant="labelMd" style={styles.trialButtonText}>
                Try Now
              </AppText>
            </TouchableOpacity>
          </View>
          <View style={styles.trialIllustration}>
            <AppText style={styles.trialEmoji}>🎯</AppText>
          </View>
        </View>

        {/* ── Profile card ── */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <AppText variant="h2" style={styles.avatarEmoji}>
              🧑
            </AppText>
          </View>
          <View style={styles.profileInfo}>
            <AppText variant="h3" style={styles.userName}>
              {user.name}
            </AppText>
            <AppText variant="bodyMd" style={styles.userPhone}>
              {user.phone}
            </AppText>
          </View>
        </View>

        {/* ── Menu section ── */}
        <View style={styles.menuSection}>
          <MenuItem
            icon={<Ionicons name="sparkles-outline" size={20} color={colors.primary} />}
            label="New update available"
            onPress={() => {}}
          />
          <View style={styles.menuDivider} />
          <MenuItem
            icon={<Ionicons name="call-outline" size={20} color={colors.textSecondary} />}
            label="Phone number"
            value={user.phone}
            onPress={() => {}}
          />
          <View style={styles.menuDivider} />
          <MenuItem
            icon={<Ionicons name="calendar-outline" size={20} color={colors.textSecondary} />}
            label="Learning since"
            value="April 2026"
            onPress={() => {}}
          />
          <View style={styles.menuDivider} />
          <MenuItem
            icon={<Ionicons name="chatbubble-outline" size={20} color={colors.textSecondary} />}
            label="Chat with us"
            onPress={() => {}}
          />
          <View style={styles.menuDivider} />
          <MenuItem
            icon={
              <MaterialCommunityIcons
                name="share-variant-outline"
                size={20}
                color={colors.textSecondary}
              />
            }
            label="Share the app"
            onPress={() => {}}
          />
        </View>

        {/* ── Log Out ── */}
        <View style={styles.logoutSection}>
          <MenuItem
            icon={<Ionicons name="log-out-outline" size={20} color={colors.error} />}
            label="Log Out"
            onPress={handleLogOut}
            isDestructive
          />
        </View>

        {/* App version */}
        <AppText variant="caption" style={styles.versionText}>
          Ready! v1.0.0
        </AppText>
      </ScrollView>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: spacing.xxxl,
  },
  pageHeader: {
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.m,
    paddingBottom: spacing.m,
  },
  // ── Trial Banner ──
  trialBanner: {
    marginHorizontal: spacing.screenPadding,
    marginBottom: spacing.m,
    backgroundColor: colors.primary,
    borderRadius: spacing.cardRadius,
    padding: spacing.l,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  trialContent: {
    flex: 1,
    gap: spacing.xxs,
  },
  trialTitle: {
    color: colors.textInverse,
    fontFamily: typography.fonts.inter.semiBold,
  },
  trialPrice: {
    color: colors.textInverse,
    fontFamily: typography.fonts.inter.bold,
    marginBottom: spacing.s,
  },
  trialButton: {
    backgroundColor: colors.background,
    borderRadius: spacing.buttonRadius,
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.xs,
    alignSelf: 'flex-start',
  },
  trialButtonText: {
    color: colors.primary,
    fontFamily: typography.fonts.inter.bold,
  },
  trialIllustration: {
    width: 80,
    height: 80,
    borderRadius: spacing.xxxl,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trialEmoji: {
    fontSize: 40,
  },
  // ── Profile ──
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.screenPadding,
    marginBottom: spacing.m,
    padding: spacing.m,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: spacing.cardRadius,
    gap: spacing.m,
  },
  avatar: {
    width: spacing.avatarSize + spacing.s,
    height: spacing.avatarSize + spacing.s,
    borderRadius: (spacing.avatarSize + spacing.s) / 2,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.border,
  },
  avatarEmoji: {
    fontSize: 36,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    color: colors.textPrimary,
    marginBottom: spacing.xxxs,
  },
  userPhone: {
    color: colors.textSecondary,
  },
  // ── Menu ──
  menuSection: {
    marginHorizontal: spacing.screenPadding,
    backgroundColor: colors.background,
    borderRadius: spacing.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginBottom: spacing.m,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.m,
    gap: spacing.m,
  },
  menuIconContainer: {
    width: spacing.xl,
    alignItems: 'center',
  },
  menuTextContainer: {
    flex: 1,
  },
  menuLabel: {
    color: colors.textPrimary,
  },
  menuLabelDestructive: {
    color: colors.error,
  },
  menuValue: {
    color: colors.textSecondary,
    marginTop: spacing.xxxs,
  },
  menuDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: spacing.m + spacing.m + spacing.xl,
  },
  logoutSection: {
    marginHorizontal: spacing.screenPadding,
    backgroundColor: colors.background,
    borderRadius: spacing.cardRadius,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginBottom: spacing.m,
  },
  versionText: {
    textAlign: 'center',
    color: colors.textSecondary,
    marginTop: spacing.s,
  },
});
