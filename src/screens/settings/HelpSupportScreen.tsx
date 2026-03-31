import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useStore } from '../../store/useStore';
import { t } from '../../utils/translations';
import { ChevronLeft, Mail, MessageCircle, HelpCircle, BookOpen, ChevronDown, ChevronUp, Bug } from 'lucide-react-native';

export default function HelpSupportScreen({ navigation }: any) {
  const { theme, language } = useStore();
  const isDark = theme !== 'light';
  const isOled = theme === 'oled';

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [bugReport, setBugReport] = useState('');

  const faqs = [
      { q: "How do I sync my progress?", a: "Go to Settings > Sync Data to Cloud and click 'Sync Now'." },
      { q: "Can I use this app offline?", a: "Yes, once the syllabus is loaded, you can track progress completely offline." },
      { q: "How do I mark a topic as tough?", a: "Navigate to any chapter and click the red 'Tough' button." }
  ];

  const handleContact = (method: string) => Alert.alert(`Contact ${method}`, `Redirecting to ${method} support...`);
  
  const submitBug = () => {
      if (!bugReport.trim()) return Alert.alert("Error", "Please enter a bug description.");
      Alert.alert("Bug Reported", "Thank you for helping us improve. Our team will look into it.");
      setBugReport('');
  };

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark, isOled && styles.containerOled]}>
      <View style={[styles.header, isDark && styles.headerDark, isOled && styles.headerOled]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color={isDark ? '#F8FAFC' : '#1E293B'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, isDark && styles.textDark]}>{t("Help & Support", language)}</Text>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.sectionTitle}>{t("Contact Us", language)}</Text>
            <View style={styles.card}>
                <TouchableOpacity style={[styles.listItem, isDark && styles.listItemDark, isOled && styles.listItemOled]} onPress={() => handleContact('Email')}>
                    <View style={styles.listIconBg}><Mail size={20} color={isDark ? "#A5B4FC" : "#6366F1"} /></View>
                    <Text style={[styles.listTitle, isDark && styles.textDark]}>{t("Email Support", language)}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.listItem, isDark && styles.listItemDark, isOled && styles.listItemOled, { borderBottomWidth: 0 }]} onPress={() => handleContact('WhatsApp')}>
                    <View style={[styles.listIconBg, { backgroundColor: isDark ? 'rgba(34, 197, 94, 0.15)' : '#DCFCE7' }]}><MessageCircle size={20} color="#22C55E" /></View>
                    <Text style={[styles.listTitle, isDark && styles.textDark]}>{t("WhatsApp Chat", language)}</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>{t("Resources", language)}</Text>
            <View style={styles.card}>
                <TouchableOpacity style={[styles.listItem, isDark && styles.listItemDark, isOled && styles.listItemOled, { borderBottomWidth: 0 }]} onPress={() => handleContact('App Guide')}>
                    <View style={styles.listIconBg}><BookOpen size={20} color={isDark ? "#A5B4FC" : "#6366F1"} /></View>
                    <Text style={[styles.listTitle, isDark && styles.textDark]}>{t("App Guide / Tutorial", language)}</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>{t("FAQ", language)}</Text>
            <View style={styles.card}>
                {faqs.map((faq, index) => (
                    <View key={index} style={[styles.faqItem, isDark && styles.listItemDark, isOled && styles.listItemOled, index === faqs.length - 1 && { borderBottomWidth: 0 }]}>
                        <TouchableOpacity style={styles.faqHeader} onPress={() => setExpandedFaq(expandedFaq === index ? null : index)}>
                            <Text style={[styles.listTitle, isDark && styles.textDark, { fontSize: 15 }]}>{faq.q}</Text>
                            {expandedFaq === index ? <ChevronUp size={20} color="#94A3B8" /> : <ChevronDown size={20} color="#94A3B8" />}
                        </TouchableOpacity>
                        {expandedFaq === index && (
                            <Text style={styles.faqAnswer}>{faq.a}</Text>
                        )}
                    </View>
                ))}
            </View>

            <Text style={styles.sectionTitle}>{t("Report a Bug", language)}</Text>
            <View style={[styles.card, { padding: 16 }, isDark && styles.listItemDark, isOled && styles.listItemOled]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                    <Bug size={20} color={isDark ? "#A5B4FC" : "#6366F1"} style={{ marginRight: 8 }} />
                    <Text style={[styles.listTitle, isDark && styles.textDark]}>{t("Describe the issue", language)}</Text>
                </View>
                <TextInput
                    style={[styles.input, isDark && styles.inputDark]}
                    placeholder={t("E.g. The app crashed when I clicked...", language)}
                    placeholderTextColor="#94A3B8"
                    multiline
                    numberOfLines={4}
                    value={bugReport}
                    onChangeText={setBugReport}
                    textAlignVertical="top"
                />
                <TouchableOpacity style={styles.submitBtn} onPress={submitBug}>
                    <Text style={styles.submitBtnText}>{t("Submit Report", language)}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  listIconBg: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#EEF2FF', alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  listTitle: { flex: 1, fontSize: 16, fontWeight: '600', color: '#1E293B' },
  faqItem: { backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  faqHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  faqAnswer: { paddingHorizontal: 16, paddingBottom: 16, fontSize: 14, color: '#64748B', lineHeight: 20 },
  input: {
      backgroundColor: '#F8FAFC', borderRadius: 12, padding: 12, fontSize: 15, color: '#1E293B', minHeight: 100
  },
  inputDark: { backgroundColor: '#0F172A', color: '#F8FAFC' },
  submitBtn: { backgroundColor: '#6366F1', borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginTop: 16 },
  submitBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' }
});
