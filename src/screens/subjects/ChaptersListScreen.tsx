import React from 'react';
import { View, StyleSheet, FlatList, SafeAreaView, Text } from 'react-native';
import { useStore } from '../../store/useStore';
import ProgressCard from '../../components/ProgressCard';
import { calculateChapterProgress, calculateSubjectProgress, setRecursiveStatus } from '../../utils/progressHelpers';
import { t } from '../../utils/translations';

export default function ChaptersListScreen({ route, navigation }: any) {
  const { subjectName, chapters, nestedSubjects } = route.params;
  const { statusMap, setStatus, theme, language } = useStore();
  const isDark = theme !== 'light';
  const isOled = theme === 'oled';

  const handleBulkStatus = (chapter: any, newStatus: any) => {
    setRecursiveStatus(chapter, `${subjectName}/${chapter.name}`, newStatus, subjectName);
  };

  // Handle nested subjects like GK -> History
  if (nestedSubjects && nestedSubjects.length > 0) {
    return (
       <SafeAreaView style={[styles.container, isDark && styles.containerDark, isOled && styles.containerOled]}>
        <FlatList 
            data={nestedSubjects}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => {
              const progress = calculateSubjectProgress(item, subjectName);
              const path = `${subjectName}/${item.name}`;
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
                  onPress={() => navigation.push('ChaptersList', { subjectName: item.name, chapters: item.chapters, nestedSubjects: item.subjects })}
                />
              )
            }}
            contentContainerStyle={styles.list}
        />
       </SafeAreaView>
    );
  }

  if (!chapters || chapters.length === 0) {
     return <SafeAreaView style={[styles.container, isDark && styles.containerDark, isOled && styles.containerOled]}><View style={styles.empty}><Text style={isDark && styles.textDark}>{t("No chapters found.", language)}</Text></View></SafeAreaView>;
  }

  const renderChapter = ({ item }: { item: any }) => {
    const progress = calculateChapterProgress(subjectName, item);
    const path = `${subjectName}/${item.name}`;
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
        onPress={() => navigation.navigate('SubtopicsList', { subjectName, chapterName: item.name, topics: item.topics })}
      />
    );
  };

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark, isOled && styles.containerOled]}>
      <FlatList 
        data={chapters}
        keyExtractor={(item) => item.name}
        renderItem={renderChapter}
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
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  containerDark: {
    backgroundColor: '#0F172A',
  },
  containerOled: {
    backgroundColor: '#000000',
  },
  textDark: {
    color: '#F8FAFC',
  }
});
