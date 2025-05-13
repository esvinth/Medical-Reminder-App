import React, { useState } from 'react';
import { Calendar, ListFilter } from 'lucide-react';
import ReminderCard from './ReminderCard';
import { Reminder } from '../../types';

interface ReminderListProps {
  reminders: Reminder[];
  title: string;
  emptyMessage: string;
}

const ReminderList: React.FC<ReminderListProps> = ({ 
  reminders, 
  title, 
  emptyMessage 
}) => {
  const [viewType, setViewType] = useState<'list' | 'calendar'>('list');
  
  const toggleViewType = () => {
    setViewType(viewType === 'list' ? 'calendar' : 'list');
  };
  
  // Group reminders by date for calendar view
  const remindersByDate = reminders.reduce((acc, reminder) => {
    const date = reminder.dueDate.split('T')[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(reminder);
    return acc;
  }, {} as Record<string, Reminder[]>);
  
  const dates = Object.keys(remindersByDate).sort();
  
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <button
          onClick={toggleViewType}
          className="flex items-center rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
        >
          {viewType === 'list' ? (
            <>
              <Calendar className="mr-1.5 h-4 w-4" />
              Calendar View
            </>
          ) : (
            <>
              <ListFilter className="mr-1.5 h-4 w-4" />
              List View
            </>
          )}
        </button>
      </div>
      
      {reminders.length === 0 ? (
        <div className="rounded-lg bg-white p-6 text-center shadow">
          <p className="text-gray-500">{emptyMessage}</p>
        </div>
      ) : viewType === 'list' ? (
        <div className="space-y-4">
          {reminders.map((reminder) => (
            <ReminderCard key={reminder.id} reminder={reminder} />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {dates.map((date) => (
            <div key={date} className="animate-slideUp">
              <h3 className="mb-2 border-b pb-1 text-lg font-medium text-gray-900">
                {new Date(date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </h3>
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

export default ReminderList;