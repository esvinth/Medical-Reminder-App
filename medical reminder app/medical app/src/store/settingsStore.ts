import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserSettings } from '../types';

interface SettingsState extends UserSettings {
  updateSettings: (settings: Partial<UserSettings>) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      username: 'User',
      notificationTime: 15, // 15 minutes before
      notificationSound: 'chime',
      theme: 'light',
      
      updateSettings: (settings) => {
        set((state) => ({
          ...state,
          ...settings,
        }));
      },
    }),
    {
      name: 'settings-storage',
    }
  )
);