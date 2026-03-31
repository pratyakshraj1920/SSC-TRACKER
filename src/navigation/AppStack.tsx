import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExamSelectionScreen from '../screens/exam/ExamSelectionScreen';
import FilteredStatusScreen from '../screens/home/FilteredStatusScreen';
import MainTabs from './MainTabs';
import { useStore } from '../store/useStore';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  const selectedExam = useStore((state) => state.selectedExam);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Dynamic starting screen based on if an exam is already picked */}
      {!selectedExam ? (
          <Stack.Screen name="ExamSelection" component={ExamSelectionScreen} />
      ) : (
          <Stack.Screen name="MainTabs" component={MainTabs} />
      )}
      {/* We still keep the other screens in the stack so we can navigate manually if needed, like from settings */}
      {selectedExam && <Stack.Screen name="ExamSelection" component={ExamSelectionScreen} />}
      {selectedExam && <Stack.Screen 
        name="FilteredStatus" 
        component={FilteredStatusScreen} 
        options={({ route }: any) => {
           const theme = useStore.getState().theme;
           const isDark = theme !== 'light';
           const isOled = theme === 'oled';
           return {
             headerShown: true,
             title: route.params?.chapterName || 'Review Topics',
             headerStyle: { backgroundColor: isDark ? (isOled ? '#121212' : '#1E293B') : '#F8FAFC' },
             headerTintColor: isDark ? '#F8FAFC' : '#1E293B',
             headerShadowVisible: false,
             headerBackTitle: 'Back'
           }
        }} 
      />}
    </Stack.Navigator>
  );
}
