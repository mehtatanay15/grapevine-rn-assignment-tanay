import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, Feather } from '@expo/vector-icons';
import { Platform } from 'react-native';

import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import type { MainTabParamList } from '@/navigation/types';

import { HomeScreen } from '@/features/home/screens/home-screen';
import { SettingsScreen } from '@/features/settings/screens/settings-screen';
import { StoreScreen } from '@/features/store/screens/store-screen';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          display: 'none',
        },
        tabBarLabelStyle: {
          fontFamily: typography.fonts.inter.medium,
          fontSize: typography.sizes.xs,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Feather name="monitor" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Store"
        component={StoreScreen}
        options={{
          tabBarLabel: 'Store',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bag-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
