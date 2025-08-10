import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './components/auth/LoginPage';
import BusinessDashboard from './components/business/BusinessDashboard';
import TeacherDashboard from './components/teacher/TeacherDashboard';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';

function AppContent() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showMenu, setShowMenu] = useState(true); // default: visible on desktop

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      {showMenu && (
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <Header 
        showMenu={showMenu}
        setShowMenu={setShowMenu} />
        <main className="flex-1 overflow-auto p-4">
          {user?.role === 'business' ? (
            <BusinessDashboard activeTab={activeTab} setActiveTab={setActiveTab} />
          ) : (
            <TeacherDashboard activeTab={activeTab} setActiveTab={setActiveTab} />
          )}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
