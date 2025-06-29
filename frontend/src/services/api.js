import axios from 'axios';

const API_BASE_URL = 'https://student-portal-qrhl.onrender.com/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token is invalid, redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const studentApi = {
  // Get all students
  getAllStudents: async () => {
    const response = await api.get('/students');
    return response.data.data;
  },

  // Get students by department
  getStudentsByDepartment: async (department) => {
    const response = await api.get(`/students/department/${encodeURIComponent(department)}`);
    return response.data.data;
  },

  // Create a new student
  createStudent: async (student) => {
    const response = await api.post('/students', student);
    return response.data.data;
  },

  // Update a student
  updateStudent: async (id, student) => {
    const response = await api.put(`/students/${id}`, student);
    return response.data.data;
  },

  // Delete a student
  deleteStudent: async (id) => {
    await api.delete(`/students/${id}`);
  },
};

export default api; 