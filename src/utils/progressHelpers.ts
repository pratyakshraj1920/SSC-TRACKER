import { useStore } from '../store/useStore';

export const setRecursiveStatus = (node: any, currentPath: string, newStatus: any, parentPrefixForChapters?: string) => {
  const setStatus = useStore.getState().setStatus;
  setStatus(currentPath, newStatus);

  if (node.subjects) {
    node.subjects.forEach((sub: any) => {
      setRecursiveStatus(sub, `${node.name}/${sub.name}`, newStatus, node.name);
    });
  }

  if (node.chapters) {
    node.chapters.forEach((ch: any) => {
      const chPath = `${node.name}/${ch.name}`;
      setRecursiveStatus(ch, chPath, newStatus, node.name);
    });
  }

  if (node.topics && parentPrefixForChapters) {
    node.topics.forEach((t: any) => {
      const tPath = `${parentPrefixForChapters}/${node.name}/${t.name}`;
      setStatus(tPath, newStatus);

      if (t.subtopics) {
        t.subtopics.forEach((st: any) => {
          setStatus(`${parentPrefixForChapters}/${node.name}/${t.name}/${st.name}`, newStatus);
        });
      }
    });
  }
};

export const calculateChapterProgress = (subjectName: string, chapter: any) => {
  const statusMap = useStore.getState().statusMap;
  
  if (!chapter.topics || chapter.topics.length === 0) {
    const path = `${subjectName}/${chapter.name}`;
    return statusMap[path] === 'completed' ? 100 : 0;
  }

  let totalSubtopics = 0;
  let completedSubtopics = 0;

  chapter.topics.forEach((topic: any) => {
    if (topic.subtopics && topic.subtopics.length > 0) {
      topic.subtopics.forEach((subtopic: any) => {
        totalSubtopics++;
        const path = `${subjectName}/${chapter.name}/${topic.name}/${subtopic.name}`;
        if (statusMap[path] === 'completed') {
          completedSubtopics++;
        }
      });
    } else {
      // Topic itself is the leaf node
      totalSubtopics++;
      const path = `${subjectName}/${chapter.name}/${topic.name}`;
      if (statusMap[path] === 'completed') {
        completedSubtopics++;
      }
    }
  });

  if (totalSubtopics === 0) return 0;
  return (completedSubtopics / totalSubtopics) * 100;
};

export const calculateSubjectProgress = (subject: any, parentName?: string) => {
  if (subject.subjects && subject.subjects.length > 0) {
    let totalNestedProgress = 0;
    subject.subjects.forEach((sub: any) => {
      totalNestedProgress += calculateSubjectProgress(sub, subject.name);
    });
    return totalNestedProgress / subject.subjects.length;
  }

  if (subject.chapters && subject.chapters.length > 0) {
    let totalChapterProgress = 0;
    subject.chapters.forEach((chapter: any) => {
      totalChapterProgress += calculateChapterProgress(subject.name, chapter);
    });
    return totalChapterProgress / subject.chapters.length;
  }

  // If it has no children (leaf node), rely on direct status
  const statusMap = useStore.getState().statusMap;
  const path = parentName ? `${parentName}/${subject.name}` : subject.name;
  return statusMap[path] === 'completed' ? 100 : 0;
};

export const calculateOverallProgress = (examData: any[]) => {
  if (!examData || examData.length === 0) return 0;

  let totalSubjectProgress = 0;
  examData.forEach(subject => {
     // Some subjects might have nested subjects (like GK has History -> Ancient etc)
     // To keep it simple, we check if it has chapters directly.
     if (subject.chapters) {
        totalSubjectProgress += calculateSubjectProgress(subject);
     } else if (subject.subjects) {
        // Nested subjects (GK)
        let innerTotal = 0;
        subject.subjects.forEach((sub: any) => {
            innerTotal += calculateSubjectProgress(sub, subject.name);
        });
        totalSubjectProgress += innerTotal / subject.subjects.length;
     }
  });

  return totalSubjectProgress / examData.length;
};

export const getTopicsByStatus = (examData: any[], status: 'hard' | 'moderate' | 'completed') => {
  const statusMap = useStore.getState().statusMap;
  const results: { path: string, name: string }[] = [];

  Object.entries(statusMap).forEach(([path, val]) => {
    if (val === status) {
      const parts = path.split('/');
      results.push({ path, name: parts[parts.length - 1] });
    }
  });

  return results;
};
