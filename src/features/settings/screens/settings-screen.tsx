import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { typography } from '@/theme/typography';
import { AppText } from '@/components/ui/app-text';
import { SafeScreen } from '@/components/ui/safe-screen';
import type { MainTabScreenProps, RootStackParamList } from '@/navigation/types';

type Props = MainTabScreenProps<'Settings'>;

export function SettingsScreen({ navigation }: Props) {
  const rootNav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeScreen style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => rootNav.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color="#8E8E93" />
        </TouchableOpacity>
        <AppText style={styles.headerTitle}>Your Profile</AppText>
        <View style={styles.headerRightSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Image 
          source={require('../../../../assets/images/Settings/Card.png')}
          style={styles.heroCard}
          contentFit="contain"
          cachePolicy="memory-disk"
        />

        {/* Update Box */}
        <View style={styles.updateBox}>
          <View style={styles.updateLeft}>
            <Image source={require('../../../../assets/images/Settings/elements.png')} style={{width: 20, height: 20}} contentFit="contain" />
            <AppText style={styles.menuLabel}>New update available</AppText>
          </View>
          <Image source={require('../../../../assets/images/Settings/new-update.png')} style={{width: 32, height: 32}} contentFit="contain" />
        </View>

        {/* User Info Container */}
        <View style={styles.listContainer}>
          <View style={styles.rowItem}>
            <View style={styles.rowLeft}>
              <Image source={require('../../../../assets/images/Settings/phone.png')} style={{width: 20, height: 20}} contentFit="contain" />
              <AppText style={styles.menuLabel}>Phone number</AppText>
            </View>
            <AppText style={styles.menuValue}>+91 9608184703</AppText>
          </View>
          <View style={styles.divider} />
          <View style={styles.rowItem}>
            <View style={styles.rowLeft}>
              <Image source={require('../../../../assets/images/Settings/learning-since.png')} style={{width: 20, height: 20}} contentFit="contain" />
              <AppText style={styles.menuLabel}>Learning since</AppText>
            </View>
            <AppText style={styles.menuValue}>August 17, 2025</AppText>
          </View>
        </View>

        {/* Actions Container */}
        <View style={styles.listContainer}>
          <TouchableOpacity style={styles.rowItemBtn}>
            <View style={styles.rowLeft}>
              <Image source={require('../../../../assets/images/Settings/comments-2.png')} style={{width: 20, height: 20}} contentFit="contain" />
              <AppText style={styles.menuLabel}>Chat with us</AppText>
            </View>
            <Image source={require('../../../../assets/images/Settings/chevron-right.png')} style={{width: 16, height: 16}} contentFit="contain" />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.rowItemBtn}>
            <View style={styles.rowLeft}>
              <Image source={require('../../../../assets/images/Settings/export-2.png')} style={{width: 20, height: 20}} contentFit="contain" />
              <AppText style={styles.menuLabel}>Share the app</AppText>
            </View>
            <Image source={require('../../../../assets/images/Settings/chevron-right.png')} style={{width: 16, height: 16}} contentFit="contain" />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.rowItemBtn}>
            <View style={styles.rowLeft}>
              <Image source={require('../../../../assets/images/Settings/star.png')} style={{width: 20, height: 20}} contentFit="contain" />
              <AppText style={styles.menuLabel}>Rate the app</AppText>
            </View>
            <Image source={require('../../../../assets/images/Settings/chevron-right.png')} style={{width: 16, height: 16}} contentFit="contain" />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.rowItemBtn} onPress={() => rootNav.reset({ index: 0, routes: [{ name: 'Auth' }] })}>
            <View style={styles.rowLeft}>
              <Image source={require('../../../../assets/images/Settings/log-out.png')} style={{width: 20, height: 20}} contentFit="contain" />
              <AppText style={styles.menuLabel}>Log out</AppText>
            </View>
            <Image source={require('../../../../assets/images/Settings/chevron-right.png')} style={{width: 16, height: 16}} contentFit="contain" />
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footerInfo}>
          <AppText style={styles.footerText}>App version v2.14.2</AppText>
          <AppText style={styles.footerText}>Made with ❤️ from India</AppText>
        </View>

      </ScrollView>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontFamily: typography.fonts.inter.semiBold,
    fontSize: 18,
    color: '#1C1C1E',
  },
  headerRightSpacer: {
    width: 40,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    alignItems: 'center',
  },
  heroCard: {
    width: 361,
    height: 200, 
    marginBottom: 16,
  },
  updateBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 361,
    height: 72,
    paddingTop: 8,
    paddingRight: 16,
    paddingBottom: 8,
    paddingLeft: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    marginBottom: 16,
  },
  updateLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  downloadCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E8F9EF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    width: 361,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    marginBottom: 16,
    paddingVertical: 8,
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  rowItemBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5EA',
    marginLeft: 48,
  },
  menuLabel: {
    fontFamily: typography.fonts.inter.medium,
    fontSize: 16,
    color: '#2C2C2E',
  },
  menuValue: {
    fontFamily: typography.fonts.inter.normal,
    fontSize: 16,
    color: '#AEAEB2',
  },
  footerInfo: {
    alignItems: 'center',
    gap: 4,
    marginTop: 16,
  },
  footerText: {
    fontFamily: typography.fonts.inter.medium,
    fontSize: 13,
    color: 'rgba(0,0,0,0.64)',
  },
});
