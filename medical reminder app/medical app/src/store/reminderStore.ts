import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Reminder, Frequency } from '../types';
import { format } from 'date-fns';

interface ReminderState {
  reminders: Reminder[];
  addReminder: (reminder: Omit<Reminder, 'id' | 'createdAt' | 'isTaken'>) => void;
  updateReminder: (id: string, updatedReminder: Partial<Reminder>) => void;
  deleteReminder: (id: string) => void;
  markAsTaken: (id: string) => void;
  getUpcomingReminders: () => Reminder[];
  getTakenReminders: () => Reminder[];
}

export const useReminderStore = create<ReminderState>()(
  persist(
    (set, get) => ({
      reminders: [],
      
      addReminder: (reminderData) => {
        const newReminder: Reminder = {
          id: crypto.randomUUID(),
          ...reminderData,
          isTaken: false,
          createdAt: new Date().toISOString(),
        };
        
        set((state) => ({
          reminders: [...state.reminders, newReminder],
        }));
      },
      
      updateReminder: (id, updatedReminder) => {
        set((state) => ({
          reminders: state.reminders.map((reminder) => 
            reminder.id === id ? { ...reminder, ...updatedReminder } : reminder
          ),
        }));
      },
      
      deleteReminder: (id) => {
        set((state) => ({
          reminders: state.reminders.filter((reminder) => reminder.id !== id),
        }));
      },
      
      markAsTaken: (id) => {
        set((state) => ({
          reminders: state.reminders.map((reminder) => 
            reminder.id === id
              ? { ...reminder, isTaken: true, takenAt: new Date().toISOString() }
              : reminder
          ),
        }));
      },
      
      getUpcomingReminders: () => {
        return get().reminders.filter((reminder) => !reminder.isTaken);
      },
      
      getTakenReminders: () => {
        return get().reminders.filter((reminder) => reminder.isTaken);
      },
    }),
    {
      name: 'reminder-storage',
    }
  )
);