import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Pill, Menu, X, Calendar, PlusCircle, History, Settings, Info } from 'lucide-react';
import { useSettingsStore } from '../../store/settingsStore';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { username } = useSettingsStore();
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const closeMenu = () => {
    setIsOpen(false);
  };
  
  const navLinks = [
    { path: '/reminders', label: 'All Reminders', icon: <Calendar size={18} /> },
    { path: '/add', label: 'Add Reminder', icon: <PlusCircle size={18} /> },
    { path: '/history', label: 'History', icon: <History size={18} /> },
    { path: '/settings', label: 'Settings', icon: <Settings size={18} /> },
    { path: '/about', label: 'About', icon: <Info size={18} /> },
  ];
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <Link to="/" className="flex flex-shrink-0 items-center" onClick={closeMenu}>
              <Pill className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-gray-900">MediRemind</span>
            </Link>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center px-3 py-2 text-sm font-medium ${
                  isActive(link.path)
                    ? 'text-primary'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="mr-1.5">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="relative ml-3">
              <div className="flex items-center">
                <div className="text-sm font-medium text-gray-700">Hello, {username}</div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-expanded="false"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`sm:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="space-y-1 pb-3 pt-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center px-4 py-2 text-base font-medium ${
                isActive(link.path)
                  ? 'bg-primary-50 text-primary'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              onClick={closeMenu}
            >
              <span className="mr-2">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </div>
        <div className="border-t border-gray-200 pb-3 pt-4">
          <div className="flex items-center px-4">
            <div className="text-sm font-medium text-gray-700">Hello, {username}</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;