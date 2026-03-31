import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useStore } from '../../store/useStore';
import { t } from '../../utils/translations';
import { ChevronLeft, User, Mail, Phone, Lock, Edit3, LogOut, Trash2 } from 'lucide-react-native';

export default function ManageAccountScreen({ navigation }: any) {
  const { theme, logout, language } = useStore();
  const isDark = theme !== 'light';
  const isOled = theme === 'oled';

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('SSC Aspirant');
  const [phone, setPhone] = useState('+91 9876543210');

  const handleSave = () => {
      setIsEditing(false);
      Alert.alert("Profile Updated", "Your account information has been saved successfully.");
  };

  const handleChangePassword = () => Alert.alert("Change Password", "A password reset link has been sent to your email.");

  const handleDeleteAccount = () => {
      Alert.alert(
          "Delete Account", 
          "Are you sure you want to permanently delete your account? All progress will be lost.",
          [
              { text: "Cancel", style: "cancel" },
              { text: "Delete", style: "destructive", onPress: () => {
                  Alert.alert("Account Deleted", "Your account has been deleted.");
                  logout();
              }}
          ]
      );
  };

  const handleLogout = () => {
      Alert.alert(
          "Logout", 
          "Are you sure you want to log out?",
          [
              { text: "Cancel", style: "cancel" },
              { text: "Logout", style: "destructive", onPress: logout }
          ]
      );
  };

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark, isOled && styles.containerOled]}>
      <View style={[styles.header, isDark && styles.headerDark, isOled && styles.headerOled]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color={isDark ? '#F8FAFC' : '#1E293B'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, isDark && styles.textDark]}>{t("Manage Account", language)}</Text>
        <TouchableOpacity onPress={() => isEditing ? handleSave() : setIsEditing(true)}>
            <Text style={styles.headerAction}>{isEditing ? t("Save", language) : t("Edit", language)}</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content}>
            
            <View style={styles.profileSection}>
                <View style={styles.avatarPlaceholder}>
                    <User color="#FFF" size={40} />
                </View>
                {!isEditing && <Text style={[styles.profileName, isDark && styles.textDark]}>{name}</Text>}
            </View>

            <Text style={styles.sectionTitle}>{t("Personal Information", language)}</Text>
            <View style={styles.card}>
                <View style={[styles.listItem, isDark && styles.listItemDark, isOled && styles.listItemOled]}>
                    <View style={styles.listIconBg}><User size={20} color={isDark ? "#A5B4FC" : "#6366F1"} /></View>
                    <View style={styles.titleContainer}>
                        <Text style={[styles.listTitle, isDark && styles.textDark]}>{t("Full Name", language)}</Text>
                        {isEditing ? (
                            <TextInput style={[styles.inputInline, isDark && styles.textDark]} value={name} onChangeText={setName} />
                        ) : (
                            <Text style={styles.listSubtitle}>{name}</Text>
                        )}
                    </View>
                </View>

                <View style={[styles.listItem, isDark && styles.listItemDark, isOled && styles.listItemOled]}>
                    <View style={styles.listIconBg}><Mail size={20} color={isDark ? "#A5B4FC" : "#6366F1"} /></View>
                    <View style={styles.titleContainer}>
                        <Text style={[styles.listTitle, isDark && styles.textDark]}>{t("Email Address", language)}</Text>
                        <Text style={[styles.listSubtitle, { color: '#94A3B8' }]}>aspirant@example.com</Text>
                    </View>
                </View>

                <View style={[styles.listItem, isDark && styles.listItemDark, isOled && styles.listItemOled, { borderBottomWidth: 0 }]}>
                    <View style={styles.listIconBg}><Phone size={20} color={isDark ? "#A5B4FC" : "#6366F1"} /></View>
                    <View style={styles.titleContainer}>
                        <Text style={[styles.listTitle, isDark && styles.textDark]}>{t("Phone Number", language)}</Text>
                        {isEditing ? (
                            <TextInput style={[styles.inputInline, isDark && styles.textDark]} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
                        ) : (
                            <Text style={styles.listSubtitle}>{phone}</Text>
                        )}
                    </View>
                </View>
            </View>

            <Text style={styles.sectionTitle}>{t("Security", language)}</Text>
            <View style={styles.card}>
                <TouchableOpacity style={[styles.listItem, isDark && styles.listItemDark, isOled && styles.listItemOled, { borderBottomWidth: 0 }]} onPress={handleChangePassword}>
                    <View style={styles.listIconBg}><Lock size={20} color={isDark ? "#A5B4FC" : "#6366F1"} /></View>
                    <Text style={[styles.listTitle, isDark && styles.textDark]}>{t("Change Password", language)}</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>{t("Account Actions", language)}</Text>
            <View style={styles.card}>
                <TouchableOpacity style={[styles.listItem, isDark && styles.listItemDark, isOled && styles.listItemOled]} onPress={handleLogout}>
                    <View style={[styles.listIconBg, { backgroundColor: isDark ? 'rgba(239, 68, 68, 0.15)' : '#FEE2E2' }]}><LogOut size={20} color="#EF4444" /></View>
                    <Text style={[styles.listTitle, { color: '#EF4444' }]}>{t("Logout", language)}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.listItem, isDark && styles.listItemDark, isOled && styles.listItemOled, { borderBottomWidth: 0 }]} onPress={handleDeleteAccount}>
                    <View style={[styles.listIconBg, { backgroundColor: isDark ? 'rgba(239, 68, 68, 0.15)' : '#FEE2E2' }]}><Trash2 size={20} color="#EF4444" /></View>
                    <View style={styles.titleContainer}>
                        <Text style={[styles.listTitle, { color: '#EF4444' }]}>{t("Delete Account", language)}</Text>
                        <Text style={styles.listSubtitle}>{t("Permanently remove your data.", language)}</Text>
                    </View>
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
  headerAction: { fontSize: 16, fontWeight: '600', color: '#6366F1', paddingRight: 4 },
  textDark: { color: '#F8FAFC' },
  content: { padding: 20 },
  
  profileSection: { alignItems: 'center', marginBottom: 24, marginTop: 8 },
  avatarPlaceholder: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#6366F1', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  profileName: { fontSize: 20, fontWeight: 'bold', color: '#1E293B' },

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
  titleContainer: { flex: 1 },
  listSubtitle: { fontSize: 14, color: '#64748B', marginTop: 4 },
  
  inputInline: {
      fontSize: 14, color: '#1E293B', padding: 0, marginTop: 4, borderBottomWidth: 1, borderBottomColor: '#6366F1', paddingBottom: 2
  }
});
