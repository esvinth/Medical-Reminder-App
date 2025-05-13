import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Filter } from 'lucide-react';
import { useReminderStore } from '../store/reminderStore';
import ReminderList from '../components/reminders/ReminderList';

const AllRemindersPage: React.FC = () => {
  const { reminders, getUpcomingReminders, getTakenReminders } = useReminderStore();
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'taken'>('all');
  
  const filteredReminders = () => {
    switch (filter) {
      case 'upcoming':
        return getUpcomingReminders();
      case 'taken':
        return getTakenReminders();
      default:
        return reminders;
    }
  };
  
  return (
    <div className="container-page">
      <div className="page-header">
        <h1 className="page-title">All Reminders</h1>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <button
              className="flex items-center rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              <Filter className="mr-1.5 h-4 w-4" />
              Filter
            </button>
            <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <button
                  onClick={() => setFilter('all')}
                  className={`block w-full px-4 py-2 text-left text-sm ${
                    filter === 'all' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  }`}
                >
                  All Reminders
                </button>
                <button
                  onClick={() => setFilter('upcoming')}
                  className={`block w-full px-4 py-2 text-left text-sm ${
                    filter === 'upcoming' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  }`}
                >
                  Upcoming
                </button>
                <button
                  onClick={() => setFilter('taken')}
                  className={`block w-full px-4 py-2 text-left text-sm ${
                    filter === 'taken' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  }`}
                >
                  Taken
                </button>
              </div>
            </div>
          </div>
          <Link
            to="/add"
            className="btn btn-primary"
          >
            <PlusCircle className="mr-1.5 h-4 w-4" />
            Add Reminder
          </Link>
        </div>
      </div>
      
      <ReminderList
        reminders={filteredReminders()}
        title={
          filter === 'upcoming'
            ? 'Upcoming Reminders'
            : filter === 'taken'
            ? 'Taken Reminders'
            : 'All Reminders'
        }
        emptyMessage={
          filter === 'upcoming'
            ? 'No upcoming reminders'
            : filter === 'taken'
            ? 'No taken reminders'
            : 'No reminders found'
        }
      />
    </div>
  );
};

export default AllRemindersPage;