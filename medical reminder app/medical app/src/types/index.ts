export interface Reminder {
  id: string;
  medicineName: string;
  dosage: string;
  frequency: Frequency;
  time: string;
  notes?: string;
  isTaken: boolean;
  createdAt: string;
  takenAt?: string;
  dueDate: string;
}

export type Frequency = 'daily' | 'twice-daily' | 'weekly' | 'monthly' | 'as-needed';

export interface UserSettings {
  username: string;
  notificationTime: number; // minutes before scheduled time
  notificationSound: string;
  theme: 'light' | 'dark';
}