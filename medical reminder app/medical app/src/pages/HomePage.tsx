import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, PlusCircle, Clock, Settings } from 'lucide-react';
import { useReminderStore } from '../store/reminderStore';
import ReminderCard from '../components/reminders/ReminderCard';

const HomePage: React.FC = () => {
  const { getUpcomingReminders } = useReminderStore();
  const upcomingReminders = getUpcomingReminders();
  
  // Get today's reminders
  const today = new Date().toISOString().split('T')[0];
  const todayReminders = upcomingReminders.filter(
    (reminder) => reminder.dueDate.split('T')[0] === today
  );
  
  const featureCards = [
    {
      title: 'All Reminders',
      description: 'View and manage all your medication reminders',
      icon: <Calendar className="h-8 w-8 text-primary" />,
      link: '/reminders',
      color: 'bg-primary-50',
    },
    {
      title: 'Add Reminder',
      description: 'Create a new medication reminder',
      icon: <PlusCircle className="h-8 w-8 text-secondary" />,
      link: '/add',
      color: 'bg-secondary-50',
    },
    {
      title: 'History',
      description: 'View your medication history',
      icon: <Clock className="h-8 w-8 text-accent" />,
      link: '/history',
      color: 'bg-accent-50',
    },
    {
      title: 'Settings',
      description: 'Customize your reminder preferences',
      icon: <Settings className="h-8 w-8 text-gray-600" />,
      link: '/settings',
      color: 'bg-gray-50',
    },
  ];
  
  return (
    <div className="container-page">
      <header className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 sm:text-4xl">
          Welcome to MediRemind
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Keep track of your medications and never miss a dose again
        </p>
      </header>
      
      <section className="mb-8 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 p-6 shadow-lg">
        <div className="flex flex-col items-center justify-between gap-4 text-white md:flex-row">
          <div>
            <h2 className="text-2xl font-bold">Quick Add Reminder</h2>
            <p className="max-w-lg">
              Add a new medication reminder to stay on top of your health regimen
            </p>
          </div>
          <Link to="/add" className="rounded-md bg-white px-4 py-2 font-medium text-primary shadow transition hover:bg-gray-100">
            Add Reminder
          </Link>
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">Today's Reminders</h2>
        {todayReminders.length > 0 ? (
          <div className="space-y-4">
            {todayReminders.map((reminder) => (
              <ReminderCard key={reminder.id} reminder={reminder} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg bg-white p-6 text-center shadow">
            <p className="text-gray-500">No reminders for today</p>
            <Link to="/add" className="mt-2 inline-block text-primary hover:underline">
              Add a reminder
            </Link>
          </div>
        )}
      </section>
      
      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900">Quick Access</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featureCards.map((card) => (
            <Link
              key={card.title}
              to={card.link}
              className={`card flex flex-col items-center p-6 text-center transition-transform hover:-translate-y-1 ${card.color}`}
            >
              <div className="mb-4 rounded-full bg-white p-3 shadow-sm">{card.icon}</div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">{card.title}</h3>
              <p className="text-sm text-gray-600">{card.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;