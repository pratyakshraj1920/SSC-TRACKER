import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Switch, ActivityIndicator } from 'react-native';
import { useStore } from '../../store/useStore';
import { t } from '../../utils/translations';
import { ChevronLeft, Cloud, RefreshCw, CheckCircle, XCircle } from 'lucide-react-native';

export default function SyncDataScreen({ navigation }: any) {
  const { theme, autoSync, setAutoSync, lastSyncTime, setLastSyncTime, language } = useStore();
  const isDark = theme !== 'light';
  const isOled = theme === 'oled';

  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle'|'success'|'error'>('idle');

  const handleSyncNow = () => {
      setIsSyncing(true);
      setSyncStatus('idle');
      
      // Simulate network request
      setTimeout(() => {
          setIsSyncing(false);
          setSyncStatus('success');
          
          const now = new Date();
          const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' on ' + now.toLocaleDateString();
          setLastSyncTime(timeString);
      }, 2000);
  };

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark, isOled && styles.containerOled]}>
      <View style={[styles.header, isDark && styles.headerDark, isOled && styles.headerOled]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color={isDark ? '#F8FAFC' : '#1E293B'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, isDark && styles.textDark]}>{t("Cloud Sync", language)}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.statusContainer}>
            <View style={[styles.cloudCircle, isDark && styles.cloudCircleDark]}>
                {isSyncing ? (
                    <ActivityIndicator size="large" color="#6366F1" />
                ) : (
                    <Cloud size={48} color={syncStatus === 'error' ? '#EF4444' : syncStatus === 'success' ? '#10B981' : '#6366F1'} />
                )}
            </View>
            <Text style={[styles.statusText, isDark && styles.textDark]}>
                {isSyncing ? t("Syncing data...", language) : syncStatus === 'success' ? t("All Data Synced", language) : syncStatus === 'error' ? t("Sync Failed", language) : t("Ready to Sync", language)}
            </Text>
            <Text style={styles.lastSyncText}>
                {t("Last synced: ", language)}{lastSyncTime ? lastSyncTime : t("Never", language)}
            </Text>
        </View>

        <TouchableOpacity 
            style={[styles.syncBtn, isSyncing && { opacity: 0.7 }]} 
            onPress={handleSyncNow}
            disabled={isSyncing}
        >
            <RefreshCw size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
            <Text style={styles.syncBtnText}>{isSyncing ? t("Syncing...", language) : t("Sync Now", language)}</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>{t("Preferences", language)}</Text>
        <View style={styles.card}>
            <View style={[styles.listItem, isDark && styles.listItemDark, isOled && styles.listItemOled, { borderBottomWidth: 0 }]}>
                <View style={styles.listIconBg}><RefreshCw size={20} color={isDark ? "#A5B4FC" : "#6366F1"} /></View>
                <View style={styles.titleContainer}>
                    <Text style={[styles.listTitle, isDark && styles.textDark]}>{t("Auto Sync", language)}</Text>
                    <Text style={styles.listSubtitle}>{t("Sync progress whenever app opens", language)}</Text>
                </View>
                <Switch 
                    value={autoSync} 
                    onValueChange={setAutoSync} 
                    trackColor={{ false: '#CBD5E1', true: isDark ? '#818CF8' : '#6366F1' }}
                />
            </View>
        </View>

        {syncStatus === 'success' && (
            <View style={styles.infoBanner}>
                <CheckCircle size={20} color="#10B981" />
                <Text style={styles.infoText}>{t("Your data is safely backed up to the cloud.", language)}</Text>
            </View>
        )}

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
  
  statusContainer: { alignItems: 'center', marginTop: 32, marginBottom: 32 },
  cloudCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#EEF2FF', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  cloudCircleDark: { backgroundColor: 'rgba(99, 102, 241, 0.1)' },
  statusText: { fontSize: 20, fontWeight: 'bold', color: '#1E293B', marginBottom: 8 },
  lastSyncText: { fontSize: 14, color: '#64748B' },

  syncBtn: { flexDirection: 'row', backgroundColor: '#6366F1', borderRadius: 12, paddingVertical: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 40, shadowColor: '#6366F1', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 },
  syncBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },

  sectionTitle: { fontSize: 13, fontWeight: 'bold', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12, marginLeft: 4 },
  card: {
    backgroundColor: '#FFFFFF', borderRadius: 16, marginBottom: 24,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 4, elevation: 1,
    overflow: 'hidden'
  },
  listItem: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 16,
    borderBottomWidth: 1, borderBottomColor: '#F1F5F9'
  },
  listItemDark: { backgroundColor: '#1E293B', borderBottomColor: '#334155' },
  listItemOled: { backgroundColor: '#121212', borderBottomColor: '#27272A' },
  listIconBg: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#EEF2FF', alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  listTitle: { fontSize: 16, fontWeight: '600', color: '#1E293B' },
  titleContainer: { flex: 1, marginRight: 8 },
  listSubtitle: { fontSize: 13, color: '#64748B', marginTop: 4 },

  infoBanner: { flexDirection: 'row', backgroundColor: '#ECFDF5', borderRadius: 12, padding: 16, alignItems: 'center' },
  infoText: { marginLeft: 12, color: '#065F46', fontSize: 14, fontWeight: '500', flex: 1 }
});
