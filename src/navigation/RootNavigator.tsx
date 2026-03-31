import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { useStore } from '../store/useStore';

const OledTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#000000',
    card: '#121212',
    border: '#27272A',
    text: '#F8FAFC',
  },
};

const NormalDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#0F172A',
    card: '#1E293B',
    border: '#334155',
    text: '#F8FAFC',
  },
};

export default function RootNavigator() {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const theme = useStore((state) => state.theme);

  const navTheme = theme === 'oled' ? OledTheme : theme === 'dark' ? NormalDarkTheme : DefaultTheme;

  return (
    <NavigationContainer theme={navTheme}>
      {isLoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
