import React, { useState, useEffect } from 'react';
import { studentApi } from '../services/api';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const departments = [
    'all',
    'Computer Science',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Chemical Engineering',
    'Biomedical Engineering',
    'Information Technology',
    'Data Science',
  ];

  const fetchStudents = async (department) => {
    setLoading(true);
    setError(null);
    try {
      let data;
      if (department === 'all') {
        data = await studentApi.getAllStudents();
      } else {
        data = await studentApi.getStudentsByDepartment(department);
      }
      setStudents(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents(selectedDepartment);
  }, [selectedDepartment]);

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  const handleDeleteStudent = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await studentApi.deleteStudent(id);
        fetchStudents(selectedDepartment);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to delete student');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Students</h2>
        <div className="flex items-center space-x-2">
          <label htmlFor="department-filter" className="text-sm font-medium text-gray-700">
            Filter by Department:
          </label>
          <select
            id="department-filter"
            value={selectedDepartment}
            onChange={handleDepartmentChange}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>
                {dept === 'all' ? 'All Departments' : dept}
              </option>
            ))}
          </select>
        </div>
      </div>
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      {students.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          {selectedDepartment === 'all' 
            ? 'No students found. Add some students to get started!' 
            : `No students found in ${selectedDepartment} department.`
          }
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {student.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {student.department}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(student.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleDeleteStudent(student.id)}
                      className="text-red-600 hover:text-red-900 focus:outline-none focus:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="mt-4 text-sm text-gray-500">
        Showing {students.length} student{students.length !== 1 ? 's' : ''}
        {selectedDepartment !== 'all' && ` in ${selectedDepartment} department`}
      </div>
    </div>
  );
}

export default StudentList;