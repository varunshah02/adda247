import React from 'react';
import TeacherOverview from './TeacherOverview';
import MyCourses from './MyCourses';
import MyLectures from './MyLectures';
import Progress from './Progress';

interface TeacherDashboardProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ activeTab }) => {
  const renderContent = () => {
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

  return <div className="p-6">{renderContent()}</div>;
};

export default TeacherDashboard;