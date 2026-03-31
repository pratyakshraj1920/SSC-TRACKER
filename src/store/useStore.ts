import { create } from 'zustand';

export type StatusType = 'completed' | 'moderate' | 'hard' | 'unmarked';

interface TrackerState {
  // Auth
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;

  // Exam Selection & Data
  selectedExam: string | null;
  examData: any[];
  setExam: (examId: string, data: any[]) => void;

  // Progress Tracking
  statusMap: Record<string, StatusType>;
  setStatus: (path: string, status: StatusType) => void;
  clearProgress: () => void;

  // Theme
  theme: 'light' | 'dark' | 'oled';
  setTheme: (theme: 'light' | 'dark' | 'oled') => void;

  // Notifications
  notificationsEnabled: boolean;
  setNotificationsEnabled: (val: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  vibrationEnabled: boolean;
  setVibrationEnabled: (val: boolean) => void;
  importantAlertsOnly: boolean;
  setImportantAlertsOnly: (val: boolean) => void;
  reminderTime: string;
  setReminderTime: (time: string) => void;

  // Language & Region
  language: 'English' | 'Hindi';
  setLanguage: (lang: 'English' | 'Hindi') => void;
  dateFormat: string;
  setDateFormat: (format: string) => void;
  timeFormat: '12-hour' | '24-hour';
  setTimeFormat: (format: '12-hour' | '24-hour') => void;

  // Data & Storage
  autoBackup: boolean;
  setAutoBackup: (val: boolean) => void;

  // Cloud Sync
  autoSync: boolean;
  setAutoSync: (val: boolean) => void;
  lastSyncTime: string | null;
  setLastSyncTime: (time: string | null) => void;
}

export const useStore = create<TrackerState>((set) => ({
  isLoggedIn: false,
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),

  selectedExam: null,
  examData: [],
  setExam: (examId, data) => set({ selectedExam: examId, examData: data, statusMap: {} }), 

  statusMap: {},
  setStatus: (path, status) => set((state) => {
    const newStatusMap = { ...state.statusMap };
    if (status === 'unmarked') {
      delete newStatusMap[path];
    } else {
      newStatusMap[path] = status;
    }
    return { statusMap: newStatusMap };
  }),
  clearProgress: () => set({ statusMap: {} }),

  theme: 'light',
  setTheme: (t) => set({ theme: t }),

  notificationsEnabled: true,
  setNotificationsEnabled: (val) => set({ notificationsEnabled: val }),
  soundEnabled: true,
  setSoundEnabled: (val) => set({ soundEnabled: val }),
  vibrationEnabled: true,
  setVibrationEnabled: (val) => set({ vibrationEnabled: val }),
  importantAlertsOnly: false,
  setImportantAlertsOnly: (val) => set({ importantAlertsOnly: val }),
  reminderTime: '09:00 AM',
  setReminderTime: (time) => set({ reminderTime: time }),

  language: 'English',
  setLanguage: (lang) => set({ language: lang }),
  dateFormat: 'DD/MM/YYYY',
  setDateFormat: (format) => set({ dateFormat: format }),
  timeFormat: '12-hour',
  setTimeFormat: (format) => set({ timeFormat: format }),

  autoBackup: false,
  setAutoBackup: (val) => set({ autoBackup: val }),

  autoSync: false,
  setAutoSync: (val) => set({ autoSync: val }),
  lastSyncTime: null,
  setLastSyncTime: (time) => set({ lastSyncTime: time }),
}));
