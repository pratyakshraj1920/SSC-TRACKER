import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SubjectsListScreen from '../screens/subjects/SubjectsListScreen';
import ChaptersListScreen from '../screens/subjects/ChaptersListScreen';
import SubtopicsListScreen from '../screens/subjects/SubtopicsListScreen';
import { useStore } from '../store/useStore';

const Stack = createNativeStackNavigator();

export default function SubjectStack() {
  const theme = useStore((state) => state.theme);
  const isDark = theme !== 'light';
  const isOled = theme === 'oled';
  
  return (
    <Stack.Navigator screenOptions={{ 
      headerStyle: { backgroundColor: isDark ? (isOled ? '#121212' : '#1E293B') : '#F8FAFC' },
      headerShadowVisible: false,
      headerTitleStyle: { color: isDark ? '#F8FAFC' : '#1E293B', fontWeight: 'bold' },
      headerTintColor: isDark ? '#F8FAFC' : '#1E293B',
    }}>
      <Stack.Screen name="SubjectsList" component={SubjectsListScreen} options={{ title: 'Subjects' }} />
      <Stack.Screen name="ChaptersList" component={ChaptersListScreen} options={({ route }: any) => ({ title: route.params?.subjectName || 'Chapters' })} />
      <Stack.Screen name="SubtopicsList" component={SubtopicsListScreen} options={({ route }: any) => ({ title: route.params?.chapterName || 'Topics' })} />
    </Stack.Navigator>
  );
}
