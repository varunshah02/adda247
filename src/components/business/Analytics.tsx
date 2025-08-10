import React from 'react';
import { TrendingUp, Users, BookOpen, Target, Calendar, Clock } from 'lucide-react';

const Analytics: React.FC = () => {
  // Mock analytics data
  const courseCompletionData = [
    { course: 'Advanced Mathematics', completion: 85, total: 45, completed: 38 },
    { course: 'Organic Chemistry', completion: 72, total: 32, completed: 23 },
    { course: 'Creative Writing', completion: 95, total: 28, completed: 27 },
    { course: 'Advanced Physics', completion: 60, total: 30, completed: 18 }
  ];

  const teacherPerformance = [
    { name: 'Sarah Johnson', courses: 2, completion: 78, lectures: 65, rating: 4.8 },
    { name: 'Michael Brown', courses: 2, completion: 68, lectures: 50, rating: 4.6 },
    { name: 'Emily Davis', courses: 1, completion: 95, lectures: 42, rating: 4.9 },
    { name: 'Dr. Wilson', courses: 1, completion: 60, lectures: 15, rating: 4.3 }
  ];

  const batchAnalytics = [
    { batch: 'Math Batch A', students: 25, active: 23, completion: 65, expiry: '2024-07-15' },
    { batch: 'Chemistry Batch B', students: 20, active: 18, completion: 40, expiry: '2024-06-01' },
    { batch: 'Writing Batch C', students: 15, active: 15, completion: 85, expiry: '2024-06-01' },
    { batch: 'Physics Batch D', students: 30, active: 0, completion: 0, expiry: '2024-10-15' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">Comprehensive insights into your institution's performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">78%</h3>
              <p className="text-sm text-gray-600">Average Completion</p>
              <p className="text-xs text-green-600 mt-1">↑ 12% from last month</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">135</h3>
              <p className="text-sm text-gray-600">Active Students</p>
              <p className="text-xs text-blue-600 mt-1">4 new this week</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">18</h3>
              <p className="text-sm text-gray-600">Active Courses</p>
              <p className="text-xs text-purple-600 mt-1">2 added recently</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">91%</h3>
              <p className="text-sm text-gray-600">Lecture Attendance</p>
              <p className="text-xs text-red-600 mt-1">↑ 5% improvement</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <Target className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Course Completion Analytics */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Course Completion Analysis</h2>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {courseCompletionData.map((course, index) => (
              <div key={index} className="border border-gray-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">{course.course}</h3>
                  <span className="text-sm text-gray-600">
                    {course.completed}/{course.total} students completed
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-red-600 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${course.completion}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-12">
                    {course.completion}%
                  </span>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Completion rate based on topics covered vs total topics
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Teacher Performance */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Teacher Performance Evaluation</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Courses</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Completion</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lectures Given</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teacherPerformance.map((teacher, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{teacher.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{teacher.courses}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{teacher.completion}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{teacher.lectures}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-900 mr-2">{teacher.rating}</span>
                      <div className="flex text-yellow-400">
                        {'★'.repeat(Math.floor(teacher.rating))}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      teacher.completion >= 80 ? 'bg-green-100 text-green-800' :
                      teacher.completion >= 60 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {teacher.completion >= 80 ? 'Excellent' :
                       teacher.completion >= 60 ? 'Good' : 'Needs Improvement'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Batch Analytics */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Batch Performance & Status</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {batchAnalytics.map((batch, index) => {
              const daysToExpiry = Math.ceil((new Date(batch.expiry).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
              return (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900">{batch.batch}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      daysToExpiry <= 7 ? 'bg-red-100 text-red-800' :
                      daysToExpiry <= 30 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {daysToExpiry > 0 ? `${daysToExpiry} days left` : 'Expired'}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Students:</span>
                      <span className="text-gray-900">{batch.active}/{batch.students} active</span>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Completion:</span>
                        <span className="text-gray-900">{batch.completion}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-red-600 h-2 rounded-full"
                          style={{ width: `${batch.completion}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>Expires:</span>
                      </div>
                      <span className="text-gray-900">{new Date(batch.expiry).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Insights & Recommendations */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Insights & Recommendations</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-green-800">Excellent Progress</h3>
                <p className="text-sm text-green-700">Emily Davis shows outstanding performance with 95% completion rate in Creative Writing.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-yellow-800">Attention Needed</h3>
                <p className="text-sm text-yellow-700">Chemistry Batch B and Writing Batch C are expiring soon. Consider extending validity or archiving.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
              <Users className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-blue-800">Growth Opportunity</h3>
                <p className="text-sm text-blue-700">Physics Batch D has high enrollment (30 students) but hasn't started yet. Ensure proper preparation.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;