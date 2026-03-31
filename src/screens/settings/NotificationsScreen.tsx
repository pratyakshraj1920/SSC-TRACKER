import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { useStore } from '../../store/useStore';
import { t } from '../../utils/translations';
import { ChevronLeft, Bell, Volume2, Vibrate, AlertTriangle, Clock } from 'lucide-react-native';

export default function NotificationsScreen({ navigation }: any) {
  const { 
      theme, notificationsEnabled, setNotificationsEnabled,
      soundEnabled, setSoundEnabled, vibrationEnabled, setVibrationEnabled,
      importantAlertsOnly, setImportantAlertsOnly, reminderTime, setReminderTime, language
  } = useStore();
  
  const isDark = theme !== 'light';
  const isOled = theme === 'oled';

  const cycleReminderTime = () => {
      const times = ['08:00 AM', '09:00 AM', '12:00 PM', '06:00 PM', '09:00 PM'];
      const currentIndex = times.indexOf(reminderTime);
      const nextIndex = (currentIndex + 1) % times.length;
      setReminderTime(times[nextIndex]);
  };

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark, isOled && styles.containerOled]}>
      <View style={[styles.header, isDark && styles.headerDark, isOled && styles.headerOled]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color={isDark ? '#F8FAFC' : '#1E293B'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, isDark && styles.textDark]}>{t("Notifications", language)}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
            <View style={[styles.listItem, isDark && styles.listItemDark, isOled && styles.listItemOled]}>
                <View style={styles.listIconBg}><Bell size={20} color={isDark ? "#A5B4FC" : "#6366F1"} /></View>
                <Text style={[styles.listTitle, isDark && styles.textDark]}>{t("Enable Notifications", language)}</Text>
                <Switch 
                    value={notificationsEnabled} 
                    onValueChange={setNotificationsEnabled} 
                    trackColor={{ false: '#CBD5E1', true: isDark ? '#818CF8' : '#6366F1' }}
                />
            </View>

            <View style={[styles.listItem, isDark && styles.listItemDark, isOled && styles.listItemOled]}>
                <View style={styles.listIconBg}><Volume2 size={20} color={isDark ? "#A5B4FC" : "#6366F1"} /></View>
                <Text style={[styles.listTitle, isDark && styles.textDark]}>{t("Sound", language)}</Text>
                <Switch 
                    value={soundEnabled} 
                    onValueChange={setSoundEnabled} 
                    disabled={!notificationsEnabled}
                    trackColor={{ false: '#CBD5E1', true: isDark ? '#818CF8' : '#6366F1' }}
                />
            </View>

            <View style={[styles.listItem, isDark && styles.listItemDark, isOled && styles.listItemOled]}>
                <View style={styles.listIconBg}><Vibrate size={20} color={isDark ? "#A5B4FC" : "#6366F1"} /></View>
                <Text style={[styles.listTitle, isDark && styles.textDark]}>{t("Vibration", language)}</Text>
                <Switch 
                    value={vibrationEnabled} 
                    onValueChange={setVibrationEnabled} 
                    disabled={!notificationsEnabled}
                    trackColor={{ false: '#CBD5E1', true: isDark ? '#818CF8' : '#6366F1' }}
                />
            </View>
        </View>

        <Text style={styles.sectionTitle}>{t("Reminders & Alerts", language)}</Text>
        
        <View style={styles.card}>
            <TouchableOpacity 
                style={[styles.listItem, isDark && styles.listItemDark, isOled && styles.listItemOled]} 
                onPress={cycleReminderTime}
                disabled={!notificationsEnabled}
            >
                <View style={styles.listIconBg}><Clock size={20} color={isDark ? "#A5B4FC" : "#6366F1"} /></View>
                <Text style={[styles.listTitle, isDark && styles.textDark]}>{t("Daily Reminder Time", language)}</Text>
                <Text style={styles.listValue}>{reminderTime}</Text>
            </TouchableOpacity>

            <View style={[styles.listItem, isDark && styles.listItemDark, isOled && styles.listItemOled, { borderBottomWidth: 0 }]}>
                <View style={styles.listIconBg}><AlertTriangle size={20} color={isDark ? "#A5B4FC" : "#6366F1"} /></View>
                <View style={styles.titleContainer}>
                    <Text style={[styles.listTitle, isDark && styles.textDark]}>{t("Important Alerts Only", language)}</Text>
                    <Text style={styles.listSubtitle}>{t("Mute study reminders, keep app updates.", language)}</Text>
                </View>
                <Switch 
                    value={importantAlertsOnly} 
                    onValueChange={setImportantAlertsOnly} 
                    disabled={!notificationsEnabled}
                    trackColor={{ false: '#CBD5E1', true: isDark ? '#818CF8' : '#6366F1' }}
                />
            </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  containerDark: { backgroundColor: '#0F172A' },
  containerOled: { backgroundColor: '#000000' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#FFFFFF',
    borderBottomWidth: 1, borderBottomColor: '#F1F5F9',
  },
  headerDark: { backgroundColor: '#1E293B', borderBottomColor: '#334155' },
  headerOled: { backgroundColor: '#121212', borderBottomColor: '#27272A' },
  backButton: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1E293B' },
  textDark: { color: '#F8FAFC' },
  content: { padding: 20 },
  card: {
    backgroundColor: '#FFFFFF', borderRadius: 16, marginBottom: 24,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 4, elevation: 1,
    overflow: 'hidden'
  },
  sectionTitle: { fontSize: 13, fontWeight: 'bold', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12, marginLeft: 4 },
  listItem: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 16,
    borderBottomWidth: 1, borderBottomColor: '#F1F5F9'
  },
  listItemDark: { backgroundColor: '#1E293B', borderBottomColor: '#334155' },
  listItemOled: { backgroundColor: '#121212', borderBottomColor: '#27272A' },
  listIconBg: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#EEF2FF', alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  listTitle: { flex: 1, fontSize: 16, fontWeight: '600', color: '#1E293B' },
  titleContainer: { flex: 1, marginRight: 8 },
  listSubtitle: { fontSize: 12, color: '#64748B', marginTop: 2 },
  listValue: { fontSize: 14, color: '#6366F1', fontWeight: 'bold' },
});
