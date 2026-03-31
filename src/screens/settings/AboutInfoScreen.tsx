import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert, Linking } from 'react-native';
import { useStore } from '../../store/useStore';
import { t } from '../../utils/translations';
import { ChevronLeft, Info, FileText, FileCheck, Code, ExternalLink } from 'lucide-react-native';

export default function AboutInfoScreen({ navigation }: any) {
  const { theme, language } = useStore();
  const isDark = theme !== 'light';
  const isOled = theme === 'oled';

  const handleLink = (title: string) => {
      Alert.alert(title, `Opening ${title} document...`);
  };

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark, isOled && styles.containerOled]}>
      <View style={[styles.header, isDark && styles.headerDark, isOled && styles.headerOled]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color={isDark ? '#F8FAFC' : '#1E293B'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, isDark && styles.textDark]}>{t("About / Info", language)}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.logoContainer}>
            <View style={styles.logoPlaceholder}>
                <Info size={40} color="#FFFFFF" />
            </View>
            <Text style={[styles.appName, isDark && styles.textDark]}>SSC Syllabus Tracker</Text>
            <Text style={styles.version}>{t("Version", language)} 1.0.4</Text>
        </View>

        <Text style={styles.sectionTitle}>{t("App Details", language)}</Text>
        <View style={styles.card}>
            <View style={[styles.listItem, isDark && styles.listItemDark, isOled && styles.listItemOled]}>
                <Text style={[styles.listTitle, isDark && styles.textDark]}>{t("Developer", language)}</Text>
                <Text style={styles.listValue}>P.K. Studios</Text>
            </View>
            <View style={[styles.listItem, isDark && styles.listItemDark, isOled && styles.listItemOled, { borderBottomWidth: 0 }]}>
                <Text style={[styles.listTitle, isDark && styles.textDark]}>{t("Build Date", language)}</Text>
                <Text style={styles.listValue}>Oct 2023</Text>
            </View>
        </View>

        <Text style={styles.sectionTitle}>{t("Legal & Licenses", language)}</Text>
        <View style={styles.card}>
            <TouchableOpacity style={[styles.listItemIcon, isDark && styles.listItemDark, isOled && styles.listItemOled]} onPress={() => handleLink("Privacy Policy")}>
                <View style={styles.listIconBg}><FileCheck size={20} color={isDark ? "#A5B4FC" : "#6366F1"} /></View>
                <Text style={[styles.listTitle, isDark && styles.textDark]}>{t("Privacy Policy", language)}</Text>
                <ExternalLink size={16} color="#94A3B8" />
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.listItemIcon, isDark && styles.listItemDark, isOled && styles.listItemOled]} onPress={() => handleLink("Terms & Conditions")}>
                <View style={styles.listIconBg}><FileText size={20} color={isDark ? "#A5B4FC" : "#6366F1"} /></View>
                <Text style={[styles.listTitle, isDark && styles.textDark]}>{t("Terms & Conditions", language)}</Text>
                <ExternalLink size={16} color="#94A3B8" />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.listItemIcon, isDark && styles.listItemDark, isOled && styles.listItemOled, { borderBottomWidth: 0 }]} onPress={() => handleLink("Open Source Licenses")}>
                <View style={styles.listIconBg}><Code size={20} color={isDark ? "#A5B4FC" : "#6366F1"} /></View>
                <Text style={[styles.listTitle, isDark && styles.textDark]}>{t("Open Source Licenses", language)}</Text>
                <ExternalLink size={16} color="#94A3B8" />
            </TouchableOpacity>
        </View>

        <Text style={styles.copyright}>© 2023 SSC Syllabus Tracker. All rights reserved.</Text>

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
  
  logoContainer: { alignItems: 'center', marginTop: 20, marginBottom: 40 },
  logoPlaceholder: { width: 80, height: 80, borderRadius: 20, backgroundColor: '#6366F1', alignItems: 'center', justifyContent: 'center', marginBottom: 16, shadowColor: '#6366F1', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 },
  appName: { fontSize: 22, fontWeight: 'bold', color: '#1E293B' },
  version: { fontSize: 14, color: '#64748B', marginTop: 4 },

  sectionTitle: { fontSize: 13, fontWeight: 'bold', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12, marginLeft: 4 },
  card: {
    backgroundColor: '#FFFFFF', borderRadius: 16, marginBottom: 24,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 4, elevation: 1,
    overflow: 'hidden'
  },
  listItem: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF', padding: 16,
    borderBottomWidth: 1, borderBottomColor: '#F1F5F9'
  },
  listItemIcon: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 16,
    borderBottomWidth: 1, borderBottomColor: '#F1F5F9'
  },
  listItemDark: { backgroundColor: '#1E293B', borderBottomColor: '#334155' },
  listItemOled: { backgroundColor: '#121212', borderBottomColor: '#27272A' },
  listIconBg: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#EEF2FF', alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  listTitle: { flex: 1, fontSize: 16, fontWeight: '500', color: '#1E293B' },
  listValue: { fontSize: 15, color: '#64748B' },
  copyright: { textAlign: 'center', fontSize: 12, color: '#94A3B8', marginTop: 10 }
});
