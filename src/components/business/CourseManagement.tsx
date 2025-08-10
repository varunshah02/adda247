import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Clock, Users, CheckCircle } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  topics: Topic[];
  assignedTeachers: string[];
  totalStudents: number;
  completionRate: number;
  status: 'active' | 'draft' | 'archived';
  createdDate: string;
}

interface Topic {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  estimatedHours: number;
}

const CourseManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Mock data
  const courses: Course[] = [
    {
      id: '1',
      title: 'Advanced Mathematics',
      description: 'Comprehensive mathematics course covering algebra, calculus, and statistics',
      duration: '6 months',
      topics: [
        { id: '1', title: 'Linear Algebra', description: 'Matrices and vectors', isCompleted: true, estimatedHours: 20 },
        { id: '2', title: 'Calculus I', description: 'Differential calculus', isCompleted: true, estimatedHours: 25 },
        { id: '3', title: 'Calculus II', description: 'Integral calculus', isCompleted: false, estimatedHours: 25 },
        { id: '4', title: 'Statistics', description: 'Descriptive and inferential statistics', isCompleted: false, estimatedHours: 30 }
      ],
      assignedTeachers: ['Sarah Johnson', 'Michael Brown'],
      totalStudents: 45,
      completionRate: 65,
      status: 'active',
      createdDate: '2023-01-15'
    },
    {
      id: '2',
      title: 'Organic Chemistry',
      description: 'Study of carbon compounds and their reactions',
      duration: '4 months',
      topics: [
        { id: '5', title: 'Hydrocarbons', description: 'Alkanes, alkenes, and alkynes', isCompleted: true, estimatedHours: 15 },
        { id: '6', title: 'Functional Groups', description: 'Alcohols, aldehydes, ketones', isCompleted: false, estimatedHours: 20 },
        { id: '7', title: 'Reaction Mechanisms', description: 'Understanding organic reactions', isCompleted: false, estimatedHours: 25 }
      ],
      assignedTeachers: ['Michael Brown'],
      totalStudents: 32,
      completionRate: 40,
      status: 'active',
      createdDate: '2023-02-10'
    },
    {
      id: '3',
      title: 'Creative Writing',
      description: 'Developing writing skills across various genres',
      duration: '3 months',
      topics: [
        { id: '8', title: 'Poetry', description: 'Forms and techniques in poetry', isCompleted: true, estimatedHours: 12 },
        { id: '9', title: 'Short Stories', description: 'Narrative structure and character development', isCompleted: true, estimatedHours: 18 },
        { id: '10', title: 'Essay Writing', description: 'Argumentative and descriptive essays', isCompleted: true, estimatedHours: 15 }
      ],
      assignedTeachers: ['Emily Davis'],
      totalStudents: 28,
      completionRate: 90,
      status: 'active',
      createdDate: '2023-03-01'
    }
  ];

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Course Management</h1>
          <p className="text-gray-600">Create and manage courses with detailed roadmaps</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Create Course</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search courses by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{course.description}</p>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(course.status)}`}>
                    {course.status}
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

              {/* Course Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Duration</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{course.totalStudents}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Students</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>{course.completionRate}%</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Complete</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium text-gray-900">{course.completionRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-red-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${course.completionRate}%` }}
                  ></div>
                </div>
              </div>

              {/* Topics Preview */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Topics ({course.topics.filter(t => t.isCompleted).length}/{course.topics.length} completed)
                </h4>
                <div className="space-y-1">
                  {course.topics.slice(0, 3).map((topic) => (
                    <div key={topic.id} className="flex items-center space-x-2 text-sm">
                      <CheckCircle className={`w-4 h-4 ${topic.isCompleted ? 'text-green-600' : 'text-gray-300'}`} />
                      <span className={topic.isCompleted ? 'text-gray-600 line-through' : 'text-gray-900'}>
                        {topic.title}
                      </span>
                    </div>
                  ))}
                  {course.topics.length > 3 && (
                    <p className="text-xs text-gray-500 ml-6">+{course.topics.length - 3} more topics</p>
                  )}
                </div>
              </div>

              {/* Teachers */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Assigned Teachers</h4>
                <div className="flex flex-wrap gap-2">
                  {course.assignedTeachers.map((teacher, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-50 text-blue-800 text-xs rounded-full">
                      {teacher}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <span className="text-xs text-gray-500">
                  Created {new Date(course.createdDate).toLocaleDateString()}
                </span>
                <button
                  onClick={() => setSelectedCourse(course)}
                  className="text-sm text-red-600 hover:text-red-800 font-medium"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Course Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Course</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter course title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter course description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="e.g., 6 months"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent">
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Topics/Roadmap</label>
                <div className="space-y-2">
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Topic 1"
                  />
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Topic 2"
                  />
                  <button
                    type="button"
                    className="text-sm text-red-600 hover:text-red-800 font-medium"
                  >
                    + Add Another Topic
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Create Course
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

export default CourseManagement;