import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '@/navigation/types';

import { SplashScreen } from '@/features/auth/screens/splash-screen';
import { WelcomeScreen } from '@/features/auth/screens/welcome-screen';
import { LoginScreen } from '@/features/auth/screens/login-screen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ animation: 'slide_from_right' }}
      />
    </Stack.Navigator>
  );
}
