import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  Menu,
  Calendar,
  User,
  LogOut,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onOpenSidebar }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { student, logout } = useAuth();

  const getPageInfo = () => {
    switch (location.pathname) {
      case '/':
        return { title: "Today's Scheduled Classes", subtitle: 'Daily Academic Schedule & Classroom Details' };
      case '/timetable':
        return { title: 'Weekly Timetable', subtitle: 'Day-wise Class Distribution & Matrix' };
      case '/profile':
        return { title: 'Student Profile', subtitle: 'Personal Details & Academic Enrollment' };
      default:
        return { title: 'Student Portal', subtitle: 'CampusFlow Academic Portal' };
    }
  };

  const { title, subtitle } = getPageInfo();

  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date());

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
            {title}
          </h1>
          <p className="hidden sm:block text-xs text-slate-500 font-normal">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Date Display */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-xs font-medium">
          <Calendar className="w-3.5 h-3.5 text-blue-600" />
          <span>{todayFormatted}</span>
        </div>

        {/* Profile Link */}
        <Link
          to="/profile"
          className="flex items-center gap-2.5 p-1 pl-2 sm:pr-2.5 rounded-xl hover:bg-slate-100 border border-transparent hover:border-slate-200 transition text-left"
        >
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
            {student.name ? student.name.split(' ').map(n => n[0]).join('') : 'RS'}
          </div>
          <div className="hidden sm:block">
            <div className="text-xs font-bold text-slate-800 leading-none">
              {student.name}
            </div>
            <div className="text-[11px] text-slate-500 font-mono mt-0.5">
              {student.enrollmentNo}
            </div>
          </div>
        </Link>

        {/* Quick Sign Out Button */}
        <button
          onClick={handleLogout}
          title="Sign Out"
          className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl border border-transparent hover:border-rose-100 transition"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
