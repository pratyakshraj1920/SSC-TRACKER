import React from 'react';
import { View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { useStore } from '../../store/useStore';
import { t } from '../../utils/translations';
import ProgressCard from '../../components/ProgressCard';
import { calculateSubjectProgress, setRecursiveStatus } from '../../utils/progressHelpers';

export default function SubjectsListScreen({ navigation }: any) {
  const { examData, statusMap, setStatus, theme, language } = useStore();
  const isDark = theme !== 'light';
  const isOled = theme === 'oled';

  const handleBulkStatus = (subject: any, newStatus: any) => {
    setRecursiveStatus(subject, subject.name, newStatus);
  };

  const renderSubject = ({ item }: { item: any }) => {
    const progress = calculateSubjectProgress(item);
    // Real app might support nested subjects like History inside GK, we handle standard items:
    const path = `${item.name}`;
    const mappedStatus = statusMap[path] || 'unmarked';
    
    let status = mappedStatus;
    if (progress === 100) status = 'completed';
    else if (mappedStatus === 'completed') status = 'unmarked';

    return (
      <ProgressCard 
        title={t(item.name, language)}
        progress={progress}
        status={status}
        onStatusChange={(s) => handleBulkStatus(item, s)}
        onPress={() => navigation.navigate('ChaptersList', { subjectName: item.name, chapters: item.chapters, nestedSubjects: item.subjects })}
      />
    );
  };

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark, isOled && styles.containerOled]}>
      <FlatList 
        data={examData}
        keyExtractor={(item) => item.name}
        renderItem={renderSubject}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  list: {
    padding: 16,
    paddingBottom: 40,
  },
  containerDark: {
    backgroundColor: '#0F172A',
  },
  containerOled: {
    backgroundColor: '#000000',
  }
});
