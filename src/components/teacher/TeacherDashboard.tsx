import React from 'react';
import { useLocation } from 'react-router-dom';
import TeacherOverview from './TeacherOverview';
import MyCourses from './MyCourses';
import MyLectures from './MyLectures';
import Progress from './Progress';

const TeacherDashboard: React.FC = () => {
  const location = useLocation();
  
  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/my-courses') return 'my-courses';
    if (path === '/lectures') return 'lectures';
    if (path === '/progress') return 'progress';
    return 'dashboard';
  };

  const renderContent = () => {
    const activeTab = getActiveTab();
    
    switch (activeTab) {
      case 'dashboard':
        return <TeacherOverview />;
      case 'my-courses':
        return <MyCourses />;
      case 'lectures':
        return <MyLectures />;
      case 'progress':
        return <Progress />;
      default:
        return <TeacherOverview />;
    }
  };

  return (
    <div className="p-3 sm:p-4 lg:p-6 max-w-full">
      {renderContent()}
    </div>
  );
};

export default TeacherDashboard;