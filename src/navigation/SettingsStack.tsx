import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsScreen from '../screens/settings/SettingsScreen';
import NotificationsScreen from '../screens/settings/NotificationsScreen';
import LanguageRegionScreen from '../screens/settings/LanguageRegionScreen';
import DataStorageScreen from '../screens/settings/DataStorageScreen';
import HelpSupportScreen from '../screens/settings/HelpSupportScreen';
import FeedbackRatingScreen from '../screens/settings/FeedbackRatingScreen';
import AboutInfoScreen from '../screens/settings/AboutInfoScreen';
import ManageAccountScreen from '../screens/settings/ManageAccountScreen';
import SyncDataScreen from '../screens/settings/SyncDataScreen';

const Stack = createNativeStackNavigator();

export default function SettingsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SettingsList" component={SettingsScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="LanguageRegion" component={LanguageRegionScreen} />
      <Stack.Screen name="DataStorage" component={DataStorageScreen} />
      <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
      <Stack.Screen name="FeedbackRating" component={FeedbackRatingScreen} />
      <Stack.Screen name="AboutInfo" component={AboutInfoScreen} />
      <Stack.Screen name="ManageAccount" component={ManageAccountScreen} />
      <Stack.Screen name="SyncData" component={SyncDataScreen} />
    </Stack.Navigator>
  );
}
