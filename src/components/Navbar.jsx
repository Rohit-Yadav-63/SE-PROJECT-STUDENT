import React, { useState, useRef, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Menu,
  Bell,
  Calendar,
  Check,
  ChevronDown,
  Info,
  Clock,
  BookOpen,
  UserCheck
} from 'lucide-react';

export default function Navbar({ onOpenSidebar, student, notifications, setNotifications }) {
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getPageInfo = () => {
    switch (location.pathname) {
      case '/':
        return { title: 'Dashboard', subtitle: 'Academic Overview & Today’s Schedule' };
      case '/timetable':
        return { title: 'My Timetable', subtitle: 'Weekly & Daily Class Timetable' };
      case '/courses':
        return { title: 'My Courses', subtitle: 'Enrolled Subjects & Faculty Directory' };
      case '/calendar':
        return { title: 'Academic Calendar', subtitle: 'Examinations, Deadlines & Holidays' };
      case '/profile':
        return { title: 'Student Profile', subtitle: 'Personal Details & Academic Records' };
      default:
        return { title: 'CampusFlow', subtitle: 'Student Portal' };
    }
  };

  const { title, subtitle } = getPageInfo();

  // Current formatted date
  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(2026, 9, 12)); // Oct 12, 2026

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const markSingleRead = (id) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Left: Mobile Toggle & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
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
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 text-xs font-medium">
          <Calendar className="w-3.5 h-3.5 text-blue-600" />
          <span>{todayFormatted}</span>
        </div>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 relative transition-colors"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Notifications
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    {unreadCount} unread update{unreadCount === 1 ? '' : 's'}
                  </span>
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                  >
                    <Check className="w-3 h-3" /> Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400">
                    No new notifications
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markSingleRead(n.id)}
                      className={`p-3.5 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3 ${n.unread ? 'bg-blue-50/40' : ''
                        }`}
                    >
                      <div className="mt-0.5">
                        {n.type === 'timetable' ? (
                          <Clock className="w-4 h-4 text-blue-600" />
                        ) : n.type === 'assignment' ? (
                          <BookOpen className="w-4 h-4 text-amber-600" />
                        ) : (
                          <Info className="w-4 h-4 text-slate-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <p className={`text-xs ${n.unread ? 'font-semibold text-slate-900' : 'font-medium text-slate-700'}`}>
                            {n.title}
                          </p>
                          {n.unread && (
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                          {n.message}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-1">
                          {n.time}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile Chip */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-1 pl-2 sm:pr-2.5 rounded-lg hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-colors text-left"
          >
            <div className="w-8 h-8 rounded-full bg-blue-800 text-white font-medium flex items-center justify-center text-xs shadow-xs">
              {student.name ? student.name.split(' ').map(n => n[0]).join('') : 'RS'}
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-semibold text-slate-800 leading-none">
                {student.name}
              </div>
              <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                {student.enrollmentNo}
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3.5 py-2 border-b border-slate-100">
                <p className="text-xs font-semibold text-slate-900">{student.name}</p>
                <p className="text-[11px] text-slate-500 font-mono">{student.enrollmentNo}</p>
                <p className="text-[11px] text-blue-600 font-medium">{student.branch}</p>
              </div>
              <Link
                to="/profile"
                onClick={() => setShowProfileMenu(false)}
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-700"
              >
                <UserCheck className="w-3.5 h-3.5 text-slate-500" />
                View Full Profile
              </Link>
              <Link
                to="/timetable"
                onClick={() => setShowProfileMenu(false)}
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-700"
              >
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                My Weekly Schedule
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
