import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useStore } from '../../store/useStore';
import { t } from '../../utils/translations';
import { ChevronLeft, Star, Send, Lightbulb } from 'lucide-react-native';

export default function FeedbackRatingScreen({ navigation }: any) {
  const { theme, language } = useStore();
  const isDark = theme !== 'light';
  const isOled = theme === 'oled';

  const [feedbackType, setFeedbackType] = useState<'feedback' | 'feature'>('feedback');
  const [feedbackText, setFeedbackText] = useState('');

  const handleRateUs = () => Alert.alert("Rate Us", "Redirecting to Google Play Store...");
  
  const submitFeedback = () => {
      if (!feedbackText.trim()) return Alert.alert("Error", "Please enter your text.");
      Alert.alert("Success", `Your ${feedbackType} has been submitted successfully. Thank you!`);
      setFeedbackText('');
  };

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark, isOled && styles.containerOled]}>
      <View style={[styles.header, isDark && styles.headerDark, isOled && styles.headerOled]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color={isDark ? '#F8FAFC' : '#1E293B'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, isDark && styles.textDark]}>{t("Feedback & Rating", language)}</Text>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content}>
            
            <View style={styles.card}>
                <TouchableOpacity style={[styles.listItem, isDark && styles.listItemDark, isOled && styles.listItemOled, { borderBottomWidth: 0 }]} onPress={handleRateUs}>
                    <View style={[styles.listIconBg, { backgroundColor: isDark ? 'rgba(234, 179, 8, 0.15)' : '#FEF9C3' }]}><Star size={20} color="#EAB308" /></View>
                    <View style={styles.titleContainer}>
                        <Text style={[styles.listTitle, isDark && styles.textDark]}>{t("Rate on Play Store", language)}</Text>
                        <Text style={styles.listSubtitle}>{t("If you love the app, please rate us 5 stars!", language)}</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>{t("We value your thoughts", language)}</Text>
            <View style={[styles.card, { padding: 16 }, isDark && styles.listItemDark, isOled && styles.listItemOled]}>
                
                <View style={styles.tabContainer}>
                    <TouchableOpacity 
                        style={[styles.tab, feedbackType === 'feedback' && styles.tabActive]} 
                        onPress={() => setFeedbackType('feedback')}
                    >
                        <Send size={16} color={feedbackType === 'feedback' ? '#FFFFFF' : '#64748B'} style={{ marginRight: 6 }} />
                        <Text style={[styles.tabText, feedbackType === 'feedback' && { color: '#FFFFFF' }]}>{t("Feedback", language)}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.tab, feedbackType === 'feature' && styles.tabActive]} 
                        onPress={() => setFeedbackType('feature')}
                    >
                        <Lightbulb size={16} color={feedbackType === 'feature' ? '#FFFFFF' : '#64748B'} style={{ marginRight: 6 }} />
                        <Text style={[styles.tabText, feedbackType === 'feature' && { color: '#FFFFFF' }]}>{t("Feature Request", language)}</Text>
                    </TouchableOpacity>
                </View>

                <TextInput
                    style={[styles.input, isDark && styles.inputDark]}
                    placeholder={feedbackType === 'feedback' ? t("Tell us what you like or dislike...", language) : t("What feature should we add next?", language)}
                    placeholderTextColor="#94A3B8"
                    multiline
                    numberOfLines={6}
                    value={feedbackText}
                    onChangeText={setFeedbackText}
                    textAlignVertical="top"
                />
                
                <TouchableOpacity style={styles.submitBtn} onPress={submitFeedback}>
                    <Text style={styles.submitBtnText}>{t("Submit", language)}</Text>
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
  sectionTitle: { fontSize: 13, fontWeight: 'bold', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12, marginLeft: 4, marginTop: 12 },
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
  listIconBg: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#EEF2FF', alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  listTitle: { flex: 1, fontSize: 16, fontWeight: '600', color: '#1E293B' },
  titleContainer: { flex: 1, marginRight: 8 },
  listSubtitle: { fontSize: 13, color: '#64748B', marginTop: 4 },
  
  tabContainer: { flexDirection: 'row', backgroundColor: '#F1F5F9', borderRadius: 12, padding: 4, marginBottom: 16 },
  tab: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, borderRadius: 8 },
  tabActive: { backgroundColor: '#6366F1' },
  tabText: { fontSize: 14, fontWeight: '600', color: '#64748B' },
  
  input: {
      backgroundColor: '#F8FAFC', borderRadius: 12, padding: 16, fontSize: 15, color: '#1E293B', minHeight: 120
  },
  inputDark: { backgroundColor: '#0F172A', color: '#F8FAFC' },
  submitBtn: { backgroundColor: '#6366F1', borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginTop: 16 },
  submitBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' }
});
