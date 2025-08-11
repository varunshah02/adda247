import React from 'react';
import { Users, BookOpen, Calendar, TrendingUp, Clock, CheckCircle } from 'lucide-react';

const DashboardOverview: React.FC = () => {
  const stats = [
    {
      title: 'Total Teachers',
      value: '24',
      change: '+2 this month',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Active Courses',
      value: '18',
      change: '+3 this month',
      icon: BookOpen,
      color: 'green'
    },
    {
      title: 'Active Batches',
      value: '12',
      change: '2 expiring soon',
      icon: Calendar,
      color: 'yellow'
    },
    {
      title: 'Completion Rate',
      value: '87%',
      change: '+5% from last month',
      icon: TrendingUp,
      color: 'red'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'lecture',
      message: 'Sarah Johnson completed Math lecture for Batch A',
      time: '2 hours ago',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'course',
      message: 'New course "Advanced Physics" was created',
      time: '4 hours ago',
      icon: BookOpen,
      color: 'text-blue-600'
    },
    {
      id: 3,
      type: 'batch',
      message: 'Batch C validity expires in 5 days',
      time: '6 hours ago',
      icon: Calendar,
      color: 'text-yellow-600'
    },
    {
      id: 4,
      type: 'teacher',
      message: 'Michael Brown assigned to Chemistry course',
      time: '1 day ago',
      icon: Users,
      color: 'text-purple-600'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600',
      green: 'bg-green-50 text-green-600',
      yellow: 'bg-yellow-50 text-yellow-600',
      red: 'bg-red-50 text-red-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-sm sm:text-base text-gray-600">Monitor your institution's performance at a glance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className={`p-2 sm:p-3 rounded-lg ${getColorClasses(stat.color)}`}>
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-sm font-medium text-gray-600 mb-2">{stat.title}</p>
              <p className="text-xs text-gray-500">{stat.change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="p-4 sm:p-6">
          <div className="space-y-3 sm:space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className={`p-2 rounded-full bg-gray-100 ${activity.color} flex-shrink-0`}>
                  <activity.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 mb-1">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <button className="p-4 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors text-left">
            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 mb-2" />
            <h3 className="font-medium text-gray-900 text-sm sm:text-base">Add Teacher</h3>
            <p className="text-xs sm:text-sm text-gray-600">Register a new faculty member</p>
          </button>
          <button className="p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors text-left">
            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mb-2" />
            <h3 className="font-medium text-gray-900 text-sm sm:text-base">Create Course</h3>
            <p className="text-xs sm:text-sm text-gray-600">Design a new curriculum</p>
          </button>
          <button className="p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors text-left sm:col-span-2 lg:col-span-1">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 mb-2" />
            <h3 className="font-medium text-gray-900 text-sm sm:text-base">New Batch</h3>
            <p className="text-xs sm:text-sm text-gray-600">Start a new learning batch</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;