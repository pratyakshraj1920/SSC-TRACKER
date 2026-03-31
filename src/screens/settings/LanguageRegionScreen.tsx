import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useStore } from '../../store/useStore';
import { t } from '../../utils/translations';
import { ChevronLeft, Globe, MapPin, Calendar, Clock, Check } from 'lucide-react-native';

export default function LanguageRegionScreen({ navigation }: any) {
  const { theme, language, setLanguage, dateFormat, setDateFormat, timeFormat, setTimeFormat } = useStore();
  const isDark = theme !== 'light';
  const isOled = theme === 'oled';

  const renderOption = (icon: any, title: string, currentValue: string, options: string[], onSelect: (val: string) => void) => (
    <View style={styles.card}>
        <View style={[styles.cardHeader, isDark && styles.cardHeaderDark, isOled && styles.cardHeaderOled]}>
            <View style={styles.listIconBg}>{icon}</View>
            <Text style={[styles.sectionTitle, isDark && styles.textDark]}>{t(title, language)}</Text>
        </View>
        {options.map((opt, index) => {
            const isSelected = currentValue === opt;
            return (
                <TouchableOpacity 
                    key={opt}
                    style={[
                        styles.listItem, 
                        isDark && styles.listItemDark, 
                        isOled && styles.listItemOled,
                        index === options.length - 1 && { borderBottomWidth: 0 }
                    ]} 
                    onPress={() => onSelect(opt)}
                >
                    <Text style={[styles.listTitle, isDark && styles.textDark, isSelected && styles.selectedText]}>{t(opt, language)}</Text>
                    {isSelected && <Check size={20} color="#6366F1" />}
                </TouchableOpacity>
            )
        })}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark, isOled && styles.containerOled]}>
      <View style={[styles.header, isDark && styles.headerDark, isOled && styles.headerOled]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color={isDark ? '#F8FAFC' : '#1E293B'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, isDark && styles.textDark]}>{t("Language & Region", language)}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {renderOption(
            <Globe size={20} color={isDark ? "#A5B4FC" : "#6366F1"} />, 
            "App Language", 
            language, 
            ['English', 'Hindi'], 
            (val) => setLanguage(val as any)
        )}

        {renderOption(
            <Calendar size={20} color={isDark ? "#A5B4FC" : "#6366F1"} />, 
            "Date Format", 
            dateFormat, 
            ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD'], 
            setDateFormat
        )}

        {renderOption(
            <Clock size={20} color={isDark ? "#A5B4FC" : "#6366F1"} />, 
            "Time Format", 
            timeFormat, 
            ['12-hour', '24-hour'], 
            (val) => setTimeFormat(val as any)
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
  card: {
    backgroundColor: '#FFFFFF', borderRadius: 16, marginBottom: 24,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 4, elevation: 1,
    overflow: 'hidden'
  },
  cardHeader: {
      flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#F8FAFC', borderBottomWidth: 1, borderBottomColor: '#F1F5F9'
  },
  cardHeaderDark: { backgroundColor: '#0F172A', borderBottomColor: '#334155' },
  cardHeaderOled: { backgroundColor: '#000000', borderBottomColor: '#27272A' },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1E293B' },
  listItem: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF', padding: 16,
    borderBottomWidth: 1, borderBottomColor: '#F1F5F9'
  },
  listItemDark: { backgroundColor: '#1E293B', borderBottomColor: '#334155' },
  listItemOled: { backgroundColor: '#121212', borderBottomColor: '#27272A' },
  listIconBg: { width: 32, height: 32, borderRadius: 8, backgroundColor: '#EEF2FF', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  listTitle: { fontSize: 15, fontWeight: '500', color: '#475569' },
  selectedText: { color: '#6366F1', fontWeight: 'bold' }
});
