import React, { useMemo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useStore } from '../../store/useStore';
import { getTopicsByStatus } from '../../utils/progressHelpers';
import { t } from '../../utils/translations';
import { XCircle, CheckCircle } from 'lucide-react-native';

export default function FilteredStatusScreen({ route, navigation }: any) {
  const { chapterPath, status, chapterName } = route.params;
  const { examData, theme, statusMap, setStatus, language } = useStore();
  
  const isDark = theme !== 'light';
  const isOled = theme === 'oled';

  const allTopics = useMemo(() => getTopicsByStatus(examData, status), [examData, status, statusMap]);
  
  const filteredTopics = useMemo(() => {
    return allTopics.filter(t => t.path.startsWith(chapterPath + '/') || t.path === chapterPath);
  }, [allTopics, chapterPath]);

  const handleUnmark = (path: string) => {
    setStatus(path, 'unmarked');
  };

  const handleComplete = (path: string) => {
    setStatus(path, 'completed');
  };

  const renderItem = ({ item }: { item: any }) => {
    return (
      <View style={[styles.card, isDark && styles.cardDark, isOled && styles.cardOled]}>
        <View style={styles.cardHeader}>
           <Text style={[styles.topicName, isDark && styles.textDark]}>{t(item.name, language)}</Text>
           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
             <TouchableOpacity 
               onPress={() => handleComplete(item.path)}
               hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
               activeOpacity={0.6}
               style={{ marginRight: 16 }}
             >
               <CheckCircle size={22} color="#10B981" />
             </TouchableOpacity>

             <TouchableOpacity 
               onPress={() => handleUnmark(item.path)}
               hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
               activeOpacity={0.6}
             >
               <XCircle size={22} color={status === 'hard' ? "#E11D48" : "#D97706"} />
             </TouchableOpacity>
           </View>
        </View>
        <Text style={[styles.pathText, isDark && styles.pathTextDark]} numberOfLines={2}>{item.path.replace(/\//g, ' > ')}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark, isOled && styles.containerOled]}>
       <FlatList 
         data={filteredTopics}
         keyExtractor={(item) => item.path}
         renderItem={renderItem}
         contentContainerStyle={styles.list}
         ListEmptyComponent={
           <View style={styles.empty}>
             <Text style={[styles.emptyText, isDark && styles.emptyTextDark]}>{t("No topics found.", language)}</Text>
           </View>
         }
       />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  containerDark: {
    backgroundColor: '#0F172A',
  },
  containerOled: {
    backgroundColor: '#000000',
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
  cardOled: {
    backgroundColor: '#121212',
    borderColor: '#1E1E1E',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  topicName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    flex: 1,
    marginRight: 12,
  },
  textDark: {
    color: '#F8FAFC',
  },
  pathText: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 18,
  },
  pathTextDark: {
    color: '#94A3B8',
  },
  empty: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#64748B',
  },
  emptyTextDark: {
    color: '#94A3B8',
  }
});
