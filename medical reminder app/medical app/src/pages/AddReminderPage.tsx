import React from 'react';
import ReminderForm from '../components/reminders/ReminderForm';

const AddReminderPage: React.FC = () => {
  return (
    <div className="container-page">
      <div className="page-header">
        <h1 className="page-title">Add Reminder</h1>
      </div>
      
      <div className="max-w-3xl">
        <ReminderForm />
      </div>
    </div>
  );
};

export default AddReminderPage;