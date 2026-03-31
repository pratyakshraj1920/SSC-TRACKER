import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/HomeScreen';
import SubjectStack from './SubjectStack';
import SettingsStack from './SettingsStack';
import { Home, BookOpen, Settings } from 'lucide-react-native';
import { useStore } from '../store/useStore';
import { t } from '../utils/translations';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const { theme, language } = useStore();
  const isDark = theme !== 'light';
  const isOled = theme === 'oled';

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
          borderTopColor: isDark ? (isOled ? '#27272A' : '#334155') : '#E2E8F0',
          backgroundColor: isDark ? (isOled ? '#121212' : '#1E293B') : '#FFFFFF',
        },
        tabBarActiveTintColor: isDark ? '#A5B4FC' : '#6366F1',
        tabBarInactiveTintColor: isDark ? '#64748B' : '#94A3B8',
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') return <Home color={color} size={size} />;
          if (route.name === 'Syllabus') return <BookOpen color={color} size={size} />;
          if (route.name === 'Settings') return <Settings color={color} size={size} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: t('Home', language) }} />
      <Tab.Screen name="Syllabus" component={SubjectStack} options={{ tabBarLabel: t('Syllabus', language) }} />
      <Tab.Screen name="Settings" component={SettingsStack} options={{ tabBarLabel: t('Settings', language) }} />
    </Tab.Navigator>
  );
}
