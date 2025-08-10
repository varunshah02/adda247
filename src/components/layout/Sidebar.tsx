import React from 'react';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  BarChart3,
  CheckSquare,
  Clock,
  X
} from 'lucide-react';
import Logo from '../../assets/header-logo.png';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  showMenu: boolean;
  setShowMenu: (val: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, setShowMenu }) => {
  const { user } = useAuth();

  const businessMenuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'teachers', icon: Users, label: 'Teachers' },
    { id: 'courses', icon: BookOpen, label: 'Courses' },
    { id: 'batches', icon: Calendar, label: 'Batches' },
    { id: 'lectures', icon: Clock, label: 'Lecture Tracking' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
  ];

  const teacherMenuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'my-courses', icon: BookOpen, label: 'My Courses' },
    { id: 'lectures', icon: Clock, label: 'My Lectures' },
    { id: 'progress', icon: CheckSquare, label: 'Progress' },
  ];

  const menuItems = user?.role === 'business' ? businessMenuItems : teacherMenuItems;

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
      {/* Logo + Close button */}
      <div className="p-6 border-b border-gray-200 flex justify-evenly items-center">
        <img src={Logo} alt="EduTracker Logo" className="w-[50] h-[50] object-contain" />
        <button
          onClick={() => setShowMenu(false)}
          className="lg:hidden rounded hover:bg-gray-100 relative mr-0 ms-2"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-red-50 text-red-700 border border-red-200'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
