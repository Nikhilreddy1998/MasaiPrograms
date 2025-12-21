import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { store } from './store/store';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import BookCatalog from './pages/BookCatalog';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
import Events from './pages/Events';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/Auth/ProtectedRoute';

// Placeholder components for missing pages
const ReportsPage = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reports & Analytics</h1>
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <p className="text-gray-600 dark:text-gray-400">Advanced reporting features coming soon...</p>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100">Circulation Reports</h3>
          <p className="text-sm text-blue-700 dark:text-blue-300">Track book borrowing patterns</p>
        </div>
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <h3 className="font-semibold text-green-900 dark:text-green-100">User Analytics</h3>
          <p className="text-sm text-green-700 dark:text-green-300">Monitor user engagement</p>
        </div>
        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <h3 className="font-semibold text-purple-900 dark:text-purple-100">Financial Reports</h3>
          <p className="text-sm text-purple-700 dark:text-purple-300">Track fines and revenue</p>
        </div>
      </div>
    </div>
  </div>
);

const SettingsPage = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">System Settings</h1>
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <p className="text-gray-600 dark:text-gray-400">System configuration options coming soon...</p>
      <div className="mt-4 space-y-4">
        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h3 className="font-semibold text-gray-900 dark:text-white">Library Policies</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Configure borrowing rules and fine rates</p>
        </div>
        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h3 className="font-semibold text-gray-900 dark:text-white">Notification Settings</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Manage email and system notifications</p>
        </div>
        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h3 className="font-semibold text-gray-900 dark:text-white">System Backup</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Configure automated backups</p>
        </div>
      </div>
    </div>
  </div>
);

function AppContent() {
  const { darkMode } = useSelector((state) => state.ui);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="catalog" element={<BookCatalog />} />
            <Route path="profile" element={<Profile />} />
            <Route path="admin" element={<AdminPanel />} />
            <Route path="events" element={<Events />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;