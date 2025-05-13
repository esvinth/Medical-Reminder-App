import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReminderStore } from '../../store/reminderStore';
import { Frequency } from '../../types';

interface ReminderFormProps {
  onSuccess?: () => void;
}

const ReminderForm: React.FC<ReminderFormProps> = ({ onSuccess }) => {
  const navigate = useNavigate();
  const { addReminder } = useReminderStore();
  
  const [formData, setFormData] = useState({
    medicineName: '',
    dosage: '',
    frequency: 'daily' as Frequency,
    time: '',
    notes: '',
    dueDate: new Date().toISOString().split('T')[0],
  });
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Combine date and time for the due date
    const combinedDueDate = new Date(`${formData.dueDate}T${formData.time}`).toISOString();
    
    addReminder({
      ...formData,
      dueDate: combinedDueDate,
    });
    
    if (onSuccess) {
      onSuccess();
    } else {
      navigate('/reminders');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="animate-fadeIn rounded-lg bg-white p-6 shadow">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="form-group">
          <label htmlFor="medicineName" className="form-label">
            Medicine Name *
          </label>
          <input
            type="text"
            id="medicineName"
            name="medicineName"
            value={formData.medicineName}
            onChange={handleChange}
            className="form-input"
            placeholder="e.g., Ibuprofen"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="dosage" className="form-label">
            Dosage *
          </label>
          <input
            type="text"
            id="dosage"
            name="dosage"
            value={formData.dosage}
            onChange={handleChange}
            className="form-input"
            placeholder="e.g., 200mg"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="frequency" className="form-label">
            Frequency *
          </label>
          <select
            id="frequency"
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
            className="form-input"
            required
          >
            <option value="daily">Daily</option>
            <option value="twice-daily">Twice Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="as-needed">As Needed</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="time" className="form-label">
            Time *
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="dueDate" className="form-label">
            Date *
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
      </div>
      
      <div className="form-group mt-4">
        <label htmlFor="notes" className="form-label">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="form-input"
          placeholder="Any additional instructions or notes..."
          rows={3}
        />
      </div>
      
      <div className="mt-6 flex items-center justify-end space-x-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="btn btn-outline"
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Add Reminder
        </button>
      </div>
    </form>
  );
};

export default ReminderForm;