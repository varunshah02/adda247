import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Calendar, Users, Clock, AlertTriangle } from 'lucide-react';

interface Batch {
  id: string;
  name: string;
  course: string;
  startDate: string;
  endDate: string;
  totalStudents: number;
  activeStudents: number;
  teacher: string;
  status: 'active' | 'upcoming' | 'completed' | 'expiring';
  validityPeriod: string;
  completionRate: number;
}

const BatchManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock data
  const batches: Batch[] = [
    {
      id: '1',
      name: 'Math Batch A',
      course: 'Advanced Mathematics',
      startDate: '2024-01-15',
      endDate: '2024-07-15',
      totalStudents: 25,
      activeStudents: 23,
      teacher: 'Sarah Johnson',
      status: 'active',
      validityPeriod: '6 months',
      completionRate: 65
    },
    {
      id: '2',
      name: 'Chemistry Batch B',
      course: 'Organic Chemistry',
      startDate: '2024-02-01',
      endDate: '2024-06-01',
      totalStudents: 20,
      activeStudents: 18,
      teacher: 'Michael Brown',
      status: 'active',
      validityPeriod: '4 months',
      completionRate: 40
    },
    {
      id: '3',
      name: 'Writing Batch C',
      course: 'Creative Writing',
      startDate: '2024-03-01',
      endDate: '2024-06-01',
      totalStudents: 15,
      activeStudents: 15,
      teacher: 'Emily Davis',
      status: 'expiring',
      validityPeriod: '3 months',
      completionRate: 85
    },
    {
      id: '4',
      name: 'Physics Batch D',
      course: 'Advanced Physics',
      startDate: '2024-04-15',
      endDate: '2024-10-15',
      totalStudents: 30,
      activeStudents: 0,
      teacher: 'Dr. Wilson',
      status: 'upcoming',
      validityPeriod: '6 months',
      completionRate: 0
    }
  ];

  const filteredBatches = batches.filter(batch =>
    batch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    batch.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
    batch.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'expiring':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysRemaining = (endDate: string) => {
    const today = new Date();
    const end = new Date(endDate);
    const timeDiff = end.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Batch Management</h1>
          <p className="text-gray-600">Manage student batches with validity tracking</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Create Batch</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search batches by name, course, or teacher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="upcoming">Upcoming</option>
            <option value="expiring">Expiring Soon</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Batches Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredBatches.map((batch) => {
          const daysRemaining = getDaysRemaining(batch.endDate);
          const isExpiringSoon = daysRemaining <= 7 && daysRemaining > 0;
          
          return (
            <div 
              key={batch.id} 
              className={`bg-white rounded-lg shadow-sm border-2 hover:shadow-md transition-all duration-200 ${
                isExpiringSoon ? 'border-yellow-300' : 'border-gray-200'
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{batch.name}</h3>
                      {isExpiringSoon && (
                        <AlertTriangle className="w-5 h-5 text-yellow-600" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{batch.course}</p>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(batch.status)}`}>
                      {batch.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Batch Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{batch.activeStudents}/{batch.totalStudents}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Active Students</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{batch.validityPeriod}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Duration</p>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium text-gray-900">{batch.completionRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${batch.completionRate}%` }}
                    ></div>
                  </div>
                </div>

                {/* Dates and Validity */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Start Date:</span>
                    <span className="text-gray-900">{new Date(batch.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">End Date:</span>
                    <span className="text-gray-900">{new Date(batch.endDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Days Remaining:</span>
                    <span className={`font-medium ${
                      daysRemaining <= 0 ? 'text-red-600' : 
                      daysRemaining <= 7 ? 'text-yellow-600' : 
                      'text-green-600'
                    }`}>
                      {daysRemaining <= 0 ? 'Expired' : `${daysRemaining} days`}
                    </span>
                  </div>
                </div>

                {/* Teacher */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Teacher</p>
                      <p className="font-medium text-gray-900">{batch.teacher}</p>
                    </div>
                    {isExpiringSoon && (
                      <div className="text-xs text-yellow-600 font-medium">
                        Expiring Soon!
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Batch Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Batch</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Batch Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter batch name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent">
                  <option value="">Select a course</option>
                  <option value="1">Advanced Mathematics</option>
                  <option value="2">Organic Chemistry</option>
                  <option value="3">Creative Writing</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Teacher</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent">
                  <option value="">Select a teacher</option>
                  <option value="1">Sarah Johnson</option>
                  <option value="2">Michael Brown</option>
                  <option value="3">Emily Davis</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Students</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter number of students"
                />
              </div>
              <div className="flex items-center space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Create Batch
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BatchManagement;