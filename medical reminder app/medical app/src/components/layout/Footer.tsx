import React from 'react';
import { Pill } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex items-center justify-center md:justify-start">
            <Pill className="h-6 w-6 text-primary" />
            <span className="ml-2 text-lg font-bold text-gray-900">MediRemind</span>
          </div>
          <div className="mt-4 text-center text-sm text-gray-500 md:mt-0">
            &copy; {currentYear} MediRemind. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;