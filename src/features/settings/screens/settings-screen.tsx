import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import { colors } from '@/theme/colors';
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
  onPress: () => void;
  isDestructive?: boolean;
}

function MenuItem({ icon, label, onPress, isDestructive = false }: MenuItemProps) {
  return (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <View style={styles.menuIconContainer}>{icon}</View>
      <AppText
        variant="bodyMd"
        style={[styles.menuLabel, isDestructive && styles.menuLabelDestructive]}
      >
        {label}
      </AppText>
      {!isDestructive && (
        <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
      )}
    </TouchableOpacity>
  );
}

export function SettingsScreen({ navigation }: Props) {
  const user: User = userData as User;

  const rootNav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogOut = () => {
    // Reset navigation stack to Auth so back button can't return
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

        {/* ── Profile card ── */}
        <View style={styles.profileCard}>
          {/* Avatar placeholder */}
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

        {/* ── CTA button ── */}
        <Button
          label="Sign Up / Continue"
          onPress={() => {}}
          style={styles.ctaButton}
          accessibilityLabel="Sign up or continue with full account"
        />

        {/* ── Menu section ── */}
        <View style={styles.menuSection}>
          <MenuItem
            icon={<Ionicons name="person-outline" size={20} color={colors.textSecondary} />}
            label="My Profile"
            onPress={() => {}}
          />
          <View style={styles.menuDivider} />
          <MenuItem
            icon={<Ionicons name="notifications-outline" size={20} color={colors.textSecondary} />}
            label="Notifications"
            onPress={() => {}}
          />
          <View style={styles.menuDivider} />
          <MenuItem
            icon={<Feather name="shield" size={20} color={colors.textSecondary} />}
            label="Privacy & Security"
            onPress={() => {}}
          />
          <View style={styles.menuDivider} />
          <MenuItem
            icon={<Ionicons name="help-circle-outline" size={20} color={colors.textSecondary} />}
            label="Help & Support"
            onPress={() => {}}
          />
          <View style={styles.menuDivider} />
          <MenuItem
            icon={<Ionicons name="document-text-outline" size={20} color={colors.textSecondary} />}
            label="Terms & Privacy Policy"
            onPress={() => {}}
          />
          <View style={styles.menuDivider} />
          <MenuItem
            icon={<MaterialCommunityIcons name="share-variant-outline" size={20} color={colors.textSecondary} />}
            label="Share the App"
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
    width: spacing.avatarSize + 12,
    height: spacing.avatarSize + 12,
    borderRadius: (spacing.avatarSize + 12) / 2,
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
  ctaButton: {
    marginHorizontal: spacing.screenPadding,
    marginBottom: spacing.xl,
    width: 'auto',
  },
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
    width: 24,
    alignItems: 'center',
  },
  menuLabel: {
    flex: 1,
    color: colors.textPrimary,
  },
  menuLabelDestructive: {
    color: colors.error,
  },
  menuDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: spacing.m + spacing.m + spacing.xxl, // indent past icon
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
