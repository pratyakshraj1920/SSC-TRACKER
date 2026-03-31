import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, TextInput, StatusBar } from 'react-native';
import { useStore } from '../../store/useStore';
import { t } from '../../utils/translations';
import { Search, Check, ArrowLeft } from 'lucide-react-native';

const exams = [
  { id: 'cgl', title: 'SSC CGL', desc: 'Combined Graduate Level', badge: 'TIER I & II', file: 'cgl_sllybus_data.json' },
  { id: 'chsl', title: 'SSC CHSL', desc: 'Combined Higher Secondary Level', badge: 'TIER I & II', file: 'chsl_sllybus_data.json' },
  { id: 'mts', title: 'SSC MTS', desc: 'Multi Tasking Staff', badge: 'NON-TECHNICAL', file: 'mts_sllybus_data.json' },
  { id: 'cpo', title: 'SSC CPO', desc: 'Central Police Organization', badge: 'SI IN DELHI POLICE', file: 'cpo_sllybus_data.json' },
  { id: 'steno', title: 'SSC Stenographer', desc: 'Grade C & D Examination', badge: 'SKILL TEST BASED', file: 'stenographer_sllybus_data.json' },
  { id: 'je', title: 'SSC JE', desc: 'Junior Engineer', badge: 'TIER I & II', file: 'je_sllybus_data.json' },
];

export default function ExamSelectionScreen({ navigation }: any) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const { setExam, language } = useStore();
  const canGoBack = navigation.canGoBack();

  const filteredExams = exams.filter(e => 
    e.title.toLowerCase().includes(search.toLowerCase()) || 
    e.desc.toLowerCase().includes(search.toLowerCase())
  );

  const handleConfirm = () => {
    if (selected) {
      const examObj = exams.find(e => e.id === selected);
      if (examObj) {
        // Load data dynamically (in a real app you'd import it or fetch it)
        // Since react-native bundler needs static requires or fetch from URI, we will require it here dynamically if possible
        // Let's use a switch statement for static requires
        let data = [];
        switch(selected) {
            case 'cgl': data = require('../../../assets/data/cgl_sllybus_data.json'); break;
            case 'chsl': data = require('../../../assets/data/chsl_sllybus_data.json'); break;
            case 'mts': data = require('../../../assets/data/mts_sllybus_data.json'); break;
            case 'cpo': data = require('../../../assets/data/cpo_sllybus_data.json'); break;
            case 'steno': data = require('../../../assets/data/stenographer_sllybus_data.json'); break;
            case 'je': data = require('../../../assets/data/je_sllybus_data.json'); break;
            default: data = require('../../../assets/data/cgl_sllybus_data.json');
        }
        setExam(selected, data);
        navigation.navigate('MainTabs');
      }
    }
  };

  const renderItem = ({ item }: { item: typeof exams[0] }) => {
    const isSelected = selected === item.id;
    return (
      <TouchableOpacity 
        style={[styles.card, isSelected && styles.cardSelected]} 
        activeOpacity={0.7}
        onPress={() => setSelected(item.id)}
      >
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardDesc}>{item.desc}</Text>
        </View>
        <View style={styles.badgeContainer}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.badge}</Text>
          </View>
          <View style={[styles.radio, isSelected && styles.radioSelected]}>
            {isSelected && <Check size={14} color="#FFF" />}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        {canGoBack && (
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft size={24} color="#1E293B" />
          </TouchableOpacity>
        )}
        <Text style={styles.overhead}>{t("CURATOR PANEL", language)}</Text>
        <Text style={styles.title}>{t("Select Your Exam", language)}</Text>
        <Text style={styles.subtitle}>{t("Choose the SSC certification you are preparing for to personalize your tracking syllabus.", language)}</Text>
        
        <View style={styles.searchBar}>
          <Search size={20} color="#94A3B8" style={styles.searchIcon} />
          <TextInput 
            style={styles.searchInput}
            placeholder={t("Search for SSC Exams...", language)}
            placeholderTextColor="#94A3B8"
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      <FlatList 
        data={filteredExams}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.confirmButton, !selected && styles.confirmButtonDisabled]} 
          onPress={handleConfirm}
          disabled={!selected}
        >
          <Text style={styles.confirmButtonText}>{t("Confirm Selection", language)} →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  backButton: {
    marginBottom: 16,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  overhead: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6366F1',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#64748B',
    lineHeight: 22,
    marginBottom: 24,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
  },
  listContainer: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardSelected: {
    borderColor: '#818CF8',
    backgroundColor: '#F3F4F6',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 13,
    color: '#64748B',
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 12,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#475569',
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  radioSelected: {
    borderColor: '#4F46E5',
    backgroundColor: '#4F46E5',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    backgroundColor: 'rgba(248, 250, 252, 0.9)',
  },
  confirmButton: {
    backgroundColor: '#6366F1',
    height: 56,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  confirmButtonDisabled: {
    backgroundColor: '#94A3B8',
    shadowOpacity: 0,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  }
});
