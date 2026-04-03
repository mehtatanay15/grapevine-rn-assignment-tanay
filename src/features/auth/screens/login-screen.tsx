import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/navigation/types';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeInDown, Layout } from 'react-native-reanimated';

import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { SafeScreen } from '@/components/ui/safe-screen';
import type { AuthScreenProps } from '@/navigation/types';

type Props = AuthScreenProps<'Login'>;
type RootNav = NativeStackNavigationProp<RootStackParamList>;

const OTP_LENGTH = 6;

export function LoginScreen({ navigation }: Props) {
  const rootNav = useNavigation<RootNav>();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [phoneError, setPhoneError] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const otpRefs = useRef<(TextInput | null)[]>([]);

  const handlePhoneChange = (text: string) => {
    const cleaned = text.replace(/\D/g, '').slice(0, 10);
    setPhone(cleaned);
    setPhoneError(false);
  };

  const handleOtpChange = (value: string, index: number) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    if (digit && index < OTP_LENGTH - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleContinue = () => {
    if (phone.length !== 10) {
      setPhoneError(true);
      return;
    }
    // Mock: navigate to Main
    rootNav.reset({ index: 0, routes: [{ name: 'Main' }] });
  };

  return (
    <SafeScreen>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Back button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
          </TouchableOpacity>

          {/* Heading */}
          <Animated.View entering={FadeInDown.duration(600).springify()} style={styles.headingContainer}>
            <AppText variant="h1">
              <AppText variant="h1" style={styles.headingOrange}>
                Kickstart{' '}
              </AppText>
              your journey
            </AppText>
            <AppText variant="bodyMd" style={styles.subtitle}>
              We'll send you an OTP to verify your number.
            </AppText>
          </Animated.View>

          {/* Phone input */}
          <Animated.View entering={FadeInDown.delay(100).duration(600).springify()} style={styles.fieldContainer}>
            <AppText variant="labelMd" style={styles.fieldLabel}>
              Phone number
            </AppText>
            <View style={[
              styles.phoneRow, 
              phoneError && styles.inputError,
              isFocused && styles.inputFocused
            ]}>
              <View style={styles.countryCode}>
                <AppText variant="bodyMd">🇮🇳</AppText>
                <AppText variant="bodyMd" style={styles.codeText}>
                  +91
                </AppText>
                <Ionicons name="chevron-down" size={14} color={colors.textSecondary} />
              </View>
              <View style={styles.divider} />
              <TextInput
                style={styles.phoneInput}
                value={phone}
                onChangeText={handlePhoneChange}
                keyboardType="number-pad"
                placeholder="Enter mobile number"
                placeholderTextColor={colors.textDisabled}
                maxLength={10}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                accessibilityLabel="Phone number input"
              />
            </View>
            {phoneError && (
              <Animated.View entering={FadeIn.duration(300)}>
                <AppText variant="caption" style={styles.errorText}>
                  Please enter a valid 10-digit mobile number.
                </AppText>
              </Animated.View>
            )}
          </Animated.View>

          {/* OTP input */}
          <Animated.View entering={FadeInDown.delay(200).duration(600).springify()} style={styles.fieldContainer}>
            <AppText variant="labelMd" style={styles.fieldLabel}>
              Enter the OTP
            </AppText>
            <View style={styles.otpRow}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={ref => {
                    otpRefs.current[index] = ref;
                  }}
                  style={[
                    styles.otpBox, 
                    digit ? styles.otpBoxFilled : null
                  ]}
                  value={digit}
                  onChangeText={val => handleOtpChange(val, index)}
                  onKeyPress={({ nativeEvent }) =>
                    handleOtpKeyPress(nativeEvent.key, index)
                  }
                  keyboardType="number-pad"
                  maxLength={1}
                  textAlign="center"
                  accessibilityLabel={`OTP digit ${index + 1}`}
                />
              ))}
            </View>
          </Animated.View>
        </ScrollView>

        {/* Continue button — pinned to bottom */}
        <Animated.View layout={Layout.springify()} style={styles.footer}>
          <Button
            label="Continue"
            onPress={handleContinue}
            style={styles.continueButton}
            accessibilityLabel="Continue to next step"
          />
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.s,
    paddingBottom: spacing.xl,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
    marginLeft: -spacing.xs,
  },
  headingContainer: {
    marginBottom: spacing.xxl,
  },
  headingOrange: {
    color: colors.primary,
  },
  subtitle: {
    color: colors.textSecondary,
    marginTop: spacing.xs,
    fontSize: 16,
    lineHeight: 22,
  },
  fieldContainer: {
    marginBottom: spacing.xl,
  },
  fieldLabel: {
    color: colors.textSecondary,
    marginBottom: spacing.s,
    fontFamily: typography.fonts.inter.medium,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 16,
    paddingHorizontal: spacing.m,
    height: 60,
    backgroundColor: colors.background,
  },
  inputFocused: {
    borderColor: colors.primary,
  },
  inputError: {
    borderColor: colors.error,
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
    paddingRight: spacing.s,
  },
  codeText: {
    color: colors.textPrimary,
    fontFamily: typography.fonts.inter.semiBold,
  },
  divider: {
    width: 1.5,
    height: 24,
    backgroundColor: colors.border,
    marginRight: spacing.s,
  },
  phoneInput: {
    flex: 1,
    fontSize: 18,
    fontFamily: typography.fonts.inter.medium,
    color: colors.textPrimary,
  },
  errorText: {
    color: colors.error,
    marginTop: spacing.s,
    fontFamily: typography.fonts.inter.medium,
  },
  otpRow: {
    flexDirection: 'row',
    gap: spacing.s,
    justifyContent: 'space-between',
  },
  otpBox: {
    width: (width - (spacing.screenPadding * 2) - (spacing.s * 5)) / 6,
    height: 56,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.backgroundSecondary,
    fontSize: 22,
    fontFamily: typography.fonts.inter.bold,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  otpBoxFilled: {
    borderColor: colors.primary,
    backgroundColor: colors.background,
  },
  footer: {
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: Platform.OS === 'ios' ? spacing.xxl : spacing.xl,
    paddingTop: spacing.m,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  continueButton: {
    width: '100%',
    height: 56,
    borderRadius: 16,
  },
});
