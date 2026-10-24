import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarDays,
  User,
  LogOut,
  GraduationCap,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Sidebar({ isOpen, onClose }) {
  const { student, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    {
      to: '/',
      label: "Today's Schedule",
      icon: LayoutDashboard,
      end: true
    },
    {
      to: '/timetable',
      label: 'Weekly Timetable',
      icon: CalendarDays
    },
    {
      to: '/profile',
      label: 'Student Profile',
      icon: User
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-slate-900 text-slate-200 flex flex-col border-r border-slate-800 transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-slate-800/80 bg-slate-950/60">
          <NavLink to="/" className="flex items-center gap-2.5 group" onClick={onClose}>
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/30 group-hover:bg-blue-500 transition-colors">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-base text-white tracking-tight leading-none block">
                CampusFlow
              </span>
              <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase">
                Student Portal
              </span>
            </div>
          </NavLink>

          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Academic Session Info */}
        <div className="px-5 py-3 border-b border-slate-800/60 bg-slate-900/50">
          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            Academic Session
          </div>
          <div className="text-xs font-semibold text-slate-200 mt-0.5 truncate">
            {student.academicYear || '2026–2027'}
          </div>
          <div className="text-[11px] text-blue-400 font-medium mt-0.5 truncate">
            {student.branch?.split(' ')[0]} • {student.semester}
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm font-semibold'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* User Card & Logout */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/40">
          <NavLink
            to="/profile"
            onClick={onClose}
            className="block p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 mb-2 hover:bg-slate-800 transition"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-700 text-white font-bold flex items-center justify-center text-xs shrink-0">
                {student.name ? student.name.split(' ').map(n => n[0]).join('') : 'RS'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-200 truncate">
                  {student.name}
                </p>
                <p className="text-[11px] text-slate-400 font-mono truncate">
                  {student.enrollmentNo}
                </p>
              </div>
            </div>
          </NavLink>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out / Exit Portal</span>
          </button>
        </div>
      </aside>
    </>
  );
}
