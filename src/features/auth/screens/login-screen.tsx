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
import Animated, { FadeIn, FadeInDown, FadeOut } from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { colors, palette } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { SafeScreen } from '@/components/ui/safe-screen';
import { OrangePrimaryButton } from '@/features/auth/screens/welcome-screen';
import type { RootStackParamList } from '@/navigation/types';

// 6 boxes × 44px + 5 gaps × 8px = 264 + 40 = 304px (matches Figma width:304)
const OTP_LENGTH = 6;

export function LoginScreen() {
  const rootNav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState<string[]>(new Array(OTP_LENGTH).fill(''));
  const otpRefs = useRef<(TextInput | null)[]>([]);

  const isPhoneValid = phone.length === 10;
  const isOtpComplete = otp.every((d) => d.length === 1);
  const canContinue = isPhoneValid && isOtpComplete;

  const handleOtpChange = (text: string, index: number) => {
    const digit = text.replace(/[^0-9]/g, '').slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    if (digit && index < OTP_LENGTH - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && otp[index] === '' && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      otpRefs.current[index - 1]?.focus();
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
          <Animated.View entering={FadeIn.duration(600)}>

          {/* ── Heading: "Kickstart your journey" ──────────────────────────
              Figma: top:88 left:24 width:309 height:36
              We do NOT restrict width — the 309 spec clips naturally on one
              line at 32px. Removing the hard width lets it reflow gracefully
              on smaller devices instead of being cut. ──────────────────── */}
          <Text style={styles.heading}>
            <Text style={styles.headingAccent}>Kickstart</Text>
            <Text style={styles.headingRest}> your journey</Text>
          </Text>

          {/* ── Subtitle ────────────────────────────────────────────────────
              Figma: top:146 left:24 width:345 height:20 ──────────────── */}
          <Text style={styles.subtitle}>
            We will send you an OTP to verify your number.
          </Text>

          {/* ── Phone Number ─────────────────────────────────────────────── */}
          <View style={styles.fieldGroup}>
            {/* Label */}
            <Text style={styles.fieldLabel}>Phone number</Text>

            {/* Input box — Figma: 345×44, radius:16, border:#EFEFF4 */}
            <View style={styles.phoneBox}>
              <View style={styles.countryRow}>
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

            {/* Helper text */}
            <Text style={styles.helperText}>
              Please enter a valid 10-digit mobile number.
            </Text>
          </View>

          {/* ── OTP ──────────────────────────────────────────────────────────
              Figma: width:304 height:52 gap:8
              6 boxes × 44 + 5 × 8 gap = 264 + 40 = 304 ✓ ──────────── */}
          {isPhoneValid && (
            <Animated.View 
              style={styles.fieldGroup}
              entering={FadeInDown.duration(400).springify()}
              exiting={FadeOut.duration(200)}
            >
              <Text style={styles.fieldLabel}>Enter the OTP</Text>
              <View style={styles.otpRow}>
                {otp.map((digit, i) => (
                  <TextInput
                    key={i}
                    ref={(r) => { otpRefs.current[i] = r; }}
                    style={[styles.otpBox, digit ? styles.otpBoxFilled : null]}
                    value={digit}
                    onChangeText={(t) => handleOtpChange(t, i)}
                    onKeyPress={({ nativeEvent }) => handleOtpKeyPress(nativeEvent.key, i)}
                    keyboardType="number-pad"
                    maxLength={1}
                    textAlign="center"
                    // Prevent OS from inflating/deflating font with extra padding
                    textAlignVertical="center"
                    // @ts-ignore - includeFontPadding is Android only but sometimes errors in generic typings
                    includeFontPadding={Platform.OS === 'android' ? false : undefined}
                    accessibilityLabel={`OTP digit ${i + 1}`}
                  />
                ))}
              </View>
            </Animated.View>
          )}

          </Animated.View>
        </ScrollView>

        {/* ── Continue bar ────────────────────────────────────────────────
            Figma: width:393 height:84 top:734 border-top:1 padding:L ── */}
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
    paddingHorizontal: 24,
    paddingBottom: 32,
  },

  // ── Heading ───────────────────────────────────────────────────────────────
  // Figma: top:88 from screen top. SafeArea typically ~44px on iOS status bar.
  // marginTop:44 brings us close to the 88dp spec across devices.
  heading: {
    marginTop: 44,
    fontFamily: typography.fonts.inter.bold,
    fontSize: typography.sizes.xxxl,   // 32
    lineHeight: 40,
    letterSpacing: -0.32,
  },
  headingAccent: {
    color: colors.primary,             // orange "Kickstart"
  },
  headingRest: {
    color: colors.textPrimary,
  },

  // ── Subtitle ──────────────────────────────────────────────────────────────
  subtitle: {
    marginTop: 12,
    fontFamily: typography.fonts.inter.normal,
    fontSize: typography.sizes.m,      // Text Size/M = 16
    lineHeight: 24,                    // Line Height/M
    letterSpacing: -0.16,              // -1% of 16
    color: '#48484A',                  // var(--Surface-70)
  },

  // ── Field group ───────────────────────────────────────────────────────────
  fieldGroup: {
    marginTop: 24,
  },
  fieldLabel: {
    fontFamily: typography.fonts.inter.semiBold,
    fontSize: typography.sizes.s,      // 14
    color: colors.textPrimary,
    marginBottom: 8,
  },

  // ── Phone box ─────────────────────────────────────────────────────────────
  // Figma: width:345 height:44 radius:16 border:1 #EFEFF4 bg:#FFFFFF
  phoneBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    borderRadius: spacing.m,
    borderWidth: 1,
    borderColor: '#EFEFF4',
    backgroundColor: palette.white,
    paddingHorizontal: spacing.xs,     // Spacing/XXS inner padding
  },
  countryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingRight: 4,
  },
  flag: {
    fontSize: 16,
    lineHeight: 20,
  },
  dialCode: {
    fontFamily: typography.fonts.inter.medium,
    fontSize: typography.sizes.m,
    color: colors.textPrimary,
    includeFontPadding: false,
  },
  chevron: {
    fontSize: 16,
    color: colors.textTertiary,
    lineHeight: 20,
  },
  phoneDivider: {
    width: 1,
    height: 22,
    backgroundColor: '#EFEFF4',
    marginHorizontal: 8,
  },
  phoneInput: {
    flex: 1,
    fontFamily: typography.fonts.inter.normal,
    fontSize: typography.sizes.m,
    color: colors.textPrimary,
    padding: 0,
    includeFontPadding: false,
  },
  helperText: {
    marginTop: 6,
    fontFamily: typography.fonts.inter.normal,
    fontSize: typography.sizes.xs,     // 12
    color: colors.textTertiary,
  },

  // ── OTP row ───────────────────────────────────────────────────────────────
  // 6 × 44 + 5 × 8 = 304 — matches Figma width:304
  otpRow: {
    flexDirection: 'row',
    gap: 8,
  },
  otpBox: {
    width: 44,
    height: 52,
    borderRadius: 8,
    backgroundColor: '#F5F5F8',        // var(--Grey-10)
    fontFamily: typography.fonts.inter.bold,
    fontSize: typography.sizes.xl,     // 20
    color: colors.textPrimary,
    // Do NOT set paddingVertical on a fixed-height TextInput — it clips digits
    padding: 0,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  otpBoxFilled: {
    backgroundColor: palette.white,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },

  // ── Continue bar ──────────────────────────────────────────────────────────
  // Figma: width:393 height:84 border-top:1 padding:Spacing/L (20)
  continueBar: {
    height: 84,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
    paddingVertical: spacing.l,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
