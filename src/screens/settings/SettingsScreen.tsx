import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useStore } from '../../store/useStore';
import { t } from '../../utils/translations';
import { User, LogOut, Cloud, Moon, BookOpen, Bell, Globe, HardDrive, HelpCircle, Info, Star, Shield, ChevronRight } from 'lucide-react-native';

export default function SettingsScreen({ navigation }: any) {
  const { logout, setExam, selectedExam, theme, setTheme, language } = useStore();
  const isDark = theme !== 'light';
  const isOled = theme === 'oled';

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('oled');
    else setTheme('light');
  };

  const handleLogout = () => {
    logout();
  };

  const handleChangeExam = () => {
    navigation.navigate('ExamSelection');
  };

  const handleCloudSync = () => {
    Alert.alert("Cloud Sync", "Your progress has been synced to the cloud securely.");
  };

  const handleComingSoon = (feature: string) => {
    Alert.alert("Coming Soon", `${feature} options will be available in the next update.`);
  };

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark, isOled && styles.containerOled]}>
      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.profileSection}>
          <View style={styles.avatarPlaceholder}>
             <User color="#FFF" size={40} />
          </View>
          <Text style={[styles.profileName, isDark && styles.textDark]}>{t("SSC Aspirant", language)}</Text>
          <Text style={styles.profileEmail}>aspirant@example.com</Text>
        </View>

        <View style={styles.listSection}>
          <Text style={styles.sectionTitle}>{t("App Preferences", language)}</Text>
          
          <TouchableOpacity style={[styles.listItem, isDark && styles.listItemDark, isOled && styles.listItemOled]} onPress={handleChangeExam}>
            <View style={styles.listIconBg}><BookOpen size={20} color={isDark ? "#A5B4FC" : "#6366F1"} /></View>
            <Text style={[styles.listTitle, isDark && styles.textDark]}>{t("Change Exam", language)}</Text>
            <Text style={styles.listValue}>{selectedExam?.toUpperCase()}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.listItem, isDark && styles.listItemDark, isOled && styles.listItemOled]} onPress={cycleTheme}>
            <View style={styles.listIconBg}><Moon size={20} color={isDark ? "#A5B4FC" : "#6366F1"} /></View>
            <Text style={[styles.listTitle, isDark && styles.textDark]}>{t("Theme", language)}</Text>
            <Text style={styles.listValue}>{theme === 'oled' ? 'OLED' : theme === 'dark' ? 'Dark' : 'Light'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.listItem, isDark && styles.listItemDark, isOled && styles.listItemOled]} onPress={() => navigation.navigate('Notifications')}>
            <View style={styles.listIconBg}><Bell size={20} color={isDark ? "#A5B4FC" : "#6366F1"} /></View>
            <Text style={[styles.listTitle, isDark && styles.textDark]}>{t("Notifications", language)}</Text>
            <ChevronRight size={16} color="#94A3B8" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.listItem, isDark && styles.listItemDark, isOled && styles.listItemOled]} onPress={() => navigation.navigate('LanguageRegion')}>
            <View style={styles.listIconBg}><Globe size={20} color={isDark ? "#A5B4FC" : "#6366F1"} /></View>
            <Text style={[styles.listTitle, isDark && styles.textDark]}>{t("Language & Region", language)}</Text>
            <ChevronRight size={16} color="#94A3B8" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.listItem, isDark && styles.listItemDark, isOled && styles.listItemOled]} onPress={() => navigation.navigate('DataStorage')}>
            <View style={styles.listIconBg}><HardDrive size={20} color={isDark ? "#A5B4FC" : "#6366F1"} /></View>
            <Text style={[styles.listTitle, isDark && styles.textDark]}>{t("Data & Storage", language)}</Text>
            <ChevronRight size={16} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        <View style={styles.listSection}>
          <Text style={styles.sectionTitle}>{t("Support & About", language)}</Text>
          
          <TouchableOpacity style={[styles.listItem, isDark && styles.listItemDark, isOled && styles.listItemOled]} onPress={() => navigation.navigate('HelpSupport')}>
            <View style={styles.listIconBg}><HelpCircle size={20} color={isDark ? "#A5B4FC" : "#6366F1"} /></View>
            <Text style={[styles.listTitle, isDark && styles.textDark]}>{t("Help & Support", language)}</Text>
            <ChevronRight size={16} color="#94A3B8" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.listItem, isDark && styles.listItemDark, isOled && styles.listItemOled]} onPress={() => navigation.navigate('FeedbackRating')}>
            <View style={styles.listIconBg}><Star size={20} color={isDark ? "#A5B4FC" : "#6366F1"} /></View>
            <Text style={[styles.listTitle, isDark && styles.textDark]}>{t("Feedback & Rating", language)}</Text>
            <ChevronRight size={16} color="#94A3B8" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.listItem, isDark && styles.listItemDark, isOled && styles.listItemOled]} onPress={() => navigation.navigate('AboutInfo')}>
            <View style={styles.listIconBg}><Info size={20} color={isDark ? "#A5B4FC" : "#6366F1"} /></View>
            <Text style={[styles.listTitle, isDark && styles.textDark]}>{t("About / Info", language)}</Text>
            <ChevronRight size={16} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        <View style={styles.listSection}>
          <Text style={styles.sectionTitle}>{t("Account", language)}</Text>
          
          <TouchableOpacity style={[styles.listItem, isDark && styles.listItemDark, isOled && styles.listItemOled]} onPress={() => navigation.navigate('ManageAccount')}>
            <View style={styles.listIconBg}><Shield size={20} color={isDark ? "#A5B4FC" : "#6366F1"} /></View>
            <Text style={[styles.listTitle, isDark && styles.textDark]}>{t("Manage Account", language)}</Text>
            <ChevronRight size={16} color="#94A3B8" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.listItem, isDark && styles.listItemDark, isOled && styles.listItemOled]} onPress={() => navigation.navigate('SyncData')}>
            <View style={styles.listIconBg}><Cloud size={20} color={isDark ? "#A5B4FC" : "#6366F1"} /></View>
            <Text style={[styles.listTitle, isDark && styles.textDark]}>{t("Sync Data to Cloud", language)}</Text>
            <ChevronRight size={16} color="#94A3B8" />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.listItem, isDark && styles.listItemDark, isOled && styles.listItemOled]} onPress={handleLogout}>
            <View style={[styles.listIconBg, { backgroundColor: isDark ? 'rgba(239, 68, 68, 0.15)' : '#FEE2E2' }]}><LogOut size={20} color="#EF4444" /></View>
            <Text style={[styles.listTitle, { color: '#EF4444' }]}>{t("Logout", language)}</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    padding: 24,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#6366F1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  profileEmail: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  listSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  listIconBg: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  listTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  listValue: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  containerDark: {
    backgroundColor: '#0F172A',
  },
  containerOled: {
    backgroundColor: '#000000',
  },
  listItemDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
    borderWidth: 1,
  },
  listItemOled: {
    backgroundColor: '#121212',
    borderColor: '#1E1E1E',
  },
  textDark: {
    color: '#F8FAFC',
  }
});
