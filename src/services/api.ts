import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle, AlertCircle, Plus } from 'lucide-react';
import { apiService, FacultyLecture } from '../../services/api';

const MyLectures: React.FC = () => {
  const [showMarkLectureModal, setShowMarkLectureModal] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState<FacultyLecture | null>(null);
  const [lectures, setLectures] = useState<FacultyLecture[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    fetchFacultyLectures();
  }, []);

  const fetchFacultyLectures = async () => {
    try {
      setLoading(true);
      const response = await apiService.getFacultyLectures();
      if (response.success) {
        setLectures(response.data);
      }
    } catch (error) {
      setError('Failed to fetch your lectures');
      console.error('Error fetching faculty lectures:', error);
    } finally {
      setLoading(false);
    }
  };

    {
      id: '2',
      subject: 'Chemistry',
      batch: 'Chemistry Batch C',
      date: '2024-01-26',
      duration: 45,
      status: 'completed',
      notes: 'Laboratory practical session'
    },
    {
      id: '3',
      subject: 'Physics',
      batch: 'Physics Batch B',
      date: '2024-01-25',
      duration: 60,
      status: 'completed',
      notes: 'Thermodynamics concepts'
    },
    {
      id: '4',
      subject: 'Mathematics',
      batch: 'Math Batch A',
      date: '2024-01-24',
      duration: 0,
      status: 'missed',
      notes: 'Class cancelled due to technical issues'
    }
  ];

  const handleMarkLecture = (assignment: LectureAssignment) => {
    setSelectedAssignment(assignment);
    setShowMarkLectureModal(true);
  };

  const submitLectureRecord = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would make an API call
    console.log('Marking lecture as taken for:', selectedAssignment);
    setShowMarkLectureModal(false);
    setSelectedAssignment(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Lectures</h1>
        <p className="text-gray-600">Track your lecture assignments and mark daily attendance</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">210</h3>
              <p className="text-sm text-gray-600">Total Lectures</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">120</h3>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">90</h3>
              <p className="text-sm text-gray-600">Remaining</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lecture Assignments */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Lecture Assignments</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {lectureAssignments.map((assignment) => {
              const progress = (assignment.completedLectures / assignment.totalLectures) * 100;
              return (
                <div key={assignment.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{assignment.subject}</h3>
                      <p className="text-sm text-gray-600">{assignment.batch}</p>
                    </div>
                    <button
                      onClick={() => handleMarkLecture(assignment)}
                      className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Mark Taken Today</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-gray-900">{assignment.totalLectures}</p>
                      <p className="text-sm text-gray-600">Total Assigned</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">{assignment.completedLectures}</p>
                      <p className="text-sm text-gray-600">Completed</p>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                      <p className="text-2xl font-bold text-yellow-600">{assignment.remainingLectures}</p>
                      <p className="text-sm text-gray-600">Remaining</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium text-gray-900">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {assignment.lastLectureDate && (
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Last lecture:</span>
                      <span>{new Date(assignment.lastLectureDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Lectures */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Lecture History</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Subject</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Batch</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Duration</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentLectures.map((lecture) => (
                  <tr key={lecture.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{lecture.subject}</td>
                    <td className="py-3 px-4 text-gray-600">{lecture.batch}</td>
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(lecture.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{lecture.duration} min</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        lecture.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {lecture.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600 text-sm max-w-xs truncate">
                      {lecture.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Mark Lecture Modal */}
      {showMarkLectureModal && selectedAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Mark Lecture as Taken</h2>
            <form onSubmit={submitLectureRecord} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  value={selectedAssignment.subject}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Batch</label>
                <input
                  type="text"
                  value={selectedAssignment.batch}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                <input
                  type="number"
                  placeholder="60"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes (optional)</label>
                <textarea
                  rows={3}
                  placeholder="Add any notes about today's lecture..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Mark as Taken
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowMarkLectureModal(false);
                    setSelectedAssignment(null);
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

export default MyLectures;