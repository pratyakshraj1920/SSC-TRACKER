import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useStore, StatusType } from '../store/useStore';
import { Check, AlertCircle, Clock } from 'lucide-react-native';
import { t } from '../utils/translations';

interface Props {
  title: string;
  progress?: number; // 0-100
  status: StatusType;
  onStatusChange?: (status: StatusType) => void;
  onPress?: () => void;
  hideButtons?: boolean;
}

export default function ProgressCard({ title, progress, status, onStatusChange, onPress, hideButtons = false }: Props) {
  const { theme, language } = useStore();
  const isDark = theme !== 'light';
  const isOled = theme === 'oled';
  
  const handleTick = (newStatus: StatusType) => {
    if (onStatusChange) {
      // Toggle off if clicking the same active status
      onStatusChange(status === newStatus ? 'unmarked' : newStatus);
    }
  };

  return (
    <TouchableOpacity style={[styles.card, isDark && styles.cardDark, isOled && styles.cardOled]} onPress={onPress} activeOpacity={onPress ? 0.7 : 1}>
      <View style={styles.header}>
        <Text style={[styles.title, isDark && styles.textDark]} numberOfLines={2}>{title}</Text>
        {progress !== undefined && (
          <Text style={[styles.progressText, isDark && styles.progressTextDark]}>{Math.round(progress)}%</Text>
        )}
      </View>

      {progress !== undefined && (
        <View style={[styles.progressBarBg, isDark && styles.progressBarBgDark, isOled && styles.progressBarBgOled]}>
          <View style={[styles.progressBarFill, isDark && styles.progressBarFillDark, { width: `${progress}%` }]} />
        </View>
      )}

      {!hideButtons && (
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={[styles.statusBtn, isDark && styles.statusBtnDark, isOled && styles.statusBtnOled, status === 'completed' && styles.btnCompleted]} 
            onPress={() => handleTick('completed')}
          >
            <Check size={16} color={status === 'completed' ? '#FFF' : '#10B981'} />
            <Text style={[styles.btnText, isDark && styles.btnTextDark, { color: status === 'completed' ? '#FFF' : '#10B981' }]}>{t("Completed", language)}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.statusBtn, isDark && styles.statusBtnDark, isOled && styles.statusBtnOled, status === 'moderate' && styles.btnModerate]} 
            onPress={() => handleTick('moderate')}
          >
            <Clock size={16} color={status === 'moderate' ? (isDark ? '#F8FAFC' : '#1E293B') : '#F59E0B'} />
            <Text style={[styles.btnText, isDark && styles.btnTextDark, { color: status === 'moderate' ? (isDark ? '#F8FAFC' : '#1E293B') : '#F59E0B' }]}>{t("Moderate", language)}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.statusBtn, isDark && styles.statusBtnDark, isOled && styles.statusBtnOled, status === 'hard' && styles.btnHard]} 
            onPress={() => handleTick('hard')}
          >
            <AlertCircle size={16} color={status === 'hard' ? '#FFF' : '#EF4444'} />
            <Text style={[styles.btnText, isDark && styles.btnTextDark, { color: status === 'hard' ? '#FFF' : '#EF4444' }]}>{t("Tough", language)}</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    flex: 1,
    marginRight: 16,
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6366F1',
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    marginBottom: 16,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 3,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  statusBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
    gap: 6,
  },
  btnCompleted: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  btnModerate: {
    backgroundColor: '#FCD34D',
    borderColor: '#FBBF24',
  },
  btnHard: {
    backgroundColor: '#EF4444',
    borderColor: '#EF4444',
  },
  btnText: {
    fontSize: 12,
    fontWeight: '600',
  },
  cardDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
  cardOled: {
    backgroundColor: '#121212',
    borderColor: '#1E1E1E',
  },
  textDark: {
    color: '#F8FAFC',
  },
  progressTextDark: {
    color: '#A5B4FC',
  },
  progressBarBgDark: {
    backgroundColor: '#0F172A',
  },
  progressBarBgOled: {
    backgroundColor: '#1E1E1E',
  },
  progressBarFillDark: {
    backgroundColor: '#A5B4FC',
  },
  statusBtnDark: {
    backgroundColor: '#0F172A',
    borderColor: '#334155',
  },
  statusBtnOled: {
    backgroundColor: '#1E1E1E',
    borderColor: '#27272A',
  },
  btnTextDark: {
    // Dynamic text colors handled inside inline styles mostly
  }
});
