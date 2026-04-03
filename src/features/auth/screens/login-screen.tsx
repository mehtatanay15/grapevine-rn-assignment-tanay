import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { colors, palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { AppText } from '@/components/ui/app-text';
import { SafeScreen } from '@/components/ui/safe-screen';
import { OrangePrimaryButton } from '@/features/auth/screens/welcome-screen';
import type { RootStackParamList } from '@/navigation/types';

// ─── Constants ───────────────────────────────────────────────────────────────
const OTP_LENGTH = 4;

// Figma: button bar is full-width 393, top:734
const BTN_BAR_TOP = 734;
// We use KeyboardAvoidingView so it stays above the keyboard;
// the bar itself is always pinned to the bottom of the screen.

// ─── Screen ──────────────────────────────────────────────────────────────────
export function LoginScreen() {
  const rootNav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState<string[]>(new Array(OTP_LENGTH).fill(''));
  const otpRefs = useRef<(TextInput | null)[]>([]);

  const isPhoneValid = phone.length === 10;
  const isOtpComplete = otp.every((d) => d.length === 1);
  const canContinue = isPhoneValid && isOtpComplete;

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text.length === 1 && index < OTP_LENGTH - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && otp[index] === '' && index > 0) {
      otpRefs.current[index - 1]?.focus();
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
    }
  };

  const handleContinue = () => {
    Keyboard.dismiss();
    rootNav.reset({ index: 0, routes: [{ name: 'Main' }] });
  };

  return (
    <SafeScreen edges={['top', 'left', 'right']}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* ── "Kickstart your journey" ── */}
          {/* Figma: top:88 left:24 width:309 height:36 */}
          <View style={styles.headingBlock}>
            <Text style={styles.headingText}>
              <Text style={styles.headingAccent}>Kickstart</Text>
              <Text style={styles.headingRest}>{' your journey'}</Text>
            </Text>
          </View>

          {/* ── Subtitle ── */}
          {/* Figma: top:146 left:24 width:345 height:20 */}
          <Text style={styles.subtitle}>
            We will send you an OTP to verify your number.
          </Text>

          {/* ── Phone number box ── */}
          {/* Figma: width:345 height:44 border-radius:Rounding/M border:1px #EFEFF4 */}
          <View style={styles.sectionGap}>
            <View style={styles.phoneBox}>
              {/* Country code pill */}
              <View style={styles.countryCode}>
                <Text style={styles.flag}>🇮🇳</Text>
                <Text style={styles.dialCode}>+91</Text>
                <Text style={styles.chevron}>›</Text>
              </View>
              <View style={styles.phoneDivider} />
              <TextInput
                style={styles.phoneInput}
                value={phone}
                onChangeText={(t) => setPhone(t.replace(/[^0-9]/g, '').slice(0, 10))}
                placeholder="8812014288"
                placeholderTextColor={colors.textTertiary}
                keyboardType="number-pad"
                maxLength={10}
                accessibilityLabel="Phone number input"
              />
            </View>
          </View>

          {/* ── OTP input row ── */}
          {/* Figma: width:304 height:52 gap:8 — 4 boxes each 44×52 */}
          <View style={styles.sectionGap}>
            <AppText variant="labelMd" style={styles.fieldLabel}>
              Enter the OTP
            </AppText>
            <View style={styles.otpRow}>
              {otp.map((digit, i) => (
                <TextInput
                  key={i}
                  ref={(r) => { otpRefs.current[i] = r; }}
                  style={[
                    styles.otpBox,
                    digit ? styles.otpBoxFilled : null,
                  ]}
                  value={digit}
                  onChangeText={(t) => handleOtpChange(t.replace(/[^0-9]/g, ''), i)}
                  onKeyPress={({ nativeEvent }) => handleOtpKeyPress(nativeEvent.key, i)}
                  keyboardType="number-pad"
                  maxLength={1}
                  textAlign="center"
                  accessibilityLabel={`OTP digit ${i + 1}`}
                />
              ))}
            </View>
          </View>
        </ScrollView>

        {/* ── Continue button bar ── */}
        {/* Figma: width:393 height:84 top:734 border-top:1px padding:Spacing/L */}
        <View style={styles.continueBar}>
          <OrangePrimaryButton
            label="Continue"
            onPress={handleContinue}
            width={345}
            disabled={!canContinue}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeScreen>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  flex: { flex: 1 },

  scrollContent: {
    paddingHorizontal: 24, // left:24 from Figma
    paddingBottom: 100,
  },

  // "Kickstart your journey" — top:88 (relative to safe-area top)
  headingBlock: {
    marginTop: 88,
    width: 309,
    height: 36,
    justifyContent: 'center',
  },
  headingText: {
    fontFamily: typography.fonts.inter.bold,
    fontSize: typography.sizes.xxxl, // 32
    lineHeight: 36,
    letterSpacing: -0.32,
  },
  headingAccent: {
    color: colors.primary,
  },
  headingRest: {
    color: colors.textPrimary,
  },

  // Subtitle — top:146 → 146 - 88 - 36 = 22px gap after heading
  subtitle: {
    marginTop: 22,
    width: 345,
    fontFamily: typography.fonts.inter.normal,
    fontSize: typography.sizes.m,  // Text Size/M = 16
    lineHeight: 24,                // Line Height/M
    letterSpacing: -0.16,          // -1%
    color: '#48484A',              // var(--Surface-70)
  },

  sectionGap: {
    marginTop: 24,
  },
  fieldLabel: {
    color: colors.textPrimary,
    fontFamily: typography.fonts.inter.semiBold,
    marginBottom: 8,
  },

  // Phone box — 345×44 border-radius:Rounding/M border:#EFEFF4
  phoneBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 345,
    height: 44,
    borderRadius: spacing.m,        // Rounding/M = 16
    borderWidth: 1,
    borderColor: '#EFEFF4',         // var(--Surface-25)
    backgroundColor: palette.white, // var(--Surface-10)
    paddingHorizontal: spacing.xxs, // Spacing/XXS = 4
    gap: 6,
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingLeft: 8,
  },
  flag: { fontSize: 16 },
  dialCode: {
    fontFamily: typography.fonts.inter.medium,
    fontSize: typography.sizes.m,
    color: colors.textPrimary,
  },
  chevron: {
    fontSize: 18,
    color: colors.textTertiary,
    lineHeight: 20,
  },
  phoneDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#EFEFF4',
    marginHorizontal: 4,
  },
  phoneInput: {
    flex: 1,
    fontFamily: typography.fonts.inter.normal,
    fontSize: typography.sizes.m,
    color: colors.textPrimary,
    padding: 0,
  },

  // OTP row — 4 boxes, each 44×52, gap:8, total width:304
  otpRow: {
    flexDirection: 'row',
    gap: 8,
  },
  otpBox: {
    width: 44,
    height: 52,
    borderRadius: 8,
    backgroundColor: '#F5F5F8',  // var(--Grey-10)
    fontFamily: typography.fonts.inter.bold,
    fontSize: typography.sizes.xl,
    color: colors.textPrimary,
    paddingVertical: spacing.m,  // padding-top/bottom: Spacing/M
  },
  otpBoxFilled: {
    backgroundColor: palette.white,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },

  // Continue bar — pinned bottom, height:84, border-top:1, padding:Spacing/L
  continueBar: {
    height: 84,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
    paddingVertical: spacing.l,  // Spacing/L = 20
    alignItems: 'center',
    justifyContent: 'center',
  },
});
