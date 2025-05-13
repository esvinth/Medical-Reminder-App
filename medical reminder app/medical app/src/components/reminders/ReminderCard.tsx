import React from 'react';
import { format, formatDistance } from 'date-fns';
import { CheckCircle, Clock, Trash2, Edit } from 'lucide-react';
import { Reminder } from '../../types';
import { useReminderStore } from '../../store/reminderStore';

interface ReminderCardProps {
  reminder: Reminder;
  onEdit?: () => void;
}

const ReminderCard: React.FC<ReminderCardProps> = ({ reminder, onEdit }) => {
  const { markAsTaken, deleteReminder } = useReminderStore();
  
  const frequencyLabels = {
    'daily': 'Daily',
    'twice-daily': 'Twice Daily',
    'weekly': 'Weekly',
    'monthly': 'Monthly',
    'as-needed': 'As Needed',
  };
  
  const dueDate = new Date(reminder.dueDate);
  const formattedTime = format(dueDate, 'h:mm a');
  const formattedDate = format(dueDate, 'MMM d, yyyy');
  
  const getRelativeTime = () => {
    const now = new Date();
    if (dueDate < now && !reminder.isTaken) {
      return 'Overdue';
    }
    return formatDistance(dueDate, now, { addSuffix: true });
  };
  
  const handleMarkAsTaken = () => {
    markAsTaken(reminder.id);
  };
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this reminder?')) {
      deleteReminder(reminder.id);
    }
  };
  
  return (
    <div 
      className={`card mb-4 animate-fadeIn border-l-4 ${
        reminder.isTaken 
          ? 'border-l-success' 
          : 'border-l-primary'
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="mb-2 md:mb-0">
          <h3 className="text-lg font-semibold text-gray-900">{reminder.medicineName}</h3>
          <p className="text-gray-600">{reminder.dosage}</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <span 
            className={`pill ${
              reminder.isTaken ? 'pill-success' : 'pill-primary'
            }`}
          >
            {reminder.isTaken ? 'Taken' : frequencyLabels[reminder.frequency]}
          </span>
          
          <span className="flex items-center text-sm text-gray-500">
            <Clock className="mr-1 h-4 w-4" />
            {formattedTime}
          </span>
          
          <span className="text-sm text-gray-500">{formattedDate}</span>
        </div>
      </div>
      
      {reminder.notes && (
        <p className="mt-2 text-sm text-gray-600">{reminder.notes}</p>
      )}
      
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          {reminder.isTaken ? (
            <span className="flex items-center">
              <CheckCircle className="mr-1 h-4 w-4 text-success" />
              Taken {reminder.takenAt && format(new Date(reminder.takenAt), 'MMM d, h:mm a')}
            </span>
          ) : (
            <span className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              {getRelativeTime()}
            </span>
          )}
        </div>
        
        <div className="flex space-x-2">
          {!reminder.isTaken && (
            <>
              <button 
                onClick={handleMarkAsTaken}
                className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-success"
                title="Mark as taken"
              >
                <CheckCircle className="h-5 w-5" />
              </button>
              
              {onEdit && (
                <button 
                  onClick={onEdit}
                  className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-primary"
                  title="Edit reminder"
                >
                  <Edit className="h-5 w-5" />
                </button>
              )}
            </>
          )}
          
          <button 
            onClick={handleDelete}
            className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-error"
            title="Delete reminder"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReminderCard;