import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Calendar, Users, Clock, AlertTriangle } from 'lucide-react';
import { apiService, Batch, CreateBatchPayload, Course, User } from '../../services/api';

const BatchManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [teachers, setTeachers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [facultyAssignments, setFacultyAssignments] = useState<Record<string, string>>({});

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    courseTemplateId: '',
    startDate: ''
  });

  React.useEffect(() => {
    fetchBatches();
    fetchCourses();
    fetchTeachers();
  }, []);

  const fetchBatches = async () => {
    try {
      setLoading(true);
      const response = await apiService.getBatches();
      if (response.success) {
        setBatches(response.data);
      }
    } catch (error) {
      setError('Failed to fetch batches');
      console.error('Error fetching batches:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await apiService.getCourses();
      if (response.success) {
        setCourses(response.data);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await apiService.getAllUsers();
      if (response.success) {
        const facultyUsers = response.data.filter(user => user.role === 'faculty');
        setTeachers(facultyUsers);
      }
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  const handleCourseSelect = (courseId: string) => {
    const course = courses.find(c => c._id === courseId);
    setSelectedCourse(course || null);
    setFormData({ ...formData, courseTemplateId: courseId });
    
    // Reset faculty assignments when course changes
    setFacultyAssignments({});
  };

  const handleFacultyAssignment = (subjectId: string, facultyId: string) => {
    setFacultyAssignments(prev => ({
      ...prev,
      [subjectId]: facultyId
    }));
  };

  const handleCreateBatch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload: CreateBatchPayload = {
        name: formData.name,
        courseTemplateId: formData.courseTemplateId,
        startDate: new Date(formData.startDate).toISOString(),
        facultyAssignments
      };

      const response = await apiService.createBatch(payload);
      if (response.success) {
        setShowAddModal(false);
        setFormData({ name: '', courseTemplateId: '', startDate: '' });
        setSelectedCourse(null);
        setFacultyAssignments({});
        fetchBatches(); // Refresh the list
      }
    } catch (error) {
      setError('Failed to create batch');
      console.error('Error creating batch:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBatches = batches.filter(batch =>
    batch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    batch.subjects.some(subject => 
      subject.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getBatchStatus = (batch: Batch) => {
    const now = new Date();
    const startDate = new Date(batch.startDate);
    const endDate = new Date(batch.endDate);
    
    if (now < startDate) return { status: 'upcoming', color: 'bg-blue-100 text-blue-800' };
    if (now > endDate) return { status: 'completed', color: 'bg-gray-100 text-gray-800' };
    
    const daysToEnd = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    if (daysToEnd <= 7) return { status: 'expiring', color: 'bg-yellow-100 text-yellow-800' };
    
    return { status: 'active', color: 'bg-green-100 text-green-800' };
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

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
          <p className="mt-2 text-gray-600">Loading batches...</p>
        </div>
      )}

      {/* Batches Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredBatches.map((batch) => {
          const daysRemaining = getDaysRemaining(batch.endDate);
          const isExpiringSoon = daysRemaining <= 7 && daysRemaining > 0;
          const batchStatus = getBatchStatus(batch);
          const totalLectures = batch.subjects.reduce((acc, subject) => acc + subject.totalLectures, 0);
          
          return (
            <div 
              key={batch._id} 
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
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${batchStatus.color}`}>
                      {batchStatus.status}
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
                      <span>{batch.subjects.length}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Subjects</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{totalLectures}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Total Lectures</p>
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

                {/* Subjects Preview */}
                <div className="pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Subjects</p>
                    <div className="space-y-1">
                      {batch.subjects.slice(0, 2).map((subject) => (
                        <div key={subject._id} className="text-xs text-gray-900">
                          • {subject.title}
                        </div>
                      ))}
                      {batch.subjects.length > 2 && (
                        <p className="text-xs text-gray-500">+{batch.subjects.length - 2} more</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Batch Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Batch</h2>
            <form onSubmit={handleCreateBatch} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Batch Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter batch name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
                <select 
                  value={formData.courseTemplateId}
                  onChange={(e) => handleCourseSelect(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a course</option>
                  {courses.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>
              
              {/* Faculty Assignments */}
              {selectedCourse && selectedCourse.subjects.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Faculty Assignments</label>
                  <div className="space-y-3 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-3">
                    {selectedCourse.subjects.map((subject) => (
                      <div key={subject._id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 text-sm">{subject.title}</p>
                          <p className="text-xs text-gray-600">{subject.description}</p>
                        </div>
                        <div className="ml-3">
                          <select
                            value={facultyAssignments[subject._id] || ''}
                            onChange={(e) => handleFacultyAssignment(subject._id, e.target.value)}
                            className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                            required
                          >
                            <option value="">Select Faculty</option>
                            {teachers.map((teacher) => (
                              <option key={teacher._id} value={teacher._id}>
                                {teacher.firstName} {teacher.lastName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex items-center space-x-3 pt-4">
                <button
                  type="submit"
                  disabled={loading || !selectedCourse || Object.keys(facultyAssignments).length !== selectedCourse?.subjects.length}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Creating...' : 'Create Batch'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setFormData({ name: '', courseTemplateId: '', startDate: '' });
                    setSelectedCourse(null);
                    setFacultyAssignments({});
                  }}
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