import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import CourseModal from '../components/CourseModal';
import { getStudentProfile, saveStudentProfile, DEFAULT_NOTIFICATIONS } from '../data/student';
import { COURSES } from '../data/courses';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [student, setStudent] = useState(getStudentProfile);
  const [notifications, setNotifications] = useState(DEFAULT_NOTIFICATIONS);
  const [selectedCourseForModal, setSelectedCourseForModal] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  // Save profile changes
  const handleUpdateProfile = (newProfile) => {
    setStudent(newProfile);
    saveStudentProfile(newProfile);
  };

  const handleOpenCourseModal = (courseOrCode) => {
    if (typeof courseOrCode === 'string') {
      const match = COURSES.find(c => c.code === courseOrCode || c.id === courseOrCode);
      if (match) setSelectedCourseForModal(match);
    } else {
      setSelectedCourseForModal(courseOrCode);
    }
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    // In a college portal, reset simulation or display logged out banner
    alert('You have safely logged out of CampusFlow Student Portal.');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        student={student}
        onLogoutClick={() => setShowLogoutModal(true)}
      />

      {/* Main Layout Area */}
      <div className="flex-1 flex flex-col lg:pl-64 transition-all">
        {/* Top Navbar */}
        <Navbar
          onOpenSidebar={() => setSidebarOpen(true)}
          student={student}
          notifications={notifications}
          setNotifications={setNotifications}
        />

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet
            context={{
              student,
              updateStudent: handleUpdateProfile,
              notifications,
              setNotifications,
              onOpenCourseModal: handleOpenCourseModal
            }}
          />
        </main>
      </div>

      {/* Global Course Details Modal */}
      {selectedCourseForModal && (
        <CourseModal
          course={selectedCourseForModal}
          onClose={() => setSelectedCourseForModal(null)}
          onNavigateTimetable={(courseCode) => {
            navigate(`/timetable?course=${courseCode}`);
          }}
        />
      )}

      {/* Logout Confirmation Dialog */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-sm w-full p-5 text-center">
            <h3 className="text-base font-bold text-slate-900">
              Confirm Portal Logout
            </h3>
            <p className="text-xs text-slate-500 mt-2">
              Are you sure you want to end your current student session for <span className="font-semibold text-slate-700">{student.name}</span>?
            </p>
            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-xs"
              >
                Yes, Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
