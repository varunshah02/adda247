const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000/api';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  statusCode: number;
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  courseCode: string;
  duration: {
    value: number;
    unit: string;
  };
  status: 'active' | 'inactive' | 'draft';
  createdBy: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
  subjects: Subject[];
  createdAt: string;
  updatedAt: string;
}

export interface Subject {
  _id: string;
  title: string;
  description: string;
  order: number;
  topics: Topic[];
}

export interface Topic {
  _id: string;
  title: string;
  description: string;
  order: number;
  estimatedHours: number;
  lectures: Lecture[];
}

export interface Lecture {
  _id: string;
  title: string;
  description: string;
  order: number;
  durationMinutes: number;
}

export interface CreateCoursePayload {
  title: string;
  description: string;
  courseCode: string;
  duration: {
    value: number;
    unit: string;
  };
  status: 'active' | 'inactive' | 'draft';
}

export interface AddSubjectPayload {
  courseId: string;
  title: string;
  description: string;
  order: number;
}

export interface AddTopicPayload {
  courseId: string;
  subjectId: string;
  title: string;
  description: string;
  order: number;
}

export interface AddLecturePayload {
  courseId: string;
  subjectId: string;
  topicId: string;
  title: string;
  description: string;
  order: number;
}

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Course APIs
  async createCourse(payload: CreateCoursePayload): Promise<ApiResponse<Course>> {
    return this.request<Course>('/course/create', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async getCourses(): Promise<ApiResponse<Course[]>> {
    return this.request<Course[]>('/course/list');
  }

  async getCourseById(courseId: string): Promise<ApiResponse<Course>> {
    return this.request<Course>(`/course/${courseId}`);
  }

  // Subject APIs
  async addSubject(payload: AddSubjectPayload): Promise<ApiResponse<Subject>> {
    return this.request<Subject>('/course/add-subject', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  // Topic APIs
  async addTopic(payload: AddTopicPayload): Promise<ApiResponse<Topic>> {
    return this.request<Topic>('/course/add-topic', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  // Lecture APIs
  async addLecture(payload: AddLecturePayload): Promise<ApiResponse<Lecture>> {
    return this.request<Lecture>('/course/add-lecture', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }
}

export const apiService = new ApiService();