import React, { useState } from 'react';
import { Search, BookOpen, Users, Clock, CheckCircle, Circle, Play } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  batch: string;
  totalStudents: number;
  duration: string;
  topics: Topic[];
  startDate: string;
  progress: number;
}

interface Topic {
  id: string;
  title: string;
  description: string;
  estimatedHours: number;
  isCompleted: boolean;
  completedDate?: string;
}

const MyCourses: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Mock data for teacher's assigned courses
  const courses: Course[] = [
    {
      id: '1',
      title: 'Advanced Mathematics',
      description: 'Comprehensive mathematics covering algebra, calculus, and statistics',
      batch: 'Math Batch A',
      totalStudents: 25,
      duration: '6 months',
      startDate: '2024-01-15',
      progress: 75,
      topics: [
        { id: '1', title: 'Linear Algebra', description: 'Matrices and vector spaces', estimatedHours: 20, isCompleted: true, completedDate: '2024-02-01' },
        { id: '2', title: 'Calculus I', description: 'Differential calculus fundamentals', estimatedHours: 25, isCompleted: true, completedDate: '2024-02-15' },
        { id: '3', title: 'Calculus II', description: 'Integral calculus and applications', estimatedHours: 25, isCompleted: true, completedDate: '2024-03-01' },
        { id: '4', title: 'Statistics', description: 'Descriptive and inferential statistics', estimatedHours: 30, isCompleted: false },
        { id: '5', title: 'Probability Theory', description: 'Advanced probability concepts', estimatedHours: 20, isCompleted: false }
      ]
    },
    {
      id: '2',
      title: 'Basic Physics',
      description: 'Fundamental physics concepts and principles',
      batch: 'Physics Batch B',
      totalStudents: 20,
      duration: '4 months',
      startDate: '2024-02-01',
      progress: 60,
      topics: [
        { id: '6', title: 'Mechanics', description: 'Classical mechanics and motion', estimatedHours: 25, isCompleted: true, completedDate: '2024-02-20' },
        { id: '7', title: 'Thermodynamics', description: 'Heat and energy transfer', estimatedHours: 20, isCompleted: true, completedDate: '2024-03-10' },
        { id: '8', title: 'Electricity', description: 'Electric circuits and current', estimatedHours: 22, isCompleted: true, completedDate: '2024-03-25' },
        { id: '9', title: 'Magnetism', description: 'Magnetic fields and forces', estimatedHours: 20, isCompleted: false },
        { id: '10', title: 'Waves and Optics', description: 'Wave properties and light', estimatedHours: 18, isCompleted: false }
      ]
    },
    {
      id: '3',
      title: 'Applied Chemistry',
      description: 'Practical chemistry applications and laboratory work',
      batch: 'Chemistry Batch C',
      totalStudents: 15,
      duration: '5 months',
      startDate: '2024-01-10',
      progress: 90,
      topics: [
        { id: '11', title: 'Organic Chemistry', description: 'Carbon compounds and reactions', estimatedHours: 30, isCompleted: true, completedDate: '2024-02-05' },
        { id: '12', title: 'Inorganic Chemistry', description: 'Elements and compounds', estimatedHours: 25, isCompleted: true, completedDate: '2024-03-01' },
        { id: '13', title: 'Physical Chemistry', description: 'Chemical thermodynamics and kinetics', estimatedHours: 28, isCompleted: true, completedDate: '2024-03-20' },
        { id: '14', title: 'Analytical Chemistry', description: 'Quantitative and qualitative analysis', estimatedHours: 22, isCompleted: true, completedDate: '2024-04-10' },
        { id: '15', title: 'Laboratory Techniques', description: 'Practical lab skills and safety', estimatedHours: 15, isCompleted: false }
      ]
    }
  ];

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.batch.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTopicToggle = (courseId: string, topicId: string) => {
    // In a real app, this would make an API call
    console.log(`Toggling topic ${topicId} in course ${courseId}`);
  };

  if (selectedCourse) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedCourse(null)}
            className="text-red-600 hover:text-red-800 font-medium"
          >
            ← Back to My Courses
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{selectedCourse.title}</h1>
                <p className="text-gray-600 mt-1">{selectedCourse.description}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Progress</p>
                <p className="text-2xl font-bold text-red-600">{selectedCourse.progress}%</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Students</p>
                  <p className="font-medium text-gray-900">{selectedCourse.totalStudents}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-medium text-gray-900">{selectedCourse.duration}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Batch</p>
                  <p className="font-medium text-gray-900">{selectedCourse.batch}</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Overall Progress</span>
                <span className="font-medium text-gray-900">{selectedCourse.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-red-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${selectedCourse.progress}%` }}
                ></div>
              </div>
            </div>

            <h2 className="text-lg font-semibold text-gray-900 mb-4">Course Topics</h2>
            <div className="space-y-4">
              {selectedCourse.topics.map((topic, index) => (
                <div 
                  key={topic.id} 
                  className={`border rounded-lg p-4 transition-all duration-200 ${
                    topic.isCompleted ? 'border-green-200 bg-green-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <button
                        onClick={() => handleTopicToggle(selectedCourse.id, topic.id)}
                        className={`mt-1 p-1 rounded-full transition-colors ${
                          topic.isCompleted 
                            ? 'text-green-600 hover:text-green-700' 
                            : 'text-gray-400 hover:text-gray-600'
                        }`}
                      >
                        {topic.isCompleted ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <Circle className="w-5 h-5" />
                        )}
                      </button>
                      <div className="flex-1">
                        <h3 className={`font-medium ${
                          topic.isCompleted ? 'text-green-800 line-through' : 'text-gray-900'
                        }`}>
                          {index + 1}. {topic.title}
                        </h3>
                        <p className={`text-sm mt-1 ${
                          topic.isCompleted ? 'text-green-700' : 'text-gray-600'
                        }`}>
                          {topic.description}
                        </p>
                        <div className="flex items-center space-x-4 mt-2 text-xs">
                          <span className={topic.isCompleted ? 'text-green-600' : 'text-gray-500'}>
                            Estimated: {topic.estimatedHours} hours
                          </span>
                          {topic.completedDate && (
                            <span className="text-green-600">
                              Completed: {new Date(topic.completedDate).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {!topic.isCompleted && (
                      <button
                        onClick={() => handleTopicToggle(selectedCourse.id, topic.id)}
                        className="ml-4 px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Mark Complete
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Courses</h1>
        <p className="text-gray-600">Manage your assigned courses and track topic completion</p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search courses by title or batch..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCourses.map((course) => {
          const completedTopics = course.topics.filter(t => t.isCompleted).length;
          const totalTopics = course.topics.length;
          
          return (
            <div key={course.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{course.description}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                        {course.batch}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Course Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{course.totalStudents}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Students</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Duration</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4" />
                      <span>{completedTopics}/{totalTopics}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Topics</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium text-gray-900">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Recent Topics Preview */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Topics</h4>
                  <div className="space-y-1">
                    {course.topics.slice(0, 3).map((topic) => (
                      <div key={topic.id} className="flex items-center space-x-2 text-sm">
                        {topic.isCompleted ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <Circle className="w-4 h-4 text-gray-300" />
                        )}
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

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-xs text-gray-500">
                    Started {new Date(course.startDate).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="flex items-center space-x-1 text-sm text-red-600 hover:text-red-800 font-medium"
                  >
                    <Play className="w-4 h-4" />
                    <span>Manage Course</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyCourses;