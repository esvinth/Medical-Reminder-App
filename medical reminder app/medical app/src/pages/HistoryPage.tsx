import React from 'react';
import { useReminderStore } from '../store/reminderStore';
import ReminderCard from '../components/reminders/ReminderCard';
import { Calendar, ListFilter } from 'lucide-react';

const HistoryPage: React.FC = () => {
  const { getTakenReminders } = useReminderStore();
  const takenReminders = getTakenReminders();
  
  // Group reminders by date taken
  const remindersByDate = takenReminders.reduce((acc, reminder) => {
    if (!reminder.takenAt) return acc;
    
    const date = reminder.takenAt.split('T')[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(reminder);
    return acc;
  }, {} as Record<string, typeof takenReminders>);
  
  // Sort dates in descending order (newest first)
  const sortedDates = Object.keys(remindersByDate).sort().reverse();
  
  return (
    <div className="container-page">
      <div className="page-header">
        <h1 className="page-title">Medication History</h1>
      </div>
      
      {takenReminders.length === 0 ? (
        <div className="rounded-lg bg-white p-6 text-center shadow">
          <p className="text-gray-500">No medication history yet</p>
        </div>
      ) : (
        <div className="space-y-8">
          {sortedDates.map((date) => (
            <div key={date} className="animate-slideUp">
              <h2 className="mb-4 border-b pb-2 text-xl font-semibold text-gray-900">
                {new Date(date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </h2>
              <div className="space-y-4">
                {remindersByDate[date].map((reminder) => (
                  <ReminderCard key={reminder.id} reminder={reminder} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;