import React from 'react';
import { Link } from 'react-router-dom';
import { Pill, Clock, Plus, List, Settings, Calendar } from 'lucide-react';

const AboutPage: React.FC = () => {
  const features = [
    {
      icon: <Calendar className="h-8 w-8 text-primary" />,
      title: 'Medication Calendar',
      description: 'View your medications in a calendar or list format to easily track your schedule.',
    },
    {
      icon: <Plus className="h-8 w-8 text-secondary" />,
      title: 'Simple Reminders',
      description: 'Create reminders with medication name, dosage, frequency, and specific time.',
    },
    {
      icon: <Clock className="h-8 w-8 text-accent" />,
      title: 'Medication History',
      description: 'Keep track of your medication history to share with healthcare providers.',
    },
    {
      icon: <Settings className="h-8 w-8 text-gray-600" />,
      title: 'Customizable',
      description: 'Adjust notification settings to fit your preferences and lifestyle.',
    },
  ];
  
  const instructions = [
    {
      title: 'Add Medications',
      description: 'Start by adding your medications with details like name, dosage, and schedule.',
      link: '/add',
    },
    {
      title: 'View Reminders',
      description: 'Check your upcoming medications in the calendar or list view.',
      link: '/reminders',
    },
    {
      title: 'Mark as Taken',
      description: 'Track your adherence by marking medications as taken when you take them.',
      link: '/reminders',
    },
    {
      title: 'Review History',
      description: 'Keep track of your medication history for better health management.',
      link: '/history',
    },
  ];
  
  return (
    <div className="container-page">
      <div className="page-header">
        <h1 className="page-title">About MediRemind</h1>
      </div>
      
      <div className="rounded-lg bg-white p-6 shadow">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary-100">
            <Pill className="h-10 w-10 text-primary" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            Welcome to MediRemind
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            MediRemind helps you stay on top of your medication schedule with simple, 
            easy-to-use reminders. Never miss a dose again and keep track of your health journey.
          </p>
        </div>
        
        <section className="mb-8">
          <h3 className="mb-4 text-xl font-semibold text-gray-900">Features</h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div key={index} className="card">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                  {feature.icon}
                </div>
                <h4 className="mb-2 text-lg font-medium text-gray-900">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
        
        <section className="mb-8">
          <h3 className="mb-4 text-xl font-semibold text-gray-900">How to Use</h3>
          <div className="grid gap-6 sm:grid-cols-2">
            {instructions.map((instruction, index) => (
              <div key={index} className="flex">
                <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white">
                  {index + 1}
                </div>
                <div>
                  <h4 className="mb-1 text-lg font-medium text-gray-900">{instruction.title}</h4>
                  <p className="mb-2 text-sm text-gray-600">{instruction.description}</p>
                  <Link to={instruction.link} className="text-sm font-medium text-primary hover:underline">
                    Go to {instruction.title} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <section>
          <h3 className="mb-4 text-xl font-semibold text-gray-900">Health Disclaimer</h3>
          <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
            <p className="mb-2">
              <strong>Important:</strong> MediRemind is a reminder tool to assist with medication 
              management, not a substitute for professional medical advice.
            </p>
            <p>
              Always consult with healthcare professionals regarding your medication 
              regimen and follow their guidance. The app does not provide medical 
              recommendations or guarantee medication effectiveness.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;