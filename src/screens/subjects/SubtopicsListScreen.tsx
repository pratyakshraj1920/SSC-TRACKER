import React from 'react';
import { View, StyleSheet, FlatList, SafeAreaView, Text } from 'react-native';
import { useStore, StatusType } from '../../store/useStore';
import ProgressCard from '../../components/ProgressCard';
import { t } from '../../utils/translations';

export default function SubtopicsListScreen({ route }: any) {
  const { subjectName, chapterName, topics } = route.params;
  const { statusMap, setStatus, theme, language } = useStore();
  const isDark = theme !== 'light';
  const isOled = theme === 'oled';

  if (!topics || topics.length === 0) {
    return <SafeAreaView style={[styles.container, isDark && styles.containerDark, isOled && styles.containerOled]}><View style={styles.empty}><Text style={isDark && styles.textDark}>{t("No topics found.", language)}</Text></View></SafeAreaView>;
  }

  // Flatten topics and subtopics for display
  const items: any[] = [];
  topics.forEach((t: any) => {
      // If a topic has no subtopics, treat it as a leaf node
      if (!t.subtopics || t.subtopics.length === 0) {
          items.push({ isTopicHeader: false, path: `${subjectName}/${chapterName}/${t.name}`, name: t.name, parentName: null });
      } else {
          // Topic serves as a header
          items.push({ isTopicHeader: true, name: t.name });
          t.subtopics.forEach((st: any) => {
             items.push({ isTopicHeader: false, path: `${subjectName}/${chapterName}/${t.name}/${st.name}`, name: st.name, parentName: t.name });
          });
      }
  });

  const renderItem = ({ item }: { item: any }) => {
    if (item.isTopicHeader) {
        return <Text style={[styles.topicHeader, isDark && styles.textDark]}>{t(item.name, language)}</Text>;
    }
    const status = statusMap[item.path] || 'unmarked';

    return (
      <View style={styles.subtopicIndent}>
          <ProgressCard 
            title={t(item.name, language)}
            status={status}
            onStatusChange={(s) => setStatus(item.path, s)}
          />
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark, isOled && styles.containerOled]}>
      <FlatList 
        data={items}
        keyExtractor={(item, index) => item.path || index.toString()}
        renderItem={renderItem}
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
  topicHeader: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#334155',
      marginTop: 16,
      marginBottom: 12,
  },
  subtopicIndent: {
      marginLeft: 16,
  },
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
