import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarRange,
  BookOpen,
  CalendarDays,
  User,
  LogOut,
  GraduationCap,
  X,
  ExternalLink
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose, student, onLogoutClick }) {
  const navItems = [
    {
      to: '/',
      label: 'Dashboard',
      icon: LayoutDashboard,
      end: true
    },
    {
      to: '/timetable',
      label: 'My Timetable',
      icon: CalendarRange
    },
    {
      to: '/courses',
      label: 'My Courses',
      icon: BookOpen
    },
    {
      to: '/calendar',
      label: 'Academic Calendar',
      icon: CalendarDays
    },
    {
      to: '/profile',
      label: 'Profile',
      icon: User
    }
  ];

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
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-slate-900 text-slate-200 flex flex-col border-r border-slate-800 transition-transform duration-200 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-slate-800/80 bg-slate-950/60">
          <NavLink to="/" className="flex items-center gap-2.5 group" onClick={onClose}>
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/30 group-hover:bg-blue-500 transition-colors">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-lg text-white tracking-tight leading-none block">
                CampusFlow
              </span>
              <span className="text-[11px] font-medium text-slate-400 tracking-wider uppercase">
                Student Portal
              </span>
            </div>
          </NavLink>

          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Academic Term Info */}
        <div className="px-5 py-3 border-b border-slate-800/60 bg-slate-900/50">
          <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            Academic Session
          </div>
          <div className="text-xs font-semibold text-slate-200 mt-0.5">
            Autumn Semester 2026–27
          </div>
          <div className="text-[11px] text-blue-400 font-medium mt-0.5">
            B.Tech CSE • Sem 5 (Sec B)
          </div>
        </div>

        {/* Nav Links */}
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
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
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

        {/* User Quick Info & Logout */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/40">
          <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60 mb-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-700 text-white font-semibold flex items-center justify-center text-xs">
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
          </div>

          <button
            onClick={onLogoutClick}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4 text-slate-400" />
            <span>Logout / Exit Portal</span>
          </button>
        </div>
      </aside>
    </>
  );
}
