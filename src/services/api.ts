const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  token?: string;
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

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  statusCode: number;
  token: string;
}

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "business" | "faculty";
  phoneNumber: string;
  facultyProfile?: {
    employeeId?: string;
    department?: string;
    specialization?: string[];
    experience?: number;
    qualification?: string;
    joiningDate?: string;
    isActive: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: "business" | "faculty";
  phoneNumber: string;
  facultyProfile?: {
    employeeId?: string;
    department?: string;
    specialization?: string[];
    experience?: number;
    qualification?: string;
    joiningDate?: string;
    isActive?: boolean;
  };
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
  status: "active" | "inactive" | "draft";
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
  status: "active" | "inactive" | "draft";
}

export interface UpdateCoursePayload {
  courseId: string;
  title: string;
  description: string;
  courseCode: string;
  duration: {
    value: number;
    unit: string;
  };
  status: "active" | "inactive" | "draft";
}

export interface AddSubjectPayload {
  courseId: string;
  title: string;
  description: string;
  order: number;
}

export interface UpdateSubjectPayload {
  courseId: string;
  subjectId: string;
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

export interface UpdateTopicPayload {
  courseId: string;
  subjectId: string;
  topicId: string;
  title: string;
  description: string;
  estimatedHours?: number;
}

export interface AddLecturePayload {
  courseId: string;
  subjectId: string;
  topicId: string;
  title: string;
  description: string;
  order: number;
}

export interface UpdateLecturePayload {
  courseId: string;
  subjectId: string;
  topicId: string;
  lectureId: string;
  title: string;
  description: string;
  durationMinutes: number;
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;

    const defaultHeaders = {
      "Content-Type": "application/json",
    };

    const token = localStorage.getItem("token");
    if (token) {
      this.setCookie(token);
    }

    const config: RequestInit = {
      ...options,
      credentials: "include",
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
      console.error("API request failed:", error);
      throw error;
    }
  }

  private setCookie(value: string): void {
    if (typeof document === "undefined") return;

    document.cookie = `token=${value}; path=/`;
  }

  // Auth APIs
  async login(payload: LoginPayload): Promise<ApiResponse<null>> {
    return this.request<null>("/user/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  // User APIs
  async getCurrentUser(): Promise<ApiResponse<User>> {
    return this.request<User>("/user");
  }

  async getAllUsers(): Promise<ApiResponse<User[]>> {
    return this.request<User[]>("/user/list");
  }

  async createUser(payload: CreateUserPayload): Promise<ApiResponse<User>> {
    return this.request<User>("/user/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  // Course APIs
  async createCourse(
    payload: CreateCoursePayload
  ): Promise<ApiResponse<Course>> {
    return this.request<Course>("/course/create", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  async getCourses(): Promise<ApiResponse<Course[]>> {
    return this.request<Course[]>("/course/list");
  }

  async getCourseById(courseId: string): Promise<ApiResponse<Course>> {
    return this.request<Course>(`/course/${courseId}`);
  }

  async updateCourse(payload: UpdateCoursePayload): Promise<ApiResponse<Course>> {
    return this.request<Course>("/course/update", {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  }

  // Subject APIs
  async addSubject(payload: AddSubjectPayload): Promise<ApiResponse<any>> {
    return this.request<any>("/course/add-subject", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  async updateSubject(payload: UpdateSubjectPayload): Promise<ApiResponse<any>> {
    return this.request<any>("/course/update/subject", {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  }

  // Topic APIs
  async addTopic(payload: AddTopicPayload): Promise<ApiResponse<any>> {
    return this.request<any>("/course/add-topic", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  async updateTopic(payload: UpdateTopicPayload): Promise<ApiResponse<any>> {
    return this.request<any>("/course/update/topic", {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  }

  // Lecture APIs
  async addLecture(payload: AddLecturePayload): Promise<ApiResponse<any>> {
    return this.request<any>("/course/add-lecture", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  async updateLecture(payload: UpdateLecturePayload): Promise<ApiResponse<any>> {
    return this.request<any>("/course/update/lecture", {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  }
}

export const apiService = new ApiService();