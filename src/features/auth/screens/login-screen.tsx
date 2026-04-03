import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/navigation/types';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

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
  const otpRefs = useRef<(TextInput | null)[]>([]);

  const handlePhoneChange = (text: string) => {
    // Allow only digits
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

  const isValid = phone.length === 10 && otp.some(d => d !== '');

  const handleContinue = () => {
    if (phone.length !== 10) {
      setPhoneError(true);
      return;
    }
    // Mock: any OTP is accepted — navigate to Main
    rootNav.reset({ index: 0, routes: [{ name: 'Main' }] });
  };

  return (
    <SafeScreen>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
          <View style={styles.headingContainer}>
            <AppText variant="h1">
              <AppText variant="h1" style={styles.headingOrange}>
                Kickstart{' '}
              </AppText>
              your journey
            </AppText>
            <AppText variant="bodyMd" style={styles.subtitle}>
              We will send you an OTP to verify your number.
            </AppText>
          </View>

          {/* Phone input */}
          <View style={styles.fieldContainer}>
            <AppText variant="labelMd" style={styles.fieldLabel}>
              Phone number
            </AppText>
            <View style={[styles.phoneRow, phoneError && styles.inputError]}>
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
                accessibilityLabel="Phone number input"
              />
            </View>
            {phoneError && (
              <AppText variant="caption" style={styles.errorText}>
                Please enter a valid 10-digit mobile number.
              </AppText>
            )}
          </View>

          {/* OTP input */}
          <View style={styles.fieldContainer}>
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
                  style={[styles.otpBox, digit ? styles.otpBoxFilled : null]}
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
          </View>
        </ScrollView>

        {/* Continue button — pinned to bottom */}
        <View style={styles.footer}>
          <Button
            label="Continue"
            onPress={handleContinue}
            style={styles.continueButton}
            accessibilityLabel="Continue to next step"
          />
        </View>
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
    width: 40,
    height: 40,
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
  },
  fieldContainer: {
    marginBottom: spacing.xl,
  },
  fieldLabel: {
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.inputRadius,
    paddingHorizontal: spacing.m,
    height: 52,
    backgroundColor: colors.background,
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
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: colors.border,
    marginRight: spacing.s,
  },
  phoneInput: {
    flex: 1,
    fontSize: typography.sizes.m,
    fontFamily: typography.fonts.inter.normal,
    color: colors.textPrimary,
  },
  errorText: {
    color: colors.error,
    marginTop: spacing.xxs,
  },
  otpRow: {
    flexDirection: 'row',
    gap: spacing.s,
  },
  otpBox: {
    flex: 1,
    height: 52,
    borderRadius: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.backgroundSecondary,
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.inter.semiBold,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  otpBoxFilled: {
    borderColor: colors.primary,
    backgroundColor: colors.background,
  },
  footer: {
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: Platform.OS === 'ios' ? spacing.xl : spacing.l,
    paddingTop: spacing.s,
  },
  continueButton: {
    width: '100%',
    borderRadius: spacing.buttonRadius,
  },
});
