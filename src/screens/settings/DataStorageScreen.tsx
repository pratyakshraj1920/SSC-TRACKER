import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert, Switch } from 'react-native';
import { useStore } from '../../store/useStore';
import { t } from '../../utils/translations';
import { ChevronLeft, Trash2, Database, DownloadCloud, UploadCloud, RefreshCw, FileText } from 'lucide-react-native';

export default function DataStorageScreen({ navigation }: any) {
  const { theme, autoBackup, setAutoBackup, language } = useStore();
  const isDark = theme !== 'light';
  const isOled = theme === 'oled';

  const handleClearCache = () => Alert.alert("Clear Cache", "App cache (12.4 MB) has been cleared successfully.");
  const handleBackup = () => Alert.alert("Backup Complete", "Your progress has been backed up securely.");
  const handleRestore = () => Alert.alert("Restore Data", "Data has been restored from your last backup.");

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark, isOled && styles.containerOled]}>
      <View style={[styles.header, isDark && styles.headerDark, isOled && styles.headerOled]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color={isDark ? '#F8FAFC' : '#1E293B'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, isDark && styles.textDark]}>{t("Data & Storage", language)}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>{t("Storage Usage", language)}</Text>
        <View style={styles.card}>
            <View style={[styles.listItem, isDark && styles.listItemDark, isOled && styles.listItemOled]}>
                <View style={styles.listIconBg}><Database size={20} color={isDark ? "#A5B4FC" : "#6366F1"} /></View>
                <Text style={[styles.listTitle, isDark && styles.textDark]}>{t("App Size", language)}</Text>
                <Text style={styles.listValue}>45.2 MB</Text>
            </View>
            <TouchableOpacity style={[styles.listItem, isDark && styles.listItemDark, isOled && styles.listItemOled, { borderBottomWidth: 0 }]} onPress={handleClearCache}>
                <View style={[styles.listIconBg, { backgroundColor: isDark ? 'rgba(239, 68, 68, 0.15)' : '#FEE2E2' }]}><Trash2 size={20} color="#EF4444" /></View>
                <Text style={[styles.listTitle, { color: '#EF4444' }]}>{t("Clear Cache", language)}</Text>
            </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>{t("Downloaded Files", language)}</Text>
        <View style={styles.card}>
            <View style={[styles.listItem, isDark && styles.listItemDark, isOled && styles.listItemOled, { borderBottomWidth: 0 }]}>
                <View style={styles.listIconBg}><FileText size={20} color={isDark ? "#A5B4FC" : "#6366F1"} /></View>
                <View style={styles.titleContainer}>
                    <Text style={[styles.listTitle, isDark && styles.textDark]}>{t("SSC CGL Syllabus Data", language)}</Text>
                    <Text style={styles.listSubtitle}>1.2 MB • {t("Offline ready", language)}</Text>
                </View>
            </View>
        </View>

        <Text style={styles.sectionTitle}>{t("Backup & Restore", language)}</Text>
        <View style={styles.card}>
            <View style={[styles.listItem, isDark && styles.listItemDark, isOled && styles.listItemOled]}>
                <View style={styles.listIconBg}><RefreshCw size={20} color={isDark ? "#A5B4FC" : "#6366F1"} /></View>
                <View style={styles.titleContainer}>
                    <Text style={[styles.listTitle, isDark && styles.textDark]}>{t("Auto Backup", language)}</Text>
                    <Text style={styles.listSubtitle}>{t("Weekly background sync", language)}</Text>
                </View>
                <Switch 
                    value={autoBackup} 
                    onValueChange={setAutoBackup} 
                    trackColor={{ false: '#CBD5E1', true: isDark ? '#818CF8' : '#6366F1' }}
                />
            </View>
            <TouchableOpacity style={[styles.listItem, isDark && styles.listItemDark, isOled && styles.listItemOled]} onPress={handleBackup}>
                <View style={styles.listIconBg}><UploadCloud size={20} color={isDark ? "#A5B4FC" : "#6366F1"} /></View>
                <Text style={[styles.listTitle, isDark && styles.textDark]}>{t("Backup Data Now", language)}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.listItem, isDark && styles.listItemDark, isOled && styles.listItemOled, { borderBottomWidth: 0 }]} onPress={handleRestore}>
                <View style={styles.listIconBg}><DownloadCloud size={20} color={isDark ? "#A5B4FC" : "#6366F1"} /></View>
                <Text style={[styles.listTitle, isDark && styles.textDark]}>{t("Restore from Backup", language)}</Text>
            </TouchableOpacity>
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
