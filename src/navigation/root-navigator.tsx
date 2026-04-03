import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/navigation/types';

import { AuthNavigator } from '@/navigation/auth-navigator';
import { MainNavigator } from '@/navigation/main-navigator';
import { SessionResultScreen } from '@/features/session-result/screens/session-result-screen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen
        name="Main"
        component={MainNavigator}
        options={{ animation: 'fade' }}
      />
      <Stack.Screen
        name="SessionResult"
        component={SessionResultScreen}
        options={{ animation: 'slide_from_bottom', presentation: 'modal' }}
      />
    </Stack.Navigator>
  );
}
