import React, { useState } from 'react';
import { User, Volume2, Clock, Sun } from 'lucide-react';
import { useSettingsStore } from '../store/settingsStore';

const SettingsPage: React.FC = () => {
  const settings = useSettingsStore();
  const [formData, setFormData] = useState({
    username: settings.username,
    notificationTime: settings.notificationTime,
    notificationSound: settings.notificationSound,
    theme: settings.theme,
  });
  
  const [isSaved, setIsSaved] = useState(false);
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'notificationTime' ? parseInt(value, 10) : value,
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    settings.updateSettings(formData);
    setIsSaved(true);
    
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };
  
  return (
    <div className="container-page">
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
      </div>
      
      <div className="max-w-3xl rounded-lg bg-white p-6 shadow">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <h2 className="mb-4 text-lg font-medium text-gray-900">
              User Preferences
            </h2>
            
            <div className="form-group">
              <label htmlFor="username" className="form-label flex items-center">
                <User className="mr-2 h-4 w-4 text-gray-500" />
                Display Name
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="form-input"
                placeholder="Your Name"
              />
            </div>
          </div>
          
          <div className="border-b border-gray-200 pb-4">
            <h2 className="mb-4 text-lg font-medium text-gray-900">
              Notification Settings
            </h2>
            
            <div className="form-group">
              <label htmlFor="notificationTime" className="form-label flex items-center">
                <Clock className="mr-2 h-4 w-4 text-gray-500" />
                Reminder Notification Time
              </label>
              <select
                id="notificationTime"
                name="notificationTime"
                value={formData.notificationTime}
                onChange={handleChange}
                className="form-input"
              >
                <option value={0}>At the scheduled time</option>
                <option value={5}>5 minutes before</option>
                <option value={15}>15 minutes before</option>
                <option value={30}>30 minutes before</option>
                <option value={60}>1 hour before</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="notificationSound" className="form-label flex items-center">
                <Volume2 className="mr-2 h-4 w-4 text-gray-500" />
                Notification Sound
              </label>
              <select
                id="notificationSound"
                name="notificationSound"
                value={formData.notificationSound}
                onChange={handleChange}
                className="form-input"
              >
                <option value="chime">Chime</option>
                <option value="bell">Bell</option>
                <option value="alert">Alert</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          
          <div>
            <h2 className="mb-4 text-lg font-medium text-gray-900">
              Appearance
            </h2>
            
            <div className="form-group">
              <label htmlFor="theme" className="form-label flex items-center">
                <Sun className="mr-2 h-4 w-4 text-gray-500" />
                Theme
              </label>
              <select
                id="theme"
                name="theme"
                value={formData.theme}
                onChange={handleChange}
                className="form-input"
              >
                <option value="light">Light</option>
                <option value="dark">Dark (Coming Soon)</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            {isSaved && (
              <p className="text-sm text-success">Settings saved successfully!</p>
            )}
            <div className="ml-auto">
              <button type="submit" className="btn btn-primary">
                Save Settings
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;