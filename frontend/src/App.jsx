import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import AddStudentForm from './components/AddStudentForm';
import StudentList from './components/StudentList';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';

// const Dashboard = () => (
//   <div className="container mx-auto px-4 py-8">
//     <h1 className="text-3xl font-bold mb-4">Welcome to the Student Portal Dashboard</h1>
//     <p className="text-gray-600">Use the navigation bar to add or search students.</p>
//   </div>
// );

const Dashboard = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="bg-white rounded-2xl shadow-md p-8 text-center">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-4">
          🎓 Student Portal Dashboard
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Welcome! Use the navigation bar above to add new students or search
          existing records.
        </p>
        <div className="flex justify-center gap-6">
          <a
            href="/add-student"
            className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
          >
            ➕ Add Student
          </a>
          <a
            href="/search-student"
            className="bg-gray-100 text-blue-600 px-6 py-3 rounded-full hover:bg-gray-200 transition"
          >
            🔍 Search Student
          </a>
        </div>
      </div>
    </div>
  );
};

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" state={{ from: location }} replace />;
}

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-student"
          element={
            <PrivateRoute>
              <div className="container mx-auto px-4 py-8"><AddStudentForm /></div>
            </PrivateRoute>
          }
        />
        <Route
          path="/students"
          element={
            <PrivateRoute>
              <div className="container mx-auto px-4 py-8"><StudentList /></div>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </div>
  );
}

export default App;