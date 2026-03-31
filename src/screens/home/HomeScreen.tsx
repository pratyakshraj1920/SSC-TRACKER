import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useStore } from '../../store/useStore';
import { t } from '../../utils/translations';
import CircularProgress from '../../components/CircularProgress';
import { calculateOverallProgress, getTopicsByStatus } from '../../utils/progressHelpers';
import { Menu, User, Clock, Flame, AlertTriangle, ArrowRight, Percent, Globe, BookOpen, Hash } from 'lucide-react-native';

export default function HomeScreen({ navigation }: any) {
  const { examData, statusMap, selectedExam, theme, language } = useStore();
  
  React.useEffect(() => {
     console.log("STATUS MAP KEYS:", Object.keys(statusMap).slice(0, 10)); // just the first 10
  }, [statusMap]);

  const isDark = theme !== 'light';
  const isOled = theme === 'oled';

  const overallProgress = useMemo(() => calculateOverallProgress(examData), [examData, statusMap]);
  const difficultTopics = useMemo(() => getTopicsByStatus(examData, 'hard'), [examData, statusMap]);
  const moderateTopics = useMemo(() => getTopicsByStatus(examData, 'moderate'), [examData, statusMap]);

  const [hardFilter, setHardFilter] = useState('All');
  const [modFilter, setModFilter] = useState('All');
  const filterList = [
    'All', 'Quant', 'English', 'Reasoning', 
    'Geography', 'History', 'Polity', 'Economy', 
    'Physics', 'Chemistry', 'Biology', 'Static GK', 'Computer'
  ];

  const filterTopics = (topics: any[], filterStr: string) => {
    if (filterStr === 'All') return topics;
    return topics.filter(t => {
       const parts = t.path.split('/');
       const subj = parts[0] || '';
       const lowerSubj = subj.toLowerCase();

       // Map standard top-level subjects
       if (filterStr === 'Quant' && lowerSubj.includes('math')) return true;
       if (filterStr === 'Reasoning' && lowerSubj.includes('reasoning')) return true;
       if (filterStr === 'English' && lowerSubj.includes('english')) return true;
       if (filterStr === 'Computer' && lowerSubj.includes('computer')) return true;
       if (filterStr === 'Static GK' && lowerSubj.includes('static')) return true;

       // Determine the effective subject category (handling GK nesting dropping quirk)
       const isGKRoot = lowerSubj.includes('awareness') || lowerSubj.includes('knowledge') || lowerSubj === 'gk' || lowerSubj.includes('general');
       const actualSubjectNode = isGKRoot && parts.length > 1 ? parts[1].toLowerCase() : lowerSubj;

       // Strict matching on the effective subject node to prevent cross-contamination from topic wordings
       if (filterStr === 'Geography' && actualSubjectNode.includes('geography')) return true;
       if (filterStr === 'History' && actualSubjectNode.includes('history')) return true;
       if (filterStr === 'Polity' && actualSubjectNode.includes('polity')) return true;
       if (filterStr === 'Economy' && (actualSubjectNode.includes('economic') || actualSubjectNode.includes('economy'))) return true;
       if (filterStr === 'Physics' && actualSubjectNode.includes('physic')) return true;
       if (filterStr === 'Chemistry' && actualSubjectNode.includes('chemistry')) return true;
       if (filterStr === 'Biology' && actualSubjectNode.includes('biology')) return true;

       return actualSubjectNode === filterStr.toLowerCase();
    });
  };

  const filteredDifficult = filterTopics(difficultTopics, hardFilter);
  const filteredModerate = filterTopics(moderateTopics, modFilter);

  const groupIntoChapters = (topics: any[]) => {
    const chapterMap: Record<string, any> = {};
    topics.forEach(t => {
      const parts = t.path.split('/');
      
      let chapterLevelIndex = 1;
      const lowerSubj = parts[0].toLowerCase();
      
      if (lowerSubj.includes('history')) {
         chapterLevelIndex = 0; // Group ancient, medieval, modern history exactly as requested
      } else if (
        lowerSubj.includes('awareness') || 
        lowerSubj.includes('knowledge') || 
        lowerSubj === 'gk' || 
        lowerSubj.includes('general')
      ) {
         chapterLevelIndex = 2; // Legacy nested GK check (Safe)
      }

      if (parts.length > chapterLevelIndex) { 
        const chapterPathArr = parts.slice(0, chapterLevelIndex + 1);
        const chapterPath = chapterPathArr.join('/');
        const chapterName = parts[chapterLevelIndex]; 

        if (!chapterMap[chapterPath]) {
          chapterMap[chapterPath] = {
            id: chapterPath,
            chapterName: chapterName,
            topicCount: 0,
            path: chapterPath
          };
        }
        chapterMap[chapterPath].topicCount += 1;
      } else if (parts.length === chapterLevelIndex) {
        // Fallback if path is just the subject/level itself
        const chapterPath = parts.join('/');
        const chapterName = parts[parts.length - 1];
        if (!chapterMap[chapterPath]) {
          chapterMap[chapterPath] = {
            id: chapterPath,
            chapterName: chapterName,
            topicCount: 0,
            path: chapterPath
          };
        }
        chapterMap[chapterPath].topicCount += 1;
      }
    });
    return Object.values(chapterMap);
  };

  const hardChapters = groupIntoChapters(filteredDifficult);
  const modChapters = groupIntoChapters(filteredModerate);

  const getSubjectIcon = (subjectName: string, size=24, color="#6366F1") => {
    const lowerSubj = subjectName.toLowerCase();
    if (lowerSubj.includes('math')) return <Percent size={size} color={color} />;
    if (
      lowerSubj.includes('awareness') || 
      lowerSubj.includes('knowledge') || 
      lowerSubj === 'gk' || 
      lowerSubj.includes('general') ||
      ['geography', 'history', 'polity', 'economic', 'physic', 'chemistry', 'biology', 'static'].some(k => lowerSubj.includes(k))
    ) return <Globe size={size} color={color} />;
    if (lowerSubj.includes('english')) return <BookOpen size={size} color={color} />;
    return <Hash size={size} color={color} />;
  };

  const getSubjectBadgeText = (path: string) => {
    const subj = path.split('/')[0] || '';
    const lowerSubj = subj.toLowerCase();
    if (lowerSubj.includes('math')) return 'QUANT';
    if (lowerSubj.includes('reasoning')) return 'REASONING';
    if (lowerSubj.includes('english')) return 'ENGLISH';
    if (
      lowerSubj.includes('awareness') || 
      lowerSubj.includes('knowledge') || 
      lowerSubj === 'gk' || 
      lowerSubj.includes('general') ||
      ['geography', 'history', 'polity', 'economic', 'physic', 'chemistry', 'biology', 'static'].some(k => lowerSubj.includes(k))
    ) return 'GK';
    return subj.substring(0, 8).toUpperCase();
  };

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark, isOled && styles.containerOled]}>
      {/* Top Header Row */}
      <View style={[styles.appHeader, isDark && styles.appHeaderDark, isOled && styles.appHeaderOled, { justifyContent: 'center' }]}>
        <Text style={[styles.headerTitle, isDark && styles.textDark]}>{t("SSC Syllabus Tracker", language)}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Top Massive White/Dark Curve Card */}
        <View style={[styles.heroCard, isDark && styles.heroCardDark, isOled && styles.heroCardOled]}>
          <View style={styles.progressCenter}>
             <CircularProgress size={140} strokeWidth={12} progress={overallProgress} color="#3B82F6" />
          </View>
          
          <Text style={styles.journeyCurrent}>{t("CURRENT JOURNEY", language)}</Text>
          <Text style={[styles.journeyTitle, isDark && styles.textDark]}>{t("Mastering the\nSyllabus", language)}</Text>
          
          <Text style={[styles.journeySubtitle, isDark && styles.textMutedDark]}>
            {language === 'Hindi' 
               ? `आपने 31 में से ${Math.round((overallProgress / 100) * 31)} मुख्य मॉड्यूल पढ़ लिए हैं।\nआप इस सप्ताह 72% एस्पिरेंट्स से आगे हैं।\nजारी रखें!`
               : `You've tackled ${Math.round((overallProgress / 100) * 31)} out of 31 key modules.\nYou're ahead of 72% of other aspirants\nthis week. Keep the momentum!`
            }
          </Text>

          <TouchableOpacity style={styles.continueBtn} onPress={() => navigation.navigate('Syllabus')}>
            <Text style={styles.continueBtnText}>{t("Continue Quant Revision", language)}</Text>
          </TouchableOpacity>
        </View>

        {/* Stat Cards */}
        <View style={styles.statsRow}>
          <View style={[styles.statBox, isDark && styles.statBox1Dark, !isDark && styles.statBox1Light]}>
            <Clock size={20} color={isDark ? '#A5B4FC' : '#3730A3'} style={styles.statIcon} />
            <Text style={[styles.statValue, isDark && styles.textDark]}>124h</Text>
            <Text style={[styles.statLabel, isDark && styles.textMutedDark]}>{t("TOTAL STUDY", language)}</Text>
          </View>
          
          <View style={[styles.statBox, isDark && styles.statBox2Dark, !isDark && styles.statBox2Light]}>
            <Flame size={20} color={isDark ? '#FBCFE8' : '#831843'} style={styles.statIcon} />
            {language === 'Hindi' ? (
              <Text style={[styles.statValue, isDark && styles.textDark]}>8 दिन</Text>
            ) : (
              <Text style={[styles.statValue, isDark && styles.textDark]}>8 Days</Text>
            )}
            <Text style={[styles.statLabel, isDark && styles.textMutedDark]}>{t("DAILY STREAK", language)}</Text>
          </View>
        </View>

        {/* Priority Focus (Hard) */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderWrap}>
            <View style={styles.redPillar} />
            <View>
              <Text style={styles.sectionEyebrowRed}>{t("PRIORITY FOCUS", language)}</Text>
              <Text style={[styles.sectionTitle, isDark && styles.textDark]}>{t("Hard Topics", language)}</Text>
            </View>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
             {filterList.map(item => {
               const isActive = hardFilter === item;
               return (
                 <TouchableOpacity 
                   key={item} 
                   onPress={() => setHardFilter(item)}
                   style={[isActive ? [styles.chipActive, styles.chipActiveRed] : styles.chip, !isActive && isDark && styles.chipDark, !isActive && isOled && styles.chipOled]}
                 >
                   <Text style={[isActive ? styles.chipActiveText : styles.chipText, !isActive && isDark && styles.textMutedDark]}>{t(item, language)}</Text>
                 </TouchableOpacity>
               );
             })}
             <View style={{width: 20}} />
          </ScrollView>

          {hardChapters.length === 0 ? (
            <Text style={[styles.emptyText, isDark && styles.textMutedDark]}>{t("No tough topics marked for this selection.", language)}</Text>
          ) : (
            hardChapters.map((item: any, i: number) => (
              <TouchableOpacity key={i} activeOpacity={0.7} onPress={() => navigation.navigate('FilteredStatus', { chapterPath: item.path, status: 'hard', chapterName: item.chapterName })} style={[styles.hardCard, isDark && styles.cardDark, isOled && styles.cardOled]}>
                <View style={styles.hardCardHeader}>
                   <View style={[styles.tag, isDark && styles.chipDark, isOled && styles.chipOled]}>
                     <Text style={[styles.tagText, isDark && styles.textMutedDark]}>{getSubjectBadgeText(item.path)}</Text>
                   </View>
                   <AlertTriangle size={18} color="#E11D48" />
                </View>
                <Text style={[styles.topicName, isDark && styles.textDark]}>{t(item.chapterName, language)}</Text>
                
                <View style={styles.segmentBar}>
                   <View style={[styles.segment, {backgroundColor: '#FDA4AF'}]} />
                   <View style={[styles.segment, {backgroundColor: '#FDA4AF'}]} />
                   <View style={[styles.segment, {backgroundColor: isDark ? '#334155' : '#E2E8F0'}]} />
                </View>

                <View style={styles.hardCardFooter}>
                   <Text style={[styles.lastStudied, isDark && styles.textMutedDark]}>{item.topicCount} tough topics</Text>
                   <View style={styles.practiceBtn}><Text style={styles.practiceBtnText}>Review </Text><ArrowRight size={14} color="#64748B" /></View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* Sustainable Pace (Moderate) */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderWrap}>
            <View style={styles.bluePillar} />
            <View>
              <Text style={styles.sectionEyebrowBlue}>{t("SUSTAINABLE PACE", language)}</Text>
              <Text style={[styles.sectionTitle, isDark && styles.textDark]}>{t("Moderate Topics", language)}</Text>
            </View>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
             {filterList.map(item => {
               const isActive = modFilter === item;
               return (
                 <TouchableOpacity 
                   key={item} 
                   onPress={() => setModFilter(item)}
                   style={[isActive ? [styles.chipActive, styles.chipActiveBlue] : styles.chip, !isActive && isDark && styles.chipDark, !isActive && isOled && styles.chipOled]}
                 >
                   <Text style={[isActive ? styles.chipActiveText : styles.chipText, !isActive && isDark && styles.textMutedDark]}>{t(item, language)}</Text>
                 </TouchableOpacity>
               );
             })}
             <View style={{width: 20}} />
          </ScrollView>

          {modChapters.length === 0 ? (
            <Text style={[styles.emptyText, isDark && styles.textMutedDark]}>{t("No moderate topics marked for this selection.", language)}</Text>
          ) : (
            modChapters.map((item: any, i: number) => (
              <TouchableOpacity key={i} activeOpacity={0.7} onPress={() => navigation.navigate('FilteredStatus', { chapterPath: item.path, status: 'moderate', chapterName: item.chapterName })} style={[styles.modCard, isDark && styles.cardDark, isOled && styles.cardOled]}>
                <View style={[styles.modIconBox, {backgroundColor: i % 2 === 0 ? (isDark ? 'rgba(99,102,241,0.2)' : '#E0E7FF') : (isDark ? 'rgba(217,70,239,0.2)' : '#FAE8FF') }]}>
                   {getSubjectIcon(item.path.split('/')[0], 24, i % 2 === 0 ? '#3730A3' : '#831843')}
                </View>
                <View style={styles.modContent}>
                  <View style={styles.modHeaderRow}>
                     <Text style={[styles.topicName, isDark && styles.textDark, {flex: 1}]} numberOfLines={1}>{t(item.chapterName, language)}</Text>
                     <Text style={[styles.tagText, {color: '#3B82F6', fontWeight: 'bold', fontSize: 10}]}>{getSubjectBadgeText(item.path)}</Text>
                  </View>
                  <View style={styles.modProgressBg}>
                    <View style={[styles.modProgressFill, { width: item.topicCount > 3 ? '40%' : '75%' as `${number}%` }]} />
                  </View>
                  <View style={styles.modFooterRow}>
                    <Text style={[styles.lastStudied, isDark && styles.textMutedDark]}>{item.topicCount} {t("topics marked", language)}</Text>
                    <Text style={[styles.lastStudied, isDark && styles.textMutedDark, {color: '#3B82F6'}]}>{t("Review →", language)}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>

      </ScrollView>
      
      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  containerDark: { backgroundColor: '#0F172A' },
  containerOled: { backgroundColor: '#000000' },
  
  appHeader: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#FFFFFF',
    borderBottomWidth: 1, borderBottomColor: '#F1F5F9',
  },
  appHeaderDark: { backgroundColor: '#1E293B', borderBottomColor: '#334155' },
  appHeaderOled: { backgroundColor: '#121212', borderBottomColor: '#1E1E1E' },
  menuIcon: { padding: 4 },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#1E293B' },
  avatarPlaceholder: {
    width: 32, height: 32, borderRadius: 16, backgroundColor: '#FFEDD5', 
    justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#FED7AA'
  },
  avatarInner: { width: 10, height: 10, backgroundColor: '#EA580C', borderRadius: 5, marginTop: 4 },
  
  scrollContent: { paddingBottom: 100 },
  
  heroCard: {
    backgroundColor: '#FFFFFF', borderBottomLeftRadius: 32, borderBottomRightRadius: 32,
    padding: 24, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.04,
    shadowOffset: { width:0, height:6 }, shadowRadius: 10, elevation: 4, marginBottom: 24,
  },
  heroCardDark: { backgroundColor: '#1E293B' },
  heroCardOled: { backgroundColor: '#121212' },
  
  progressCenter: { marginVertical: 10 },
  
  journeyCurrent: { fontSize: 10, fontWeight: '800', color: '#3B82F6', letterSpacing: 1.5, marginTop: 24, marginBottom: 8 },
  journeyTitle: { fontSize: 26, fontWeight: '800', color: '#1E293B', textAlign: 'center', lineHeight: 32, marginBottom: 12 },
  journeySubtitle: { fontSize: 13, color: '#64748B', textAlign: 'center', lineHeight: 20, marginBottom: 24 },
  
  continueBtn: {
    backgroundColor: '#5A67D8', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 12,
    width: '100%', alignItems: 'center', shadowColor: '#5A67D8', shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 }, shadowRadius: 8, elevation: 4,
  },
  continueBtnText: { color: '#FFF', fontSize: 15, fontWeight: '600' },
  
  statsRow: { flexDirection: 'row', paddingHorizontal: 20, gap: 16, marginBottom: 32 },
  statBox: { flex: 1, borderRadius: 20, padding: 20, justifyContent: 'center' },
  statBox1Light: { backgroundColor: '#E0E7FF' },
  statBox2Light: { backgroundColor: '#FAE8FF' },
  statBox1Dark: { backgroundColor: 'rgba(99,102,241,0.15)' },
  statBox2Dark: { backgroundColor: 'rgba(217,70,239,0.15)' },
  
  statIcon: { marginBottom: 16 },
  statValue: { fontSize: 22, fontWeight: '800', color: '#1E293B', marginBottom: 4 },
  statLabel: { fontSize: 10, fontWeight: '700', color: '#64748B', letterSpacing: 1 },
  
  sectionContainer: { marginBottom: 32 },
  sectionHeaderWrap: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginBottom: 16 },
  redPillar: { width: 4, height: 36, backgroundColor: '#E11D48', borderRadius: 2, marginRight: 12 },
  bluePillar: { width: 4, height: 36, backgroundColor: '#3B82F6', borderRadius: 2, marginRight: 12 },
  sectionEyebrowRed: { fontSize: 10, fontWeight: '800', color: '#E11D48', letterSpacing: 1 },
  sectionEyebrowBlue: { fontSize: 10, fontWeight: '800', color: '#3B82F6', letterSpacing: 1 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#1E293B' },
  
  chipScroll: { paddingLeft: 20, marginBottom: 16, flexDirection: 'row' },
  chipActive: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20, marginRight: 8 },
  chipActiveRed: { backgroundColor: '#EF4444' },
  chipActiveBlue: { backgroundColor: '#6366F1' },
  chipActiveText: { color: '#FFF', fontSize: 12, fontWeight: '600' },
  chip: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20, backgroundColor: '#F1F5F9', marginRight: 8 },
  chipText: { color: '#64748B', fontSize: 12, fontWeight: '500' },
  chipDark: { backgroundColor: '#334155' },
  chipOled: { backgroundColor: '#1E1E1E' },
  
  hardCard: {
    backgroundColor: '#FFFFFF', borderRadius: 16, marginHorizontal: 20, marginBottom: 12, padding: 16,
    borderLeftWidth: 4, borderLeftColor: '#FDA4AF', shadowColor: '#000', shadowOpacity: 0.02, 
    shadowOffset: {width:0,height:2}, shadowRadius: 8, elevation: 1
  },
  hardCardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  tag: { backgroundColor: '#F1F5F9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  tagText: { fontSize: 10, fontWeight: '700', color: '#475569', letterSpacing: 0.5 },
  topicName: { fontSize: 16, fontWeight: '700', color: '#1E293B', marginBottom: 12 },
  segmentBar: { flexDirection: 'row', gap: 4, marginBottom: 16 },
  segment: { flex: 1, height: 4, borderRadius: 2 },
  hardCardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  lastStudied: { fontSize: 11, color: '#64748B' },
  practiceBtn: { flexDirection: 'row', alignItems: 'center' },
  practiceBtnText: { fontSize: 12, color: '#64748B', fontWeight: '500' },
  
  modCard: {
    backgroundColor: '#FFFFFF', borderRadius: 16, marginHorizontal: 20, marginBottom: 12, padding: 16,
    flexDirection: 'row', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.03, 
    shadowOffset: {width:0,height:4}, shadowRadius: 10, elevation: 2
  },
  modIconBox: { width: 56, height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  modContent: { flex: 1 },
  modHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  modProgressBg: { height: 4, backgroundColor: '#E2E8F0', borderRadius: 2, overflow: 'hidden', marginBottom: 8 },
  modProgressFill: { height: '100%', backgroundColor: '#3B82F6', borderRadius: 2 },
  modFooterRow: { flexDirection: 'row', justifyContent: 'space-between' },

  emptyText: { marginHorizontal: 20, fontSize: 14, color: '#94A3B8', fontStyle: 'italic', marginBottom: 16 },

  cardDark: { backgroundColor: '#1E293B', borderColor: '#334155', borderWidth: 1, borderLeftWidth: 4 },
  cardOled: { backgroundColor: '#121212', borderColor: '#1E1E1E' },
  textDark: { color: '#F8FAFC' },
  textMutedDark: { color: '#94A3B8' },

  fab: {
    position: 'absolute', bottom: 24, right: 24, width: 56, height: 56, borderRadius: 28,
    backgroundColor: '#5A67D8', justifyContent: 'center', alignItems: 'center',
    shadowColor: '#5A67D8', shadowOpacity: 0.4, shadowOffset: {width:0,height:4}, shadowRadius: 8, elevation: 6
  },
  fabText: { color: '#FFF', fontSize: 28, fontWeight: '300', marginTop: -2 }
});
