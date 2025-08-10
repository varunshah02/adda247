import React from 'react';
import DashboardOverview from './DashboardOverview';
import TeacherManagement from './TeacherManagement';
import CourseManagement from './CourseManagement';
import BatchManagement from './BatchManagement';
import LectureTracking from './LectureTracking';
import Analytics from './Analytics';

interface BusinessDashboardProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const BusinessDashboard: React.FC<BusinessDashboardProps> = ({ activeTab }) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'teachers':
        return <TeacherManagement />;
      case 'courses':
        return <CourseManagement />;
      case 'batches':
        return <BatchManagement />;
      case 'lectures':
        return <LectureTracking />;
      case 'analytics':
        return <Analytics />;
      default:
        return <DashboardOverview />;
    }
  };

  return <div className="p-6">{renderContent()}</div>;
};

export default BusinessDashboard;